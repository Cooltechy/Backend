const express = require("express");
const noteModel = require("../models/note.model");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { title, description } = req.body;

    const notes = await noteModel.create({
      title,
      description,
    });


    res.status(201).json({
      message: "Notes Recevied  Successfully",
      notes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create note",
      error: error.message,
    });
  }
});

module.exports = router;
