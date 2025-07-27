import React, { useState } from 'react';
import axios from 'axios';

const SendMail = () => {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    text: '',
    html: '',
    file: null,
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    const data = new FormData();
    data.append('to', formData.to);
    data.append('subject', formData.subject);
    data.append('text', formData.text);
    data.append('html', formData.html);
    if (formData.file) {
      data.append('attachment', formData.file);
    }

    try {
      const res = await axios.post('http://localhost:5000/send-mail', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setStatus(res.data.message);
    } catch (err) {
      console.error(err);
      setStatus('❌ Failed to send email.');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/newsletters.jpg')" }}
    >
      <div className="backdrop-blur-md bg-white/60 max-w-xl w-full p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-800">
          📧 Send an Email
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="to"
            placeholder="Recipient Email"
            value={formData.to}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="text"
            placeholder="Plain Text Message"
            value={formData.text}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="html"
            placeholder="Optional HTML Message"
            value={formData.html}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            name="attachment"
            onChange={handleFileChange}
            className="w-full p-3 border rounded bg-white"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition"
          >
            Send Email
          </button>
        </form>
        {status && (
          <p className="text-center mt-4 text-sm text-green-700 font-medium">
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default SendMail;

