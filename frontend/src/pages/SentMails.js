 import React, { useEffect, useState } from "react";
import axios from "axios";

const SentMails = () => {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMails = async () => {
    try {
      const res = await axios.get("http://localhost:5000/sent-mails");
      setMails(res.data);
    } catch (err) {
      console.error("Failed to fetch sent mails:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this mail?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/sent-mails/${id}`);
      setMails((prev) => prev.filter((mail) => mail._id !== id));
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  useEffect(() => {
    fetchMails();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-6xl bg-white bg-opacity-90 backdrop-blur rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          📤 Sent Emails
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : mails.length === 0 ? (
          <p className="text-center text-gray-600">No emails sent yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-100 text-gray-700 text-sm">
                  <th className="py-3 px-4 text-left">To</th>
                  <th className="py-3 px-4 text-left">Subject</th>
                  <th className="py-3 px-4 text-left">Attachment</th>
                  <th className="py-3 px-4 text-left">Sent At</th>
                  <th className="py-3 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {mails.map((mail) => (
                  <tr key={mail._id} className="border-t hover:bg-gray-50 transition">
                    <td className="py-3 px-4">{mail.to}</td>
                    <td className="py-3 px-4">{mail.subject}</td>
                    <td className="py-3 px-4">{mail.fileName || "—"}</td>
                    <td className="py-3 px-4">
                      {new Date(mail.sentAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDelete(mail._id)}
                        className="text-red-600 font-semibold hover:text-red-800 hover:underline"
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SentMails;

