const express= require("express");
const router = express.Router();
const profileController = require("../controller/profile.js");
const { wrapAsync  } = require("../Middleware.js");


router.get("/profile/:id" , wrapAsync (profileController.userProfile));

router.get("/view/profile/:id" , wrapAsync(profileController.viewUserProfile));

module.exports = router;