const mongoose = require("mongoose")

const warnings = new mongoose.Schema({

  dbID: {type: String, default: ""},
  warnings: {type: Array, default: []}
})

module.exports = mongoose.model('warnings', warnings)