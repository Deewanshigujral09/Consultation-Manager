import { useEffect, useState } from "react";
import axios from "axios";
import AddRecording from "../components/AddRecording";
import {
  FaMicrophone,
  FaUser,
  FaSearch,
  FaCalendarAlt,
  FaTrash,
  FaEdit,
  FaDownload,
} from "react-icons/fa";

const categoryColors = {
  Interview: "border-blue-500",
  "Career Guidance": "border-green-500",
  "Resume Review": "border-yellow-500",
  "Technical Consultation": "border-purple-500",
};

const categoryBadgeColors = {
  Interview: "bg-blue-600",
  "Career Guidance": "bg-green-600",
  "Resume Review": "bg-yellow-600",
  "Technical Consultation": "bg-purple-600",
};

function Dashboard() {
  const [recordings, setRecordings] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [showForm, setShowForm] = useState(false);

  const totalClients = new Set(recordings.map((r) => r.clientName)).size;
  const totalUploads = recordings.filter((r) => r.filePath).length;

  const fetchRecordings = async () => {
    try {
const res = await axios.get("https://consultation-manager.onrender.com/api/recordings");      setRecordings(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecordings();
  }, []);

  const updateRecording = async (id, title) => {
    try {
await axios.put(`https://consultation-manager.onrender.com/api/recordings/${id}`, { title });      setEditingId(null);
      fetchRecordings();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRecording = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recording?"))
      return;
    try {
await axios.delete(`https://consultation-manager.onrender.com/api/recordings/${id}`);      fetchRecordings();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredRecordings = recordings
    .filter((recording) => {
const matchesSearch = (recording.title || "")
  .toLowerCase()
  .includes(search.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" ||
        (recording.category || "Interview") === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOrder === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      return a.title.localeCompare(b.title);
    });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 md:p-8 shadow-xl mb-6 border border-slate-700">
          <div className="flex items-center justify-center gap-3 mb-2">
            <FaMicrophone className="text-blue-400 text-3xl md:text-4xl" />
            <h1 className="text-2xl md:text-4xl font-bold">
              Consultation Manager
            </h1>
          </div>
          <p className="text-center text-gray-400 text-sm md:text-base">
            Manage and organize your consultation recordings efficiently
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 md:p-6 flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <div className="bg-blue-500/20 p-2 md:p-4 rounded-xl">
              <FaMicrophone className="text-blue-400 text-lg md:text-2xl" />
            </div>
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-xs">Recordings</p>
              <h2 className="text-2xl md:text-3xl font-bold">
                {recordings.length}
              </h2>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 md:p-6 flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <div className="bg-green-500/20 p-2 md:p-4 rounded-xl">
              <FaUser className="text-green-400 text-lg md:text-2xl" />
            </div>
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-xs">Clients</p>
              <h2 className="text-2xl md:text-3xl font-bold">{totalClients}</h2>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 md:p-6 flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <div className="bg-purple-500/20 p-2 md:p-4 rounded-xl">
              <FaDownload className="text-purple-400 text-lg md:text-2xl" />
            </div>
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-xs">Uploads</p>
              <h2 className="text-2xl md:text-3xl font-bold">{totalUploads}</h2>
            </div>
          </div>
        </div>

        {/* ADD RECORDING */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl mb-6 overflow-hidden">
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-slate-800 transition-colors"
          >
            <span className="font-semibold text-lg flex items-center gap-2">
              <FaMicrophone className="text-blue-400" />
              Add New Recording
            </span>
            <span className="text-gray-400 text-xl">
              {showForm ? "−" : "+"}
            </span>
          </button>
          {showForm && (
            <div className="p-4 md:p-6 border-t border-slate-700">
              <AddRecording
                onAdded={() => {
                  fetchRecordings();
                  setShowForm(false);
                }}
              />
            </div>
          )}
        </div>

        {/* FILTERS */}
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 px-4 py-3 rounded-xl">
            <FaSearch className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-900 border border-slate-700 px-3 py-3 rounded-xl text-sm"
            >
              <option value="All">All Categories</option>
              <option value="Interview">Interview</option>
              <option value="Career Guidance">Career Guidance</option>
              <option value="Resume Review">Resume Review</option>
              <option value="Technical Consultation">Technical</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-slate-900 border border-slate-700 px-3 py-3 rounded-xl text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="az">A to Z</option>
            </select>
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-4">
          Showing {filteredRecordings.length} of {recordings.length} recordings
        </p>

        {filteredRecordings.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <FaMicrophone className="text-6xl mx-auto mb-4 opacity-20" />
            <p className="text-xl">No recordings found</p>
            <p className="text-sm mt-2">Try changing your search or filter</p>
          </div>
        )}

        {/* RECORDING CARDS */}
        {filteredRecordings.map((recording) => (
          <div
            key={recording._id}
            className={`bg-slate-900 border-l-4 ${
              categoryColors[recording.category] || "border-blue-500"
            } border border-slate-700 rounded-2xl p-4 md:p-6 shadow-lg mb-4 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <FaMicrophone className="text-blue-400 text-lg shrink-0" />
                {editingId === recording._id ? (
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="bg-slate-800 border border-slate-600 px-3 py-1 rounded-lg text-white font-bold outline-none w-full"
                    autoFocus
                  />
                ) : (
                  <h2 className="text-lg font-bold truncate">
                    {recording.title}
                  </h2>
                )}
              </div>
              <span
                className={`${categoryBadgeColors[recording.category] || "bg-blue-600"} px-2 py-1 rounded-full text-xs font-medium shrink-0 ml-2`}
              >
                {recording.category || "Interview"}
              </span>
            </div>

            <div className="flex flex-wrap gap-3 mb-3 text-sm text-gray-300">
              <span className="flex items-center gap-1">
                <FaUser className="text-green-400" /> {recording.clientName}
              </span>
              <span className="flex items-center gap-1">
                <FaCalendarAlt className="text-yellow-400" />
                {new Date(recording.consultationDate).toLocaleDateString()}
              </span>
            </div>

            {recording.notes && (
              <p className="text-gray-400 text-sm mb-3 bg-slate-800 p-3 rounded-lg">
                {recording.notes}
              </p>
            )}

            {recording.filePath && (
              <div className="mb-4">
                <span className="bg-blue-600/30 text-blue-300 border border-blue-600 px-3 py-1 rounded-full text-xs mb-3 inline-block">
                  FILE ATTACHED
                </span>
                <video
                  controls
                  className="w-full rounded-lg border border-slate-700 mt-2"
                >
                  <source
src={`https://consultation-manager.onrender.com${recording.filePath}`}                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <div className="mt-3">
                  <a
href={`https://consultation-manager.onrender.com${recording.filePath}`}                    download
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    <FaDownload />
                    Download File
                  </a>
                </div>
              </div>
            )}

            <div className="flex gap-2 mt-2">
              {editingId === recording._id ? (
                <>
                  <button
                    onClick={() => updateRecording(recording._id, editTitle)}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditingId(recording._id);
                      setEditTitle(recording.title);
                    }}
                    className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => deleteRecording(recording._id)}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <FaTrash /> Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
