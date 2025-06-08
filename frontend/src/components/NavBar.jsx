import React from "react";
import Notes from "./../assets/Notes.png";
const NavBar = () => {
  return (
    <div className="py-4 px-2 md:px-20 flex flex-row gap-2 items-center backdrop-blur-sm bg-gray-900/10 border-b  border-purple-800">
      <img src={Notes} alt="My SVG Icon" className="w-12" />
      <span className="text-3xl text-white opacity-50 font-bold font-rajdhani">
        NoteNow
      </span>
    </div>
  );
};

export default NavBar;
