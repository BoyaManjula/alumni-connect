import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    link: '',
    description: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showContent, setShowContent] = useState(false);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/jobs');
      setJobs(res.data);
    } catch (err) {
      console.error('Failed to fetch jobs', err);
    }
  };

  useEffect(() => {
    fetchJobs();
    const timer = setTimeout(() => setShowContent(true), 200); // 200ms delay before showing content
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/jobs/${editingId}`, newJob);
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/jobs', newJob);
      }
      setNewJob({ title: '', company: '', location: '', link: '', description: '' });
      fetchJobs();
    } catch (err) {
      console.error('Error saving job', err);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/jobs.jpg')" }} // Put your jobs.jpg in public folder
    >
      <div
        className={`min-h-screen bg-white/30 backdrop-blur-md py-10 px-6 rounded-xl max-w-5xl mx-auto shadow-xl
          transition-opacity duration-300 ease-in-out
          ${showContent ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-800 drop-shadow">
          💼 Alumni Job Opportunities
        </h1>

        {/* Post Job Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/50 shadow-xl p-6 rounded-xl mb-10 border border-blue-100 space-y-4 backdrop-blur-sm"
        >
          <h2 className="text-xl font-semibold text-blue-700">Post a New Job</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="title"
              value={newJob.title}
              onChange={handleChange}
              placeholder="Job Title"
              required
              className="input"
            />
            <input
              name="company"
              value={newJob.company}
              onChange={handleChange}
              placeholder="Company"
              required
              className="input"
            />
            <input
              name="location"
              value={newJob.location}
              onChange={handleChange}
              placeholder="Location"
              required
              className="input"
            />
            <input
              name="link"
              value={newJob.link}
              onChange={handleChange}
              placeholder="Application Link"
              className="input"
            />
          </div>
          <textarea
            name="description"
            value={newJob.description}
            onChange={handleChange}
            placeholder="Job Description"
            required
            className="input h-24 resize-none"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md"
          >
            ➕ Post Job
          </button>
        </form>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search jobs (title, company, location)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 mb-6 border border-blue-300 rounded-xl shadow-sm focus:outline-none focus:ring focus:border-blue-500 bg-white/70"
        />

        {/* Jobs List */}
        <div className="grid gap-6">
          {jobs
            .filter((job) =>
              `${job.title} ${job.company} ${job.location}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((job) => (
              <div
                key={job._id}
                className="bg-white/60 border border-gray-200 shadow-md rounded-xl p-6 relative backdrop-blur-sm"
              >
                {editingId === job._id ? (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      await axios.put(`http://localhost:5000/jobs/${job._id}`, newJob);
                      setEditingId(null);
                      setNewJob({ title: '', company: '', location: '', link: '', description: '' });
                      fetchJobs();
                    }}
                    className="space-y-3"
                  >
                    <input name="title" value={newJob.title} onChange={handleChange} required className="input" />
                    <input name="company" value={newJob.company} onChange={handleChange} required className="input" />
                    <input name="location" value={newJob.location} onChange={handleChange} required className="input" />
                    <input name="link" value={newJob.link} onChange={handleChange} className="input" />
                    <textarea name="description" value={newJob.description} onChange={handleChange} required className="input h-20 resize-none" />
                    <div className="space-x-2">
                      <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded-lg">✅ Save</button>
                      <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-4 py-1 rounded-lg">❌ Cancel</button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-blue-900">{job.title}</h2>
                    <p className="text-gray-600">
                      {job.company} — {job.location}
                    </p>
                    <p className="mt-2 text-gray-700 whitespace-pre-line">{job.description}</p>
                    {job.link && (
                      <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline mt-2 block"
                      >
                        🌐 Apply Here
                      </a>
                    )}
                    {job.tags?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="absolute top-4 right-4 space-x-2">
                      <button
                        onClick={() => {
                          setNewJob(job);
                          setEditingId(job._id);
                        }}
                        className="text-yellow-500 hover:text-yellow-700"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={async () => {
                          await axios.delete(`http://localhost:5000/jobs/${job._id}`);
                          fetchJobs();
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

export default Jobs;

