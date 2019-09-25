var express = require("express");
var router  = express.Router();
var User = require("../model/user");
// var middleware = require("../middleware");
var LeaveTable =require('../model/leave-table');
var passport = require("passport");
// var  jwt  = require('jsonwebtoken');
// var config  = require('../config/main');

require('../config/passport')(passport);



//show leavetable form
router.get("/leavetable", passport.authenticate('jwt', { session: false }),function(req, res){
  console.log(req.user._id ,req.user.role,"type");
  // if(req.user.role=="Admin"){
  LeaveTable.find(function (err, leaves) {
    if (err) return next(err);
    res.json(leaves);
  });
  // }
  // else{
  //   res.send('not permitted');
  // }
});


//add leavetable
router.post("/leavetable",passport.authenticate('jwt', { session: false }),function(req, res){
  console.log(req.user._id ,req.user.role,"sss");
  if(req.user.role=="Admin"){
    LeaveTable.create(req.body,function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
} else{
  res.send('not permitted');
}
});

//delete leavetable
router.delete("/leavetable/:id",passport.authenticate('jwt', { session: false }) ,function(req, res){
  console.log(req.user._id ,req.user.role,"sss");
  if(req.user.role=="Admin"){
    LeaveTable.findByIdAndRemove(req.params.id,function (err, del) {
    if (err) return next(err);
    res.json(del);
  });
} else{
  res.send('not permitted');
}

});



//edit leavetable
router.post("/leavetable/:id",passport.authenticate('jwt', { session: false }),function(req, res){
  console.log(req.user._id ,req.user.role,"sss");
  if(req.user.role=="Admin"){
    LeaveTable.findByIdAndUpdate(req.params.id, req.body,function (err, edit) {
    if (err) return next(err);
    res.json(edit);
  });
} else{
  res.send('not permitted');
}
});


module.exports = router;