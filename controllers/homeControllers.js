const Poster = require('../models/posterModel')

// @Route      GET  / 
// @Desc       get home page
// @access     Public
const getHomePage = async (req,res) => {
    const poster = await Poster.find().lean()
    res.render('home',{
        title: 'Home Page',  
        poster: poster.reverse().slice(0,8),  
        user: req.session.user, 
        isLogin: req.session.isLogin,
        url: process.env.URL
    })
}

module.exports = {
    getHomePage
}