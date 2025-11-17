const mongoose = require("mongoose");
const Comment = require('./comment.js')
const { type } = require("os");
const { ref } = require("process");

const contentSchema = new mongoose.Schema({
    date:{
        type:Date,
        default: Date(),
        required:true
    },
    content:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        default:0,
        required:true
        
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

contentSchema.post("findOneAndDelete" , async(post)=>{

    if(post){
        await Comment.deleteMany({_id: {$in : post.comments}});
    }
})

const Content  = mongoose.model("Content" , contentSchema);
module.exports = Content;