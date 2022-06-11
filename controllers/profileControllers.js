const User = require('../models/userModel')

// @Route      get  /profile?:username
// @Desc       Users profile page
// @access     Private

const getProfilePage = async (req, res) => {
    try{
        const userProfile = await User
        .findOne({username: req.params.username})
        .populate('posters') 
        .lean() 
        
        if(!userProfile) throw new Error('Bunday Foydalanuvchi mavjud emas')

        const isMe = userProfile._id.toString() == req.session.user._id.toString()

        res.render('user/profile', { 
            title: `${userProfile.username}`,
            user: req.session.user,
            userProfile,
            poster: userProfile.posters,
            isAuth: req.session.isLogin,
            url: process.env.URL,
            isMe
        })
    }catch(err){ 
        console.log(err)
    }
}

module.exports = {
    getProfilePage
}