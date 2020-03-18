var express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")


// var campgrounds = [
//     {name: "Santorini Blues", image: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
//     {name: "Nevada Creek", image: "https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80"},
//     {name: "Montana Hills", image: "https://images.unsplash.com/photo-1507163525711-618d70c7a8f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1048&q=80"},
//     {name: "Santorini Blues", image: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
//     {name: "Nevada Creek", image: "https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80"},
//     {name: "Montana Hills", image: "https://images.unsplash.com/photo-1507163525711-618d70c7a8f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1048&q=80"}
// ];

mongoose.connect("mongodb://localhost/yelpcamp");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");

//Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//         name: "Nevada Creek",
//         image: "https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80",
//         description: "This is serene, no bathrooms, beautiful hills and resting rooms."
//     },
//     function (err, campground) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED:");
//             console.log(campground);
//         }
//     }
// );

app.get("/", function (req, res) {
    res.render("landing");
});


//INDEX
app.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {
                campgrounds: allCampgrounds
            });
        }
    });
});


//CREATE
app.post("/campgrounds", function (req, res) {
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
app.get("/campgrounds/new", function (req, res) {
    res.render("new.ejs");
});


//SHOW
app.get("/campgrounds/:id", function (req, res) {
    // Find campground with provided id
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {
                campground: foundCampground
            });
        }
    });

    // Render show template with that campground

});

app.listen(3000, function () {
    console.log('yelpcamp');
});