const express= require("express");
const router = express.Router();
const { wrapAsync , assignAuthorToComment , isLoggedIn , isCommentWriter} = require("../Middleware.js");
const commentController = require("../controller/comment.js");


//To add a comment
router.post("/post/:id/comment",isLoggedIn,assignAuthorToComment , wrapAsync (commentController.addComment));


//Delete comment

router.delete("/post/:post_id/comment/:comment_id",isLoggedIn , isCommentWriter, wrapAsync(commentController.deleteComment));

module.exports = router;