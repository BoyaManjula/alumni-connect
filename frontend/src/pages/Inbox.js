 import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const res = await axios.get('http://localhost:5000/inbox');
        setEmails(res.data);
      } catch (err) {
        console.error('Failed to fetch inbox:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInbox();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          📥 Inbox
        </h2>

        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading emails...</p>
        ) : emails.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">Inbox is empty.</p>
        ) : (
          <div className="space-y-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent">
            {emails.map((email, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-gray-200 shadow hover:shadow-md transition duration-200 bg-white"
              >
                <div className="text-sm text-gray-500">
                  {new Date(email.date).toLocaleString()}
                </div>
                <div className="text-blue-700 font-semibold">
                  From: {email.from}
                </div>
                <div className="text-gray-800 font-bold">{email.subject}</div>
                <div className="text-gray-600 mt-1 text-sm">
                  {email.snippet}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;

