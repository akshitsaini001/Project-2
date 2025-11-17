const express= require("express");
const router = express.Router();
const { wrapAsync , saveRedirectUrl } = require("../Middleware.js");
const passport = require("passport");
const userController = require("../controller/user.js")


router.get("/signUp" , userController.renderSignUpForm);

router.post("/signup" , wrapAsync(userController.signUp) );

router.get("/login" ,userController.renderLoginForm );

router.post("/login", saveRedirectUrl , passport.authenticate("local", {failureRedirect : "/login" , failureFlash: true} ), userController.login );

router.get("/logout" , userController.logOut);

module.exports= router;