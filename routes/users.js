var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../model/user");
var crypto = require('crypto');
var async = require('async');
var  jwt  = require('jsonwebtoken');
var config      = require('../config/main');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
require('../config/passport')(passport);



router.post('/register', function(req, res) {  

  if(!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please enter email and password.' });
  } else {
    var newUser = new User({
      email: req.body.email,
      password: req.body.password
    });

  
    newUser.save(function(err) {
      if (err) {
        return res.json({ success: false, message: 'That email address already exists.'});
      }
      res.json({ success: true, message: 'Successfully created new user.' });
    });
  }
});

router.post('/authenticate', function(req, res) {  
  console.log(req.body,'database');
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({ success: false, message: 'Authentication failed. User not found.' });
    } else {
      
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
        
          var token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: 10080000*9 
          });
          res.json({ success: true, token: 'JWT ' + token });
        } else {
          res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
        }
      });
    }
  });
});




// logout route
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "See you later!");
  res.redirect("/campgrounds");
});





//show adduser form
router.get("/adduser",passport.authenticate('jwt', { session: false }), function(req, res){
  console.log(req.user._id ,req.user.role,"sss");
  if(req.user.role=="Admin"){
  User.find(function (err, leaves) {
    if (err) return next(err);
    res.json(leaves);
  });
  }
  else{
    res.send('not permitted');
  }
});





//add users
router.post("/adduser",passport.authenticate('jwt', { session: false }),function(req, res){
  console.log(req.body,"server")
  if(req.user.role=="Admin"){
    var newUser = new User({
      email: req.body.email,
      password: req.body.password,
      role:req.body.role
    });

  
    newUser.save(function(err) {
      if (err) {
        return res.json({ success: false, message: 'That email address already exists.'});
      }
      res.json({ success: true, message: 'Successfully created new user.' });
    });
  // User.create({email: req.body.email,password:req.body.password},function (err, post) {
  //   console.log(err,"err")
  //   if (err) return next(err);
  //   res.json(post);
  // });
}else{
  res.send('not permitted');
}
});

//delete users
router.delete("/adduser/:id",passport.authenticate('jwt', { session: false }) ,function(req, res){
  if(req.user.role=="Admin"){
  User.findByIdAndRemove(req.params.id,function (err) {
    if (err) {
      return res.json({ success: false, message: 'That email address not deleted'});
    }
    res.json({ success: true, message: 'Successfully deleted' });

  });
}else{
  res.send('not permitted');
}
});



//edit users
router.post("/adduser/:id",passport.authenticate('jwt', { session: false }) ,function(req, res){
  if(req.user.role=="Admin" || req.user){
    console.log("data",req.user.role,req.user)
  User.findByIdAndUpdate(req.params.id, req.body,function (err, edit) {
    if (err) {
      return res.json({ success: false, message: 'That email changed unsuccessfully'});
    }
    res.json({ success: true, message: 'Successfully changed' });

  });

}else{
  res.send('not permitted');
}
});



router.post('/forgot', function(req, res, next) {
  console.log(req.body);
  console.log("debufs");
  
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        }
  
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          console.log("call done")
          done(err, token, user);
        });
      })},
      (token,user,done)=>{
        console.log(done,token,user,"ddd")
        var smtpTransport = nodemailer.createTransport({
        
          service: 'SendGrid',
          auth: {
            user: 'sahithya',
            pass: 'sahithya123'
          }
        });
        console.log(user.email)
        var mailOptions = {
          to: user.email,
          from: 'sahithya.p@pacewisdom.com',
          subject: 'Node.js Password Reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://localhost:4200/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          res.send({text:"valid",status:true})
          // req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
          done(err, 'done');
        });
      }
     ], function(err) {
      console.log("err")
      // res.redirect('/');
      res.send({text:"invalid",status:false})
    })
});





router.post('/reset', function(req, res) {
  User.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      // return res.redirect('/forgot');'
      res.send({text:"invalid",status:false})

      return 'Password reset token is invalid or has expired.';
    }
    res.send({text:"valid", status:true})
  });
});


router.post('/resetpwd', function(req, res) {
  console.log(req.body,"ddv");

  async.waterfall([
    function(done) {
      console.log(req.body.token,"tokenss")
      User.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          console.log('error', 'Password reset token is invalid or has expired.')
          return res.redirect('back');
        }
        console.log(req.body.password,"ggfgg")
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save(function(err) {
          req.logIn(user, function(err) {
            console.log("reset save",user,err)
            done(err, user);
          });
        });
        console.log(user,"ddd")
      });
      // console.log()
    },

    (user, done)=>{
      console.log("smtpTrN",user.email)
      var smtpTransport = nodemailer.createTransport({
        
        service: 'SendGrid',
        auth: {
          user: 'sahithya',
          pass: 'sahithya123'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'SS@pacewisdom.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('success', 'Success! Your password has been changed.')
        res.send({text:"valid",status:true})
        // req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    console.log("err")
    // res.redirect('/');
    res.send({text:"invalid",status:false})
  });
});


module.exports = router;