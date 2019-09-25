var mongoose = require("mongoose");


var LeaveStatisticSchema = mongoose.Schema({
    UID:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    leave_type: [{type:String, ref: 'LeaveTable'}],
    remainingLeave: Number,
    is_active: [{type: mongoose.Schema.Types.ObjectId, ref: 'LeaveTable'}]
});



module.exports = mongoose.model("LeaveStatistic", LeaveStatisticSchema);