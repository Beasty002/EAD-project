import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const NoteModal = ({ data = null, onClose, refetch }) => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (data) {
        const res = await axios.put(
          `http://localhost:5000/api/notes/${data._id}`,
          {
            _id: formData.id,
            title: formData.title,
            description: formData.description,
          }
        );
        console.log(res);
        toast.success("Successfully Updated Note");
      } else {
        await axios.post("http://localhost:5000/api/notes/add", {
          title: formData.title,
          description: formData.description,
        });
        toast.success("Successfully Added Note");
      }

      onClose();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      setFormData({
        id: data._id,
        title: data.title,
        description: data.description,
      });
    }
  }, []);

  return (
    <div className="bg-black/70 backdrop-blur-xs fixed inset-0 flex items-center justify-center z-40">
      <div className="flex flex-col gap-4  bg-[#18092d] border border-purple-600 rounded-xl px-6 py-4 min-w-4xl ">
        <h2 className="text-xl font-bold">
          {data ? "Edit Note" : "Create New Note"}
        </h2>

        <form
          action=""
          className="flex-1 flex flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Enter Title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="flex-1  px-4 py-2 border border-purple-700 focus:border-purple-500 outline-none  bg-gray-800/70 backdrop-blur-sm rounded-[8px]"
            required
          />{" "}
          <textarea
            name=""
            id=""
            rows={7}
            placeholder="Enter Note Content"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="flex-1  px-4 py-2 border border-purple-700 focus:border-purple-500 outline-none  bg-gray-800/70 backdrop-blur-sm rounded-[8px]"
            required
          />
          <div className="mt-3 flex gap-6 justify-end">
            <button
              type="button"
              className="font-bold border cursor-pointer px-4 py-2 rounded-[8px] border-purple-400/20 bg-black/10 hover:bg-black/100 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="font-bold border cursor-pointer px-4 py-2 rounded-[8px] bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              {data ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
