const User = require('../models/userModel')

// @Route      get  /profile?:username
// @Desc       Users profile page
// @access     Private

const getProfilePage = async (req, res) => {
    try{
        const user = await User
        .findOne({username: req.params.username})
        .populate('posters') 
        .lean() 
        
        if(!user) throw new Error('Bunday Foydalanuvchi mavjud emas')

        res.render('user/profile', { 
            title: `${user.username}`,
            user,
            poster: user.posters,
            isAuth: req.session.isLogin,
            url: process.env.URL 
        })
    }catch(err){ 
        console.log(err)
    }
}

module.exports = {
    getProfilePage
}