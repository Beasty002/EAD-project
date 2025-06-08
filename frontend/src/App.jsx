import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Particles from "./react-bit/particles";
import NoteCard from "./components/NoteCard";
import axios from "axios";
import NoteModal from "./components/NoteModal";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notes/getAll");
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const filteredNotes = data.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="h-screen flex flex-col gap-8 bg-gradient-to-br  from-gray-900  via-purple-900  to-indigo-900 transition-all duration-500 overflow-auto pb-4">
      <NavBar />

      <main className="px-2 md:px-20 z-40 flex-1">
        <div className="flex gap-4 items-center text-[18px]">
          <input
            type="text"
            placeholder="Search Notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1  px-4 py-2 border border-purple-700 focus:border-purple-500 outline-none  bg-gray-800/70 backdrop-blur-sm rounded-[8px]"
          />
          <button
            onClick={() => setShowModal(true)}
            className="flex gap-4 font-bold border cursor-pointer px-4 py-2 rounded-[8px] bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span>+</span> New Note
          </button>
        </div>
        <div className="mt-4 flex gap-4 flex-wrap">
          {filteredNotes?.map((item, index) => (
            <NoteCard data={item} key={index} refetch={fetchData} />
          ))}
          {/* <NoteCard /> */}
        </div>
      </main>
      {showModal && (
        <NoteModal onClose={() => setShowModal(false)} refetch={fetchData} />
      )}
      <Toaster />
    </div>
  );
};

export default App;
