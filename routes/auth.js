// auth routes
var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var User     = require("../models/user");

//root
router.get("/", function (req, res) {
    res.render("landing");
});

// show regsister form
router.get("/register", function(req, res){
    res.render("register");
})

// sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.render("register", {"error": err.message});
        } 

        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Yelpcamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login", function(req, res){
    res.render("login");
})

//handling logic; post, middleware, callback.
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
        failureFlash: true
    }), function(req, res){

});

//logout
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged Out!")
    res.redirect("/campgrounds");
})

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login");
}

module.exports = router;