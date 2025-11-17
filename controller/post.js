const Content = require("../models/post.js");
const User = require("../models/user.js");
const ExpressError = require("../ExpressError.js");


//Show all posts - home page
module.exports.index = async (req , res)=>{
    let posts = await Content.find().populate("author");
    res.render("main/home.ejs" , {posts})
};

//Create new post
module.exports.createPost = async (req , res) => {
    const newPost = new Content(req.body.post);
    await newPost.save();

    const user = await User.findById(req.user._id);
    user.posts.push(newPost);
    await user.save();

    req.flash("success" , "New post created !")
    res.redirect("/home")
};

//View post in detail
module.exports.viewPost = async(req , res , next)=>{
    let {id} = req.params;
    let post = await Content.findById(id).populate("comments").populate("author").populate({path: "comments", populate: {path: "writer"}});
    if(!post){
        next( new ExpressError( 404 ,"Post Not Found"));
        
    }
    res.render("main/view.ejs" , {post})
};

//Reder edit form
module.exports.renderEditForm = async (req , res)=>{
    let {id} = req.params;
    let post = await Content.findById(id);
    res.render("main/edit.ejs", {post});

}

//edit post
module.exports.editPost = async(req , res)=>{
    let {id} =  req.params;
    let {content} = req.body;
    if(!content || content.trim().length===0){
        req.flash("error" , "Content cannot be empty.");
        return res.redirect(`/edit/${id}`);
    }
    let updatedPost = await Content.findByIdAndUpdate(id , {content: content} , {new:true , runValidators:true});
    req.flash("success" , "Post updated successfully.")
    res.redirect(`/view/${id}`);
}


//Delete post
module.exports.deletePost = async (req , res)=>{
    let {id} = req.params;
    let userId = req.user._id;
    const user = await User.findByIdAndUpdate(userId , {$pull : {posts: id}});
    let post = await Content.findByIdAndDelete(id);

    req.flash("error" , "Post Deleted Successfully!")
    res.redirect("/home");
}