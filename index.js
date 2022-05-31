const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const {engine} = require('express-handlebars')
const homeRoutes = require('./routes/homeRoutes')
const posterRoutes = require('./routes/posterRoutes')

// ENV variable start initilize
dotenv.config()

const app = express()

// Body Parser express initilize
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// set static folder public
app.use(express.static(path.join(__dirname, 'public')))

// initilize template engine (handlebars)
app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', 'hbs')

// initilize routes
app.use('/', homeRoutes)
app.use('/posters', posterRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Server Running :', PORT)
})
