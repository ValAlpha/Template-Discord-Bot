const mongoose = require("mongoose")

const economyProfile = new mongoose.Schema({

  userID: {type: String, default: ""}, 
  balance: {type: Number, default: 0}, 
  daily: {type: String, default: ""}

})

module.exports = mongoose.model('economy profile', economyProfile)