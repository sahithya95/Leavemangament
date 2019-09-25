var mongoose = require("mongoose");


var LeaveRequestSchema = mongoose.Schema({
    name:{type: mongoose.Schema.Types.String, ref: 'User'},
    UID:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    leave_type: {type: String, ref: 'LeaveTable'},
    Start_Date:{ type: Date, default: Date.now },
    End_Date: { type: Date, default: Date.now },
    Applied_Date: { type: Date, default: Date.now },
    status: {
        type:String,
        enum:['approved','pending','rejected'],
        default:'pending'
    },
    No_of_days:Number
   
});

module.exports = mongoose.model("LeaveRequest", LeaveRequestSchema);