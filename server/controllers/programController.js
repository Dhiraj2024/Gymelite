const Program = require('../models/Program');

const getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find().populate('trainer', 'name').populate('reviews');
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id).populate('trainer').populate('reviews');
    if (!program) return res.status(404).json({ message: 'Program not found' });
    res.json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProgram = async (req, res) => {
  try {
    const program = new Program(req.body);
    await program.save();
    res.status(201).json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProgram = async (req, res) => {
  try {
    await Program.findByIdAndDelete(req.params.id);
    res.json({ message: 'Program deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const likeProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(
      req.params.id,
      { inc: { likes: 1 } },
      { new: true }
    );
    if (!program) return res.status(404).json({ message: 'Program not found' });
    res.json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
  likeProgram,
};
