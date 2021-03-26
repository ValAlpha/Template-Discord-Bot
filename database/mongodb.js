const mongoose = require("mongoose")
const chalk = require("chalk")

const connectDB = async () => {
  mongoose.connect(process.env.MONGODB, {
    keepAlive: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})
    .then(console.log(`${chalk.magenta(`[MONGODB]`)} - ${chalk.cyan(`Connected`)}`))
    .catch((err) => {
        console.log(`Mongodb | (Error)\n`, err.stack);
    })
}

module.exports = connectDB
