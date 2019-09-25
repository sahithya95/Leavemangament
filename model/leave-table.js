var mongoose = require("mongoose");


var LeaveTableSchema = new mongoose.Schema({
    leaveType: String,
    no_of_Day: Number,
    is_active: {type: Boolean, default: true}
});



module.exports = mongoose.model("LeaveTable", LeaveTableSchema);