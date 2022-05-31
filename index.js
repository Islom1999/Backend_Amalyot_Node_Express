const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const {engine} = require('express-handlebars')

dotenv.config()

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', 'hbs')

app.get('/',(req, res) => {
    res.render('home')
})
app.get('/contact',(req, res) => {
    res.render('contact')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Server Running :', PORT)
})
