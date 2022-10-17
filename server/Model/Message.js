const mongoose = require('mongoose');

let ChatMessageSchema = new mongoose.Schema({
    userId : {type : Number, required: true},
    messageBody : {type : String, required: true},
    timestamp : {type : Date }
});
let ChatMessage = mongoose.model('chatMessage' , ChatMessageSchema);
module.exports = ChatMessage;
