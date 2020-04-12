var Campground = require("../models/campgrounds")
var Comment = require("../models/comment")
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
        if(req.isAuthenticated()){
            // is user loggind in
           Campground.findById(req.params.id, function(err, foundCampground){
                if(err){
                    req.flash("error", "Campground not found.");
                    res.redirect("/campgrounds");
                } else {
                    //does he owns campground
                    if(foundCampground.author.id.equals(req.user._id)){
                        next();
                    } else {
                        req.flash("error", "You don't have permission to do that.");
                        res.redirect("back");
                    }
                }
            });
    
        } else {
            req.flash("error", "You need to be logged in.");
            res.redirect("back");
        }
    }

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        // is user loggind in
       Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                //does he owns comment
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("back");
                }
            }
        });

    } else {
        req.flash("error", "You need to logged in first.");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    req.flash("error", "You need to be logged in.");
    res.redirect("/login");
}

module.exports = middlewareObj;