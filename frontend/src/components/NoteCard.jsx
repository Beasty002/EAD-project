import { Pencil, Trash } from "lucide-react";
import NoteModal from "./NoteModal";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
const NoteCard = ({ data, refetch }) => {
  const [showModal, setShowModal] = useState(false);
  const handleDelte = async (id) => {
    try {
      const res = await axios.delete(
        `https://backend-80iz.onrender.com/api/notes/${id}`
      );
      console.log(res);
      refetch();
      toast.success("Successfully Delted Note");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="note-card group px-4 py-3 rounded-xl flex-1 bg-[#311b50] border border-purple-600  transform transition-transform duration-300 hover:scale-101 hover:shadow-lg shadow-purple-700 min-w-xl min-h-80">
        <div className="flex justify-between items-center gap-3">
          <h2 className="text-2xl font-bold break-words whitespace-normal">
            {data.title}
          </h2>
          <div className="flex gap-3 opacity-0 group-hover:opacity-100 min-w-7">
            <div
              onClick={() => setShowModal(true)}
              className="cursor-pointer p-2 hover:bg-blue-700 rounded-xl"
            >
              <Pencil size={18} />
            </div>
            <div
              onClick={() => handleDelte(data._id)}
              className="cursor-pointer p-2 hover:bg-red-700 rounded-xl"
            >
              <Trash size={18} />
            </div>
          </div>
        </div>
        <p className="mt-3">{data.description}</p>
      </div>
      {showModal && (
        <NoteModal
          data={data}
          onClose={() => setShowModal(false)}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default NoteCard;
