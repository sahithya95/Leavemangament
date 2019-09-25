var User = require('./model/user');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/leavemangement');

User({
    username:'admin@gmail.com',
    password:"admin@123",
    isAdmin:true

}).save((err,result)=>
{
     exit();
    
});

function exit()
{
mongoose.disconnect();
}

