 import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Newsletters = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [newNewsletter, setNewNewsletter] = useState({
    title: '',
    date: '',
    link: '',
    description: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showContent, setShowContent] = useState(false);

  const fetchNewsletters = async () => {
    try {
      const res = await axios.get('http://localhost:5000/newsletters');
      setNewsletters(res.data);
    } catch (err) {
      console.error('Failed to fetch newsletters', err);
    }
  };

  useEffect(() => {
    fetchNewsletters();
    const timer = setTimeout(() => setShowContent(true), 200); // 200ms delay before showing content
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setNewNewsletter({ ...newNewsletter, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/newsletters/${editingId}`, newNewsletter);
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/newsletters', newNewsletter);
      }
      setNewNewsletter({ title: '', date: '', link: '', description: '' });
      fetchNewsletters();
    } catch (err) {
      console.error('Error saving newsletter', err);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/newsletters.jpg')" }} // Put your newsletters.jpg in public folder
    >
      <div
        className={`min-h-screen bg-white/30 backdrop-blur-md py-10 px-6 rounded-xl max-w-5xl mx-auto shadow-xl
          transition-opacity duration-300 ease-in-out
          ${showContent ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-800 drop-shadow">
          📰 Alumni Newsletters
        </h1>

        {/* Post Newsletter Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/50 shadow-xl p-6 rounded-xl mb-10 border border-blue-100 space-y-4 backdrop-blur-sm"
        >
          <h2 className="text-xl font-semibold text-blue-700">Post a New Newsletter</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="title"
              value={newNewsletter.title}
              onChange={handleChange}
              placeholder="Newsletter Title"
              required
              className="input"
            />
            <input
              name="date"
              value={newNewsletter.date}
              onChange={handleChange}
              placeholder="Date (e.g., 2025-05-26)"
              type="date"
              required
              className="input"
            />
            <input
              name="link"
              value={newNewsletter.link}
              onChange={handleChange}
              placeholder="Link (optional)"
              className="input"
            />
          </div>
          <textarea
            name="description"
            value={newNewsletter.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="input h-24 resize-none"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md"
          >
            ➕ Post Newsletter
          </button>
        </form>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search newsletters (title, description)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 mb-6 border border-blue-300 rounded-xl shadow-sm focus:outline-none focus:ring focus:border-blue-500 bg-white/70"
        />

        {/* Newsletters List */}
        <div className="grid gap-6">
          {newsletters
            .filter((nl) =>
              `${nl.title} ${nl.description}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((nl) => (
              <div
                key={nl._id}
                className="bg-white/60 border border-gray-200 shadow-md rounded-xl p-6 relative backdrop-blur-sm"
              >
                {editingId === nl._id ? (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      await axios.put(`http://localhost:5000/newsletters/${nl._id}`, newNewsletter);
                      setEditingId(null);
                      setNewNewsletter({ title: '', date: '', link: '', description: '' });
                      fetchNewsletters();
                    }}
                    className="space-y-3"
                  >
                    <input
                      name="title"
                      value={newNewsletter.title}
                      onChange={handleChange}
                      required
                      className="input"
                    />
                    <input
                      name="date"
                      value={newNewsletter.date}
                      onChange={handleChange}
                      type="date"
                      required
                      className="input"
                    />
                    <input
                      name="link"
                      value={newNewsletter.link}
                      onChange={handleChange}
                      className="input"
                    />
                    <textarea
                      name="description"
                      value={newNewsletter.description}
                      onChange={handleChange}
                      required
                      className="input h-20 resize-none"
                    />
                    <div className="space-x-2">
                      <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-1 rounded-lg"
                      >
                        ✅ Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-400 text-white px-4 py-1 rounded-lg"
                      >
                        ❌ Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-blue-900">{nl.title}</h2>
                    <p className="text-gray-600">{new Date(nl.date).toLocaleDateString()}</p>
                    <p className="mt-2 text-gray-700 whitespace-pre-line">{nl.description}</p>
                    {nl.link && (
                      <a
                        href={nl.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline mt-2 block"
                      >
                        🔗 Read More
                      </a>
                    )}
                    <div className="absolute top-4 right-4 space-x-2">
                      <button
                        onClick={() => {
                          setNewNewsletter(nl);
                          setEditingId(nl._id);
                        }}
                        className="text-yellow-500 hover:text-yellow-700"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={async () => {
                          await axios.delete(`http://localhost:5000/newsletters/${nl._id}`);
                          fetchNewsletters();
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Newsletters;

