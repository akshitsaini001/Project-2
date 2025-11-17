const User = require("../models/user.js");

// Render the search page

module.exports.renderSearchPage = (req , res) => {
    res.render("main/search.ejs");
};

// Search for a user by username and redirect to their profile
module.exports.searchUserByUsername = async (req , res)=>{
    let {username} = req.query;
    let user = await User.findOne({username: username});

    if(!user){
        req.flash("error" , "User does not exist !");
        return res.redirect("/search");
    }

    res.redirect(`/view/profile/${user._id}`);
}