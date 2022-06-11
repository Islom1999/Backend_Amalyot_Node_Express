// @Route      GET  / 
// @Desc       get home page
// @access     Public
const getHomePage = (req,res) => {
    res.render('home',{
        title: 'Home Page',
        user: req.session.user,
        isLogin: req.session.isLogin,
        url: process.env.URL
    })
}

module.exports = {
    getHomePage
}