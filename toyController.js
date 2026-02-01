const Toy = require("../models/Toy");

exports.getAll = async (req, res) => {
  try {
    const toys = await Toy.find();
    res.json(toys);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const newToy = await Toy.create(req.body);
    res.status(201).json(newToy);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedToy = await Toy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedToy) return res.status(404).json({ message: "Toy not found" });
    res.json(updatedToy);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Toy.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
