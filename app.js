var path = require('path');
var cors = require('cors');
var flash1 = require('express-flash');
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    config      = require('./config/main'),

    cookieParser = require("cookie-parser"),

    flash        = require("connect-flash"),




    methodOverride = require("method-override");
// configure dotenv
// require('dotenv').load();

//requiring routes
var leavrRequestRoute    = require("./routes/leave-request"),
    leaveTableRoute = require("./routes/leave-table"),
    UserRoute      = require("./routes/users")
    holiday = require('./routes/holidays');





mongoose.Promise = global.Promise;
mongoose.connect(config.database)
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));







app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,'dist')));
app.use(bodyParser.json()); 
app.use(bodyParser.text()); 
app.use(cors());
// app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));
//require moment
app.locals.moment = require('moment');
app.use(flash1());
// seedDB(); //seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.session());


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});



// app.use('/iii', express.static(path.join(__dirname, 'dist')));
app.use("/", UserRoute,express.static(path.join(__dirname,'/dist')));
app.use("/leavetable", leaveTableRoute,);
app.use("/LRequest", leavrRequestRoute);
// app.use("/LRequest/update/:id", leavrRequestRoute);
app.use("/holiday",holiday);


// app.listen(process.env.PORT ||3000, process.env.IP, function(){
//    console.log("The YelpCamp Server Has Started!");
// });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});




module.exports = app;