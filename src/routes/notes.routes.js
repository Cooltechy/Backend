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

router.get("/", async (req, res) => {
	try{

		const notes = await noteModel.find()
		res.status(200).json({
			message: "Notes fetched successfully",
			notes,
		});
	}
	catch(error){
		res.status(500).json({
      	message: "Failed to create note",
      	error: error.message,
    });
	}
});

router.get('/:id' , async (req,res)=>{
	try{
		const notesID = req.params.id
		
		const notes = await  noteModel.findOne({_id : notesID})

		if(! notes)	return res.status(404).json({message : `No notes existed with ${notesID}`})

		res.status(201).json({
			message : `notes found with ${notesID}`,
			notes
		})
		
	}
	catch(error){
		res.status(500).json({
      		message: "Failed to create note",
      		error: error.message,
    	})
	}
	
})

router.delete('/:id' , async (req , res)=>{
	try{
		
		const notesID = req.params.id

		await noteModel.findOneAndDelete({_id : notesID})

		res.status(200).json({
			message : `notes deleted with ${notesID}`
		})

	}
	catch(error){
		res.status(500).json({
      		message: "Failed to create note",
      		error: error.message,
    	})
	}


})

module.exports = router;
