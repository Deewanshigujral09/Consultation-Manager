import { useState, useRef } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa";

function AddRecording({ onAdded }) {
  const [title, setTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [consultationDate, setConsultationDate] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("Interview");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (
      selected &&
      !selected.type.startsWith("audio/") &&
      !selected.type.startsWith("video/")
    ) {
      setError("Please upload a valid audio or video file.");
      setFile(null);
      return;
    }
    setError("");
    setFile(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("clientName", clientName);
      formData.append("consultationDate", consultationDate);
      formData.append("category", category);
      formData.append("notes", notes);
      if (file) formData.append("audio", file);

      await axios.post(
        "https://consultation-manager.onrender.com/api/recordings/upload",
        formData,
      );
      setTitle("");
      setClientName("");
      setConsultationDate("");
      setNotes("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      onAdded();
    } catch (err) {
      setError(
        err.response?.data?.message || "Upload failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaUpload className="text-blue-400" />
        Add New Recording
      </h2>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-xl mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-500/20 border border-green-500 text-green-300 p-3 rounded-xl mb-4">
          ✅ Recording uploaded successfully!
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-slate-800 border border-slate-700 focus:border-blue-500 outline-none p-3 rounded-xl transition-colors"
          required
        />

        <input
          type="text"
          placeholder="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="bg-slate-800 border border-slate-700 focus:border-blue-500 outline-none p-3 rounded-xl transition-colors"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-slate-800 border border-slate-700 focus:border-blue-500 outline-none p-3 rounded-xl transition-colors"
        >
          <option>Interview</option>
          <option>Career Guidance</option>
          <option>Resume Review</option>
          <option>Technical Consultation</option>
        </select>

        <input
          type="date"
          value={consultationDate}
          onChange={(e) => setConsultationDate(e.target.value)}
          className="bg-slate-800 border border-slate-700 focus:border-blue-500 outline-none p-3 rounded-xl transition-colors"
          required
        />

        <div className="md:col-span-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*,video/*"
            onChange={handleFileChange}
            className="bg-slate-800 border border-slate-700 p-3 rounded-xl w-full"
          />
          <p className="text-gray-500 text-xs mt-1">
            Supported: audio and video files
          </p>
        </div>
      </div>

      <textarea
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="bg-slate-800 border border-slate-700 focus:border-blue-500 outline-none p-3 rounded-xl w-full mt-4 transition-colors"
        rows="3"
      />

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors"
      >
        <FaUpload />
        {loading ? "Uploading..." : "Upload Recording"}
      </button>
    </div>
  );
}

export default AddRecording;
