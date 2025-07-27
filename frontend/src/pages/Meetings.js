import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [form, setForm] = useState({ title: '', date: '', time: '', location: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchMeetings = async () => {
    try {
      const res = await axios.get('/meetings');
      setMeetings(res.data);
    } catch (err) {
      toast.error("Failed to load meetings");
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/meetings/${editingId}`, form);
        toast.success("Meeting updated!");
      } else {
        await axios.post('/meetings', form);
        toast.success("Meeting created!");
      }
      setForm({ title: '', date: '', time: '', location: '', description: '' });
      setEditingId(null);
      fetchMeetings();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      toast.error("Error saving meeting");
    }
  };

  const handleEdit = meeting => {
    setForm(meeting);
    setEditingId(meeting._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async id => {
    if (!window.confirm("Are you sure you want to delete this meeting?")) return;
    try {
      await axios.delete(`/meetings/${id}`);
      toast.success("Meeting deleted!");
      fetchMeetings();
    } catch (err) {
      toast.error("Failed to delete meeting");
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: `url('/meetings.jpg')` }}
    >
      <ToastContainer position="top-center" />

      <div className="bg-white/70 p-6 rounded-xl shadow-xl max-w-5xl mx-auto animate-fadeIn">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">📅 Alumni Meetings</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-white/80 p-4 rounded-lg shadow">
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required className="border p-2 rounded" />
          <input type="date" name="date" value={form.date} onChange={handleChange} required className="border p-2 rounded" />
          <input type="time" name="time" value={form.time} onChange={handleChange} required className="border p-2 rounded" />
          <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required className="border p-2 rounded" />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 rounded md:col-span-2" />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded md:col-span-2">
            {editingId ? 'Update Meeting' : 'Create Meeting'}
          </button>
        </form>

        <div className="overflow-x-auto bg-white/90 p-4 rounded-lg shadow">
          <table className="table-auto w-full border text-sm md:text-base animate-fadeIn delay-200">
            <thead>
              <tr className="bg-blue-100 text-blue-900">
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Time</th>
                <th className="p-2 border">Location</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map(m => (
                <tr key={m._id} className="border-t hover:bg-blue-50 transition">
                  <td className="p-2 border">{m.title}</td>
                  <td className="p-2 border">{new Date(m.date).toLocaleDateString()}</td>
                  <td className="p-2 border">{m.time}</td>
                  <td className="p-2 border">{m.location}</td>
                  <td className="p-2 border">{m.description}</td>
                  <td className="p-2 border text-center">
                    <button onClick={() => handleEdit(m)} className="text-yellow-600 hover:underline mr-2">Edit</button>
                    <button onClick={() => handleDelete(m._id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Meetings;

