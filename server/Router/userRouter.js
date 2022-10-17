const express = require('express');
const router = express.Router();
const ChatUser = require("../Model/Users")

router.post("/register",async(req,res)=>{
    try {
        let {email , password,role} = req.body;
        let user = new ChatUser({email,password,role});
        user = await user.save();

        res.status(200).json({
            result : 'success',
            user : user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({errors : [{msg : 'Server Error'}]});
    }
})

module.exports = router;