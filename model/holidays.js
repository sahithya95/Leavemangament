var mongoose = require('mongoose');  


// Schema defines how the user data will be stored in MongoDB
var HolidaySchema = new mongoose.Schema({  
  date:Date,
  Occasion:String,
  
   

});
module.exports = mongoose.model("Holiday", HolidaySchema);