const mongoose = require("mongoose")

const warnings = new mongoose.Schema({

  dbID: {type: String, default: ""},
  warnings: {type: Array, default: []}, 
  warnCount: {type: Number, default: 0}
})

module.exports = mongoose.model('warnings', warnings)