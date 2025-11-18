const User = require("../models/user.js");

//render signUp form
module.exports.renderSignUpForm = (req , res)=>{
    res.render("main/signUpForm.ejs")
};

//sign up logic
module.exports.signUp = async(req , res)=>{
    try{
        let {username , email , password, subject} = req.body;
    
        let image= '';
        if(subject.trim() === "maths"){
            image = 'https://res.cloudinary.com/dkd2ekmmf/image/upload/v1762559819/Gemini_Generated_Image_ct56hjct56hjct56_vmd7wg.png';
        }else if(subject.trim() === "physics"){
            image = 'https://res.cloudinary.com/dkd2ekmmf/image/upload/v1762559771/Gemini_Generated_Image_2jtw1g2jtw1g2jtw_iyfvq5.png';
        }else{
            image = 'https://res.cloudinary.com/dkd2ekmmf/image/upload/v1762559786/Gemini_Generated_Image_kn6tedkn6tedkn6t_egnl79.png';
        }
        

        const user = new User({username , email , image});
        const registeredUser = await User.register(user , password);
        req.login(registeredUser , (err)=>{
            if(err) {
                return next(err)
            };
            req.flash("success" , "Welcome to Maje Ke Baat");
            res.redirect("/home");

        });
        
    }catch(e){
        req.flash("error" , e.message);
        res.redirect(req.session.redirectUrl || "/signUp");
    }
};

//render login form
module.exports.renderLoginForm = (req , res)=>{
    res.render("main/logIn.ejs");
};


//login logic handled by passport middleware in routes
module.exports.login = async(req , res)=>{
    req.flash("success", "You logged in successfully.");
    let redirectUrl = res.locals.redirectUrl || "/home";
    res.redirect(redirectUrl);
};

//logOut
module.exports.logOut= (req , res , next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }   
        req.flash("success" , "Logged out successfully.");
        res.redirect("/home");
    }   
);
};