const bcrypt = require('bcryptjs')
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
        if(!req.session.user){
            res.redirect('/auth/login')
        }else{
            console.log(err)
        }
        
    }
}

// @Route      get  /profile?:username/change
// @Desc       Users profile change
// @access     Private

const updateProfilePage = async(req, res) => {
    try{
        const user = await User.findById(req.session.user._id)
        res.render('user/update', {
            title: `${req.session.user.username}`,
            user,
            isAuth: req.session.isLogin,
            url: process.env.URL,
            changeErr: req.flash('changeErr') 
        })

    }catch(err){
        console.log(err)
    }
}

// @Route      POST  /profile?:username/change
// @Desc       Users profile change
// @access     Private
  
const updatePassword = async(req, res) => {
    try{
        let user = await User.findById(req.session.user._id)
        const {username, phone, oldPassword, newPassword} = req.body

        if(oldPassword=='' && newPassword==''){
            await User.findByIdAndUpdate(user._id, {
                username: username ? username : user.username, 
                phone: phone ? phone : user.phone 
            })
            user = await User.findById(req.session.user._id)
            return res.redirect(`/profile/${user.username}`)
        }

        const matchPassword =  await bcrypt.compare(oldPassword, user.password)
            
        if(!matchPassword){
            req.flash('changeErr', 'Old password is wrong')
            return res.redirect('/profile/change')
        }
        console.log(matchPassword)

        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(newPassword, salt)

        console.log(newPassword)

        await User.findByIdAndUpdate(user._id, {
            username: username ? username : user.username,
            phone: phone ? phone : user.phone,
            password
        })
        user = await User.findById(req.session.user._id)
        return res.redirect(`/profile/${user.username}`)

    }catch(err){
        console.log(err)
    }
}

module.exports = {
    getProfilePage,
    updateProfilePage,
    updatePassword
} 