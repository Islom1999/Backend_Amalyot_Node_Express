const mongoose = require('mongoose') 

const connectDB = async () => {
    const connecting = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true
    })

    console.log(`MongoDB Connect tu port : ${connecting.connection.host}`)
}

module.exports = connectDB