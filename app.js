require('dotenv').config();
const express = require("express");
const app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.json());

const path = require("path");
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "/views"));

app.use(express.static("public"));
app.use(express.static(path.join(__dirname , "public")));

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const ejsMate = require("ejs-mate");
app.engine("ejs" , ejsMate);

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const ExpressError = require("./ExpressError.js");

const cookieParser = require("cookie-parser");
app.use(cookieParser());
const dburl = process.env.ATLASDB_URL;

const mongoose = require("mongoose");

main()
    .then(()=>{
        console.log("Connected to Database.")
    }).catch(err => console.log(err));

    
async function main() {
    await mongoose.connect(dburl);
}

const postRouter = require("./routes/post.js");
const commentRouter = require("./routes/comment.js");
const userRouter =require("./routes/user.js");
const profileRouter = require("./routes/profile.js");
const searchRouter = require("./routes/search.js");

 
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const store = MongoStore.create({
    mongoUrl: dburl,
    crypto: {
        secret: process.env.SECRET_KEY
    },
    touchAfter: 24*60*60
});

store.on("error" , ()=>{
    console.log("Session store error" , err);
});
const sessionOptions = { 
    store,
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,   
    cookie:{
        expires: Date.now()+ 7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    } 
};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());







const port = 8080;
app.listen(port , ()=>{
    console.log("App is listening on port 8080");
    
});

app.use((req , res , next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
})




app.use("/", postRouter);
app.use("/", commentRouter);
app.use("/" , userRouter);
app.use("/", profileRouter);
app.use("/" , searchRouter);

app.get( (req, res , next) => {
    next(new ExpressError("Page Not Found", 404));

})

app.use((err, req, res, next) => {
    let { status = 500, message = "Something went wrong" } = err;
    res.status(status).render("main/error.ejs" , {message});
})

