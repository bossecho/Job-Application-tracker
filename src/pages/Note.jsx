import { useState } from "react";
import {
  Plus,
  Search,
  Trash2,
  Edit,
  StickyNote,
} from "lucide-react";

export default function Notes() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Wilcon Interview",
      content: "Bring resume, valid ID, and portfolio.",
      date: "July 18, 2026",
    },
    {
      id: 2,
      title: "Follow Up",
      content: "Send follow-up email after 5 business days.",
      date: "July 17, 2026",
    },
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");

  const addNote = () => {
    if (!title || !content) return;

    const newNote = {
      id: Date.now(),
      title,
      content,
      date: new Date().toLocaleDateString(),
    };

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Notes</h1>
        <p className="text-gray-400">
          Save interview tips, reminders, and important information.
        </p>
      </div>

      {/* Add Note */}
      <div className="bg-slate-900 rounded-xl p-5 border border-slate-700 space-y-4">

        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          rows="4"
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={addNote}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition"
        >
          <Plus size={18} />
          Add Note
        </button>
      </div>

      {/* Search */}
      <div className="relative">

        <Search
          size={18}
          className="absolute left-3 top-3.5 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Notes Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-slate-900 border border-slate-700 rounded-xl p-5 hover:border-blue-500 transition"
            >
              <div className="flex justify-between items-start">

                <div className="flex items-center gap-2">
                  <StickyNote className="text-blue-400" size={20} />
                  <h2 className="font-semibold text-lg text-white">
                    {note.title}
                  </h2>
                </div>

                <div className="flex gap-2">

                  <button className="text-yellow-400 hover:text-yellow-300">
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>

              <p className="text-gray-300 mt-4 whitespace-pre-wrap">
                {note.content}
              </p>

              <p className="text-xs text-gray-500 mt-5">
                {note.date}
              </p>

            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-500">
            No notes found.
          </div>
        )}

      </div>
    </div>
  );
}