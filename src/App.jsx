import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Analytics from "./pages/Analytics";
import Wishlist from "./pages/Wishlist";
import Note from "./pages/Note";
import Settings from "./pages/Settings";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/Note" element={<Note />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;