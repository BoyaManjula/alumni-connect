import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Error fetching events:', err.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/events/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/events', form);
      }
      setForm({ title: '', date: '', time: '', location: '', description: '' });
      fetchEvents();
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleEdit = (event) => {
    setForm({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
    });
    setEditingId(event._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/events/${id}`);
      fetchEvents();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6 relative"
      style={{ backgroundImage: `url('/jobs.jpg')` }}
    >
      {/* Transparent overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-800">🎓 Alumni Events</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md mb-6 max-w-xl mx-auto space-y-2"
        >
          <input
            type="text"
            placeholder="Event Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition"
          >
            {editingId ? 'Update Event' : 'Create Event'}
          </button>
        </form>

        <div className="grid md:grid-cols-2 gap-4">
          {events.map((e) => (
            <div key={e._id} className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-purple-600">{e.title}</h3>
              <p><strong>Date:</strong> {e.date}</p>
              <p><strong>Time:</strong> {e.time}</p>
              <p><strong>Location:</strong> {e.location}</p>
              <p><strong>Description:</strong> {e.description}</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleEdit(e)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(e._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;

