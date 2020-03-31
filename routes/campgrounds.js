var express    = require("express");
var router     = express.Router();
var Campground = require("../models/campgrounds");

//INDEX
router.get("/", function (req, res) {
    console.log(req.user);
    //get all campgrounds from DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {
                campgrounds: allCampgrounds,
                currentUser: req.user
            });
        }
    });
});


//CREATE
router.post("/", function (req, res) {
    // res.send('post route');
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {
        name: name,
        image: image,
        description: desc
    };
    // campgrounds.push(newCampground);
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        };
    });
});


//NEW
router.get("/new", function (req, res) {
    res.render("campgrounds/new");
});


//SHOW
router.get("/:id", function (req, res) {
    // Find campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {
                campground: foundCampground
            });
        }
    });

    // Render show template with that campground

});

module.exports = router;