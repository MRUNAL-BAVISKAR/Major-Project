const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
router.get("/signup", (req, res)=>{
    res.render("users/signup.ejs");
});


router.post("/signup",wrapAsync( async(req,res)=>{
    try{
        let{username, email, password} = req.body;
        const newUser = new User({ email, username});
        const registerUser = await User.register(newUser, password);
        console.log(registerUser);
        req.flash("success", "Welcome to WanderLust!");
        res.redirect("/listings");

        req.login(registerUser, (err)=>{
             if(err){
                return next(err);
             }
             req.flash("success", "Welcome to WanderLust!");
             res.redirect("/listings");
        });
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
  
}));

router.get("/login", (req,res)=>{
    res.render("users/login.ejs");
});


router.post("/login",saveRedirectUrl,
passport.authenticate("local", 
{failureRedirect:'/login',
 failureFlash: true}),
 async(req,res)=>{
    res.flash("success","Welcome to WanderLust! You are logged in!");

    res.redirect("/listings");

    let redirectUrl = req.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
});

router.get("/logout", (req,res, next)=>{
    req.logout((err)=>{
        if(err){
         return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    })
})


module.exports = router;