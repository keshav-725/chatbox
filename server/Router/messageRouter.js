const express = require('express');
const router = express.Router();
const ChatMessage = require("../Model/Message");
var _ = require('underscore');

router.get("/",async(req,res)=>{
    try { 
        // Get all messages from the server
        const allMessage = await ChatMessage.find();
        // sort based on date so that messages will appear in the correct order
        allMessage.sort(function(a,b){
            return new Date(a.timestamp) - new Date(b.timestamp);
        });
        // Groups the messages in the order of their userId
        const groupedAllMessage = _.groupBy(allMessage, f=>{return f.userId});

        res.status(200).json({
            result : 'success',
            message : groupedAllMessage
        });
    } catch (error) { 
        console.error(error);
        res.status(500).json({errors : [{msg : 'Server Error'}]});
    }
})
router.get("/search",async(req,res)=>{
    try { 
        const searchQuery = req.query.text

        // Get all messages from the server based on the search query
        const allMessage = await ChatMessage.find({ "messageBody": { "$regex": searchQuery, "$options": "i" } });
        // sort based on date so that messages will appear in the correct order
        allMessage.sort(function(a,b){
            return new Date(a.timestamp) - new Date(b.timestamp);
        });
        // Groups the messages in the order of their userId
        const groupedAllMessage = _.groupBy(allMessage, f=>{return f.userId});

        res.status(200).json({
            result : 'success',
            message : groupedAllMessage
        });
    } catch (error) { 
        console.error(error);
        res.status(500).json({errors : [{msg : 'Server Error'}]});
    }
})

module.exports = router;