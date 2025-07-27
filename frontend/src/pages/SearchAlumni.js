 import React, { useEffect, useState } from "react";
import axios from "axios";

function SearchAlumni() {
  const [alumniList, setAlumniList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    batch: "",
    email: "",
    branch: "",
    college: "",
  });
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    fetchAlumni();
    const timer = setTimeout(() => setShowContent(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const fetchAlumni = async () => {
    try {
      const res = await axios.get("http://localhost:3000/alumni");
      setAlumniList(res.data);
    } catch (error) {
      console.error("Error fetching alumni:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:3000/alumni/${id}`);
        setAlumniList(alumniList.filter((alumni) => alumni._id !== id));
      } catch (error) {
        console.error("Error deleting alumni:", error);
      }
    }
  };

  const handleEditClick = (alumni) => {
    setEditingId(alumni._id);
    setEditData({
      name: alumni.name,
      batch: alumni.batch,
      email: alumni.email,
      branch: alumni.branch,
      college: alumni.college,
    });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/alumni/${editingId}`,
        editData
      );
      const updatedList = alumniList.map((alumni) =>
        alumni._id === editingId ? res.data : alumni
      );
      setAlumniList(updatedList);
      setEditingId(null);
    } catch (error) {
      console.error("Error updating alumni:", error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/search-alumni.jpg')" }} // Place the image in /public
    >
      <div className="min-h-screen bg-white/30 backdrop-blur-sm flex items-center justify-center px-4 py-10">
        {showContent && (
          <div className="w-full max-w-7xl bg-white/70 p-8 rounded-3xl shadow-2xl animate-fade-in-up">
            <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
              🔍 Search Alumni by College
            </h2>

            <div className="flex justify-center mb-6">
              <input
                type="text"
                placeholder="Enter college name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="overflow-x-auto rounded-xl">
              <table className="w-full table-auto border-collapse shadow-md bg-white">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Batch</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Branch</th>
                    <th className="px-6 py-3 text-left">College</th>
                    <th className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {alumniList
                    .filter((alumni) =>
                      alumni.college
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((alumni) => (
                      <tr key={alumni._id} className="border-b hover:bg-gray-50">
                        {editingId === alumni._id ? (
                          <>
                            {["name", "batch", "email", "branch", "college"].map((field) => (
                              <td className="px-6 py-4" key={field}>
                                <input
                                  type={field === "batch" ? "number" : field === "email" ? "email" : "text"}
                                  name={field}
                                  value={editData[field]}
                                  onChange={handleEditChange}
                                  className="w-full border px-2 py-1 rounded"
                                />
                              </td>
                            ))}
                            <td className="px-6 py-4 text-center space-x-2">
                              <button
                                onClick={handleSave}
                                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                              >
                                Save
                              </button>
                              <button
                                onClick={handleCancel}
                                className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
                              >
                                Cancel
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="px-6 py-4">{alumni.name}</td>
                            <td className="px-6 py-4">{alumni.batch}</td>
                            <td className="px-6 py-4">{alumni.email}</td>
                            <td className="px-6 py-4">{alumni.branch}</td>
                            <td className="px-6 py-4">{alumni.college}</td>
                            <td className="px-6 py-4 text-center space-x-2">
                              <button
                                onClick={() => handleEditClick(alumni)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(alumni._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                              >
                                Delete
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchAlumni;

