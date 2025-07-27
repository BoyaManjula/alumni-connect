const express = require("express");
const router = express.Router();
const imaps = require("imap-simple");
const { simpleParser } = require("mailparser");

const config = {
  imap: {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASS,
    host: "imap.gmail.com",
    port: 993,
    tls: true,
    authTimeout: 3000,
  },
};

router.get("/", async (req, res) => {
  try {
    const connection = await imaps.connect({ imap: config.imap });
    await connection.openBox("INBOX");

    const searchCriteria = ["UNSEEN", ["SINCE", new Date(2023, 0, 1)]];
    const fetchOptions = {
      bodies: ["HEADER", "TEXT"],
      markSeen: false,
    };

    const messages = await connection.search(searchCriteria, fetchOptions);
    const parsedMessages = [];

    for (const item of messages) {
      const all = item.parts.find((part) => part.which === "TEXT");
      const id = item.attributes.uid;
      const idHeader = "Imap-Id: " + id + "\r\n";
      const parsed = await simpleParser(idHeader + all.body);

      parsedMessages.push({
        from: parsed.from.text,
        subject: parsed.subject,
        date: parsed.date,
        text: parsed.text,
      });
    }

    res.status(200).json(parsedMessages);
  } catch (error) {
    console.error("❌ Error fetching inbox:", error);
    res.status(500).json({ error: "Failed to fetch inbox" });
  }
});

module.exports = router;

