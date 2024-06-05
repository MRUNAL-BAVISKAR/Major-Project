module.exports.isLoggedIn = (req,res,next) =>{
    console.log(req.user);
    if(!req.isAuthenticated()){
        req.flash("error", "You must be logged in to create listing");
       return  req.redirect("/login");
    }
    next();
}
module.exports.saveRedirectUrl = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};