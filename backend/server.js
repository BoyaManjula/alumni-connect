 // ~/alumni-connect/server.js

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
const imaps = require("imap-simple");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { simpleParser } = require("mailparser");

const Newsletter = require("./models/Newsletter");
const Event = require("./models/Event");
const SentMail = require("./models/SentMail");

const app = express();
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
const alumniRoutes = require("./routes/alumni");
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/event");
const jobRoutes = require("./routes/jobRoutes");
const meetingRoutes = require("./routes/meetings");

app.use("/alumni", alumniRoutes);
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/jobs", jobRoutes);
app.use("/meetings", meetingRoutes);

// Home
app.get("/", (req, res) => {
  res.send("🎉 Alumni Connect Backend is Running!");
});

// Multer upload for attachments
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ Send email with file + log
app.post("/send-mail", upload.single("attachment"), async (req, res) => {
  const { to, subject, text, html } = req.body;
  const file = req.file;

  if (!to || !subject || (!text && !html)) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Alumni Connect" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
      attachments: file
        ? [{ filename: file.originalname, path: file.path }]
        : [],
    };

    await transporter.sendMail(mailOptions);

    await SentMail.create({
      to,
      subject,
      text,
      html,
      fileName: file?.originalname || null,
      sentAt: new Date(),
    });

    if (file && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path); // remove temp file
    }

    res.status(200).json({ message: "✅ Email sent and logged successfully!" });
  } catch (err) {
    console.error("❌ Email send error:", err.message);
    res.status(500).json({ error: "Email failed to send." });
  }
});

// ✅ Fetch sent mail logs
app.get("/sent-mails", async (req, res) => {
  try {
    const mails = await SentMail.find().sort({ sentAt: -1 });
    res.json(mails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete sent mail
app.delete("/sent-mails/:id", async (req, res) => {
  try {
    const deleted = await SentMail.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Mail not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("❌ Delete Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Gmail inbox fetch
app.get("/inbox", async (req, res) => {
  const config = {
    imap: {
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASS,
      host: "imap.gmail.com",
      port: 993,
      tls: true,
      tlsOptions: {
        servername: "imap.gmail.com",
      },
      authTimeout: 10000,
    },
  };

  try {
    const connection = await imaps.connect(config);
    await connection.openBox("INBOX");

    const searchCriteria = ["ALL"];
    const fetchOptions = { bodies: ["HEADER"], markSeen: false };

    const messages = await connection.search(searchCriteria, fetchOptions);
    const emails = messages
      .map((msg) => {
        const header = msg.parts.find((part) => part.which === "HEADER").body;
        return {
          from: header.from?.[0] || "Unknown",
          subject: header.subject?.[0] || "(No Subject)",
          date: header.date?.[0] || "",
          snippet: "(Preview not available)",
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 20)
      .reverse();

    res.status(200).json(emails);
  } catch (err) {
    console.error("❌ Inbox fetch failed:", err.message);
    res.status(500).json({ error: "Inbox fetch failed" });
  }
});

// Newsletter routes
app.post("/newsletter", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newsletter = new Newsletter({ title, content });
    await newsletter.save();
    res.status(201).json(newsletter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/newsletter", async (req, res) => {
  try {
    const newsletters = await Newsletter.find().sort({ date: -1 });
    res.json(newsletters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/newsletter/:id", async (req, res) => {
  try {
    await Newsletter.findByIdAndDelete(req.params.id);
    res.json({ message: "Newsletter deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);

