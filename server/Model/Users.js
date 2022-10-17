const mongoose = require('mongoose');

let ChatUserSchema = new mongoose.Schema({
    email : {type : String , required : true, unique : true},
    password : {type : String , required : true},
    role : {type : String},
    created : {type : Date , default : Date.now()}
});
let ChatUser = mongoose.model('chatuser' , ChatUserSchema);
module.exports = ChatUser;
