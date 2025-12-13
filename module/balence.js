const mongoose = require('mongoose');

const Time = new Date().toLocaleString("en-US", {
  timeZone: "Asia/Kolkata",
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true // or false for 24-hour format
});


const BalanceSchema = new mongoose.Schema({
    Time: String,
    user: String,
    balance: String,
    last_tr_id : {type : String, unique : true, default : Time}
}, { timestamps: true });

module.exports = mongoose.model('Balance', BalanceSchema);