const mongoose = require("mongoose")

const connectDB = async () => {
  mongoose.connect(process.env.MONGODB, {
    keepAlive: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`[Mongodb] | (Connected)`))
    .catch((err) => {
        console.log(`Mongodb | (Error)\n`, err.stack);
    })
}

module.exports = connectDB