const express = require('express')
const userModel = require('../models/user.model')
const req = require('express/lib/request')



const router = express.Router()

router.post('/register' , async (req,res)=>{
    try{

		const {username,password,email} = req.body
        
        if( ! (username && password && email) )
            return res.status(400).json({
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

router.post('/login' , async (req,res)=>{
    try{
        const {email , password} = req.body

        if( !email )
            return res.status(400).json({
                        message : "email missing"
                    })
        if( !password )
            return  res.status(400).json({
                        message : "password missing"
                    })
                    
        
        const user = await userModel.findOne({email})

        if( !user )
            return  res.status(404).json({
                        message : "user not exist"
                    })
        
        const isPasswordMatching = user.password === password
                    
        if( !isPasswordMatching )
            return  res.status(401).json({
                        message : "password not matched"
                    })

        res.status(200).json({
            message : 'user login successfully'
        })

    }
    catch(error){
		res.status(500).json({
      		message: "login failed",
      		error: error.message
    	})
	}
})


module.exports = router