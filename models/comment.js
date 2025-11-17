const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    
    date:{
        type:Date,  
        default: Date(),
        required:true
    },  
    comment:{
        type:String,
        required:true
    },  
    writer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    
});

const Comment  = mongoose.model("Comment" , commentSchema);
module.exports = Comment;