const User = require("../models/user.js");


module.exports.userProfile = async (req , res)=>{
    let {id} = req.params;
    let user = await User.findById(id).populate({path: "posts", populate: {path: "author"}});
    res.render("profile/profile.ejs" , {user})
};

module.exports.viewUserProfile = async(req , res)=>{
    let {id}= req.params;
    let user = await User.findById(id).populate({path: "posts", populate: {path: "author"}});
    res.render("profile/profile.ejs" , {user})
}