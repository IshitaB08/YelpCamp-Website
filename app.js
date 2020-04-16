var express       = require('express'),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    flash         = require("connect-flash"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground    = require("./models/campgrounds"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDB        = require("./seeds")

//require routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/auth")

// var campgrounds = [
//     {name: "Santorini Blues", image: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
//     {name: "Nevada Creek", image: "https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80"},
//     {name: "Montana Hills", image: "https://images.unsplash.com/photo-1507163525711-618d70c7a8f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1048&q=80"}
// ];


mongoose.connect("mongodb://localhost/yelpcamp");
//mongoose.connect('mongodb+srv://<dbuser>:<password>@cluster0-c8lyo.mongodb.net/test?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useCreateIndex: true
// }).then(() => {
//     console.log('connected!')
// }).catch(err => {
//     console.log('ERROR:', err.message);
// });

app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();  //seed the database

// passport config
app.use(require("express-session")({
    secret: "once gfaikn",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

var port_number = app.listen(process.env.PORT || 3000);
app.listen(port_number);

// app.listen(3000, function () {
//     console.log('yelpcamp');
// });

//var port_number = app.listen(process.env.PORT || 3000);
//app.listen(port_number);

//Schema Setup

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
