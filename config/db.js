const mongoose = require('mongoose')

const connectDB = async () => {
    const connecting = await mongoose.connect('mongodb://localhost:27017/test', {
        useNewUrlParser: true
    })

    console.log(`MongoDB Connect tu port : ${connecting.connection.host}`)
}


module.exports = connectDB