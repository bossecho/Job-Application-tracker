import { Search, Plus } from "lucide-react";

function SearchFilter({ search, setSearch, priority, setPriority, onAdd }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search size={18} className="absolute left-3 top-3 text-slate-400" />
        <input
          type="text"
          placeholder="Search company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white outline-none"
        />
      </div>

      <div className="flex gap-3">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
        >
          <option>All</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button
          type="button"
          onClick={onAdd}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Add Company
        </button>
      </div>
    </div>
  );
}

export default SearchFilter;
