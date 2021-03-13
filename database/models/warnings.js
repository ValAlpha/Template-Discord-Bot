const mongoose = require("mongoose")

const warnings = new mongoose.Schema({

  dbID: {type: String, default: ""},
  users: {type: Array, default: []},
  warningCount: {type: Number, default: 0}

})

module.exports = mongoose.model('warnings', warnings)