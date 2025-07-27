const express = require('express')
const userModel = require('../models/user.model')



const router = express.Router()

router.post('/register' , async (req,res)=>{
    try{

		const {username,password,email} = req.body
        
        if( ! (username && password && email) )
            return res.status(402).json({
                message : "Fields are missing required all fields"
            })

        const isUserExist = await userModel.findOne({
            $or: [
                    { email },
                    { username }
                ]
            })

        if( isUserExist )
            return res.status(409).json({message : 'user already existed'})

        const user = await userModel.create({username,password,email})

        res.status(200).json({
            message :'user registered succesfully',
            user
        })
        

	}
	catch(error){
		res.status(500).json({
      		message: "registraion failed",
      		error: error.message
    	})
	}
})


module.exports = router