const express= require("express");
const router = express.Router();
const { wrapAsync , validatePost , isLoggedIn , assignAuthor , isOwner } = require("../Middleware.js");
const listingController = require("../controller/post.js");


//For home page and show all posts
router.get("/" , wrapAsync (listingController.index));



//to create new post
router.post("/new" ,isLoggedIn,assignAuthor, wrapAsync(listingController.createPost));

//View post in detail
router.get("/view/:id" ,validatePost, wrapAsync (listingController.viewPost));

//Render edit form
router.get("/edit/:id", isLoggedIn ,wrapAsync(listingController.renderEditForm));

//Edit post
router.put("/edit/:id",isLoggedIn , isOwner ,wrapAsync( listingController.editPost));

//Delete post
router.delete("/delete/:id", isLoggedIn, isOwner ,wrapAsync( listingController.deletePost));


module.exports = router;