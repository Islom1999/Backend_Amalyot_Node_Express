const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const Poster = require('./models/posterModel')
const User = require('./models/userModel')

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
})

const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`), 'utf-8')
const posters = JSON.parse(fs.readFileSync(`${__dirname}/_data/posters.json`), 'utf-8')



const importData = async() => {
    try{
        await User.create(users)
        await Poster.create(posters)

        

        console.log('Data imported DB ...')
        process.exit()
    }catch(err){
        console.log(err)
    }
}

const deleteData = async () => {
    try{
        await User.deleteMany()
        await Poster.deleteMany()

        console.log('Data deleted ...')
    }catch(err){
        
        console.log(err)
    }
}



// run function: node seeder -i
if(process.argv[2] == '-i'){
    importData()
}// run function: node seeder -d
else if(process.argv[2] == '-d'){
    deleteData()
}
