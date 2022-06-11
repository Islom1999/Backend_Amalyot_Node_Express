const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const {engine} = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)

const connectDB = require('./config/db')


// ENV variable start initilize
dotenv.config()

// connect Mongose 
connectDB()


const app = express()

// initilize to daabase
const store = new MongoStore({
    collection: 'sessions',
    uri: process.env.MONGO_URI
})

// Body Parser express initilize
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// sessoin configuration
app.use(session({
    secret: process.env.SECTION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}))

//req.session.user = "Islom"

// set static folder public
app.use(express.static(path.join(__dirname, 'public')))

// initilize template engine (handlebars)
app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', 'hbs')

// initilize routes
app.use('/', require('./routes/homeRoutes'))
app.use('/posters', require('./routes/posterRoutes'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/profile', require('./routes/userRoutes'))



const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Server Running :', PORT)
})
