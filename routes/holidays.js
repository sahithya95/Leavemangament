var express = require("express");
var router  = express.Router();

var holiday =require('../model/holidays');
var passport = require("passport");


require('../config/passport')(passport);



//show holiday form
router.get("/holiday", passport.authenticate('jwt', { session: false }),function(req, res){
  console.log(req.user._id ,req.user.role,"sss");
  if(req.user.role=="Admin"){
  holiday.find(function (err, leaves) {
    if (err) return next(err);
    res.json(leaves);
  });
  }
  else{
    res.send('not permitted');
  }
});


//add holiday
router.post("/holiday",passport.authenticate('jwt', { session: false }),function(req, res){
  console.log(req.user._id ,req.user.role,"sss");
  if(req.user.role=="Admin"){
    holiday.create(req.body,function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
} else{
  res.send('not permitted');
}
});

//delete holiday
router.delete("/holiday/:id",passport.authenticate('jwt', { session: false }) ,function(req, res){
  console.log(req.user._id ,req.user.role,"sss");
  if(req.user.role=="Admin"){
    holiday.findByIdAndRemove(req.params.id,function (err, del) {
    if (err) return next(err);
    res.json(del);
  });
} else{
  res.send('not permitted');
}

});



//edit holiday
router.post("/holiday/:id",passport.authenticate('jwt', { session: false }),function(req, res){
  console.log(req.user._id ,req.user.role,"sss");
  if(req.user.role=="Admin"){
    holiday.findByIdAndUpdate(req.params.id, req.body,function (err, edit) {
    if (err) return next(err);
    res.json(edit);
  });
} else{
  res.send('not permitted');
}
});


module.exports = router;