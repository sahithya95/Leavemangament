var express = require("express");
var router  = express.Router();
var LRequest =require('../model/leave-request');
var govtHolidays = require('../model/holidays');
var passport = require("passport");
require('../config/passport')(passport);






function calcBusinessDays(dDate1, dDate2) { // input given as Date objects
  var iWeeks, iDateDiff, iAdjust = 0;
  if (dDate2 < dDate1) return -1; // error code if dates transposed
  var iWeekday1 = dDate1.getDay(); // day of week
  var iWeekday2 = dDate2.getDay();
  iWeekday1 = (iWeekday1 == 0) ? 7 : iWeekday1; // change Sunday from 0 to 7
  iWeekday2 = (iWeekday2 == 0) ? 7 : iWeekday2;
  if ((iWeekday1 > 5) && (iWeekday2 > 5)) iAdjust = 1; // adjustment if both days on weekend
  iWeekday1 = (iWeekday1 > 5) ? 5 : iWeekday1; // only count weekdays
  iWeekday2 = (iWeekday2 > 5) ? 5 : iWeekday2;

  // calculate differnece in weeks (1000mS * 60sec * 60min * 24hrs * 7 days = 604800000)
  iWeeks = Math.floor((dDate2.getTime() - dDate1.getTime()) / 604800000)

  if (iWeekday1 <= iWeekday2) {
    iDateDiff = (iWeeks * 5) + (iWeekday2 - iWeekday1)
  } else {
    iDateDiff = ((iWeeks + 1) * 5) - (iWeekday1 - iWeekday2)
  }

  iDateDiff -= iAdjust // take into account both days on weekend

  return removeGovtHolidays(iDateDiff + 1, dDate1, dDate2)

}


function removeGovtHolidays(totalDays, startDate, endDate) {
  let properTotalDays = totalDays;
  return properTotalDays
}




//show LRequest form only for admin
router.get("/LRequest",passport.authenticate('jwt', { session: false }), function(req, res){
  if(req.user.role=="Admin"){
    LRequest.find(function (err, leaves) {
        if (err) return next(err);
        res.json(leaves);
      });
    }
    else{
      res.send('not permitted');
    }
    
});


//get specific user's leave request
router.get('/LRequest/:id', passport.authenticate('jwt', { session: false }),function(req, res, next) {
  const id = req.params.id;
  LRequest.find()
    .where('UID').equals(id)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
  });

//post LRequest
router.post("/LRequest",passport.authenticate('jwt', { session: false }),function(req, res){
  console.log(req.user.id,req.body.leaveType,req.body,req.user,"shjg")
  var date1 = new Date(req.body.Start_Date);
  var date2 = new Date(req.body.End_Date);
  var diffDays = calcBusinessDays(date1,date2);
  govtHolidays.find(function (err, leaves) {
    if (err) return next(err);
    let properHolidays = []
    leaves.map(val => {
      let holidayGovt = new Date(val.date).getTime()
      let startDateMilli = new Date(date1).getTime()
      let endDateMilli = new Date(date2).getTime()
      if(holidayGovt >= startDateMilli && holidayGovt <= endDateMilli) {
        properHolidays.push(val)
      }
    })
    // console.log('leaves', leaves)
    properTotalDays = diffDays - properHolidays.length
    // console.log('properHolidays', properTotalDays, diffDays)
    LRequest.create({
      name:req.user.email,
      UID:req.user.id,
      leave_type:req.body.leave_type,
      Start_Date:req.body.Start_Date,
      End_Date:req.body.End_Date,
      No_of_days:properTotalDays
          },function (err, post) {
      if (err){ 
        console.log(err,"fhgfhg")
        }
      res.json(post);
    });
  });
});

//delete LRequest
// router.delete("/LRequest/:id",middleware.isLoggedIn ,function(req, res){
//     LRequest.findByIdAndRemove(req.params.id,function (err, del) {
//     if (err) return next(err);
//     res.json(del);
//   });
// });



//update LRequest
router.post("/update/:id",passport.authenticate('jwt', { session: false }),function(req, res){
  console.log(req.params.id,req.body.status,"hh")
  if(req.user.role=="Admin"){
    console.log(req.params.id,req.body.status,"update")
    LRequest.findByIdAndUpdate(req.params.id,{status:req.body.status},function (err, update) {
    if (err) {
      return next(err)
    }
    else{
    
      res.json(update);

    }
  });
}else{
  res.send('not permitted');
}

});


module.exports = router;