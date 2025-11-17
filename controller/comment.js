const Comment = require("../models/comment.js");
const Content = require("../models/post.js");

//To add a comment
module.exports.addComment = async (req , res)=>{
    let {id} = req.params;
    let post = await Content.findById(id).populate("comments");

    let newComment = new Comment(req.body.comment);
    post.comments.push(newComment);
    await newComment.save();
    await post.save();
    req.flash("success" , "Comment added successfully.")
    res.redirect(`/view/${id}`);
}

//Delete comment
module.exports.deleteComment = async(req , res)=>{
    let {post_id ,  comment_id} = req.params;
    let post = await Content.findByIdAndUpdate(post_id , {$pull :{comments: comment_id}});
    let deletedComment = await Comment.findByIdAndDelete(comment_id);
    req.flash("error" , "Comment Deleted Successfully.")
    res.redirect(`/view/${post_id}`);
}