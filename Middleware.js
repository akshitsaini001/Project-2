function wrapAsync(fn){
    return function(req, res, next){
        fn(req, res, next).catch((err) => next(err));
    }
};

const { postSchema } = require("./Schema.js");
const Content = require("./models/post.js");
const Comment = require("./models/comment.js");

const ExpressError = require("./ExpressError.js");

const validatePost = (req, res, next) => {
    const {error} = postSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError( 400 , msg);
    }
    else{
        next();
    }

};

const isLoggedIn = (req , res , next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error" , "You must be logged in first.");
        return res.redirect("/login");
    }   
    next();
};

const saveRedirectUrl = (req , res , next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

const assignAuthor = (req , res , next)=>{
    req.body.post.author = req.user._id;
    next();
}

const assignAuthorToComment = (req , res , next)=>{
    req.body.comment.writer = req.user._id;
    next();
};

const isOwner = async (req , res , next)=>{
    let {id} = req.params;
    let post = await Content.findById(id);
    if(!post.author.equals(req.user._id)){
        req.flash("error" , "You do not have permission to do that.");
        return res.redirect(`/view/${id}`);
    }
    next();
};


const isCommentWriter = async (req , res , next)=>{
    let {post_id ,comment_id} = req.params;
    
    let comment = await Comment.findById(comment_id);
    if(!comment.writer.equals(req.user._id)){
        req.flash("error" , "You do not have permission to do that.");
        return res.redirect(`/view/${post_id}`);
    }
    next();
}

module.exports = { wrapAsync , validatePost , isLoggedIn, saveRedirectUrl , assignAuthor , assignAuthorToComment , isOwner , isCommentWriter };