import noteModel from "../models/noteModel.js";

const getNotes = async (req, res) => {
  try {
    const notes = await noteModel.find();
    res.json(notes);
  } catch (error) {
    console.log(error);
  }
};

const createNote = async (req, res) => {
  try {
    const newNote = new noteModel(req.body);
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.log(error);
  }
};

const updateNote = async (req, res) => {
  try {
    const updateNote = await noteModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updateNote);
  } catch (error) {
    console.log(error);
  }
};

const deleteNote = async (req, res) => {
  try {
    await noteModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Successfully deleted" });
  } catch (error) {
    console.log(error);
  }
};

export { getNotes, updateNote, deleteNote, createNote };



