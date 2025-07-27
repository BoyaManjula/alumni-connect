import React, { useState } from "react";
import axios from "axios";

function AlumniForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    batch: "",
    branch: "",
    college: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/alumni/", formData);
      alert("✅ Alumni data submitted!");
      setFormData({
        name: "",
        email: "",
        batch: "",
        branch: "",
        college: "",
      }); // reset form after submit
    } catch (err) {
      console.error("❌ Error:", err);
      setError("❌ Submission failed. Try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Alumni</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="batch"
          value={formData.batch}
          onChange={handleChange}
          placeholder="Batch Year"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          placeholder="Branch / Department"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="college"
          value={formData.college}
          onChange={handleChange}
          placeholder="College Name"
          className="w-full p-2 border rounded"
          required
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AlumniForm;

