const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

// @Route      GET  /auth/login 
// @Desc       get login page
// @access     Public

const getLoginPage = (req, res) => {
    res.render('auth/login', {
        title: 'Login',
        url: process.env.URL
    })
}

// @Route      GET  /auth/signup 
// @Desc       get signup page
// @access     Public

const getRegisterPage = (req, res) => {
    res.render('auth/signup', {
        title: 'Sign Up',
        url: process.env.URL
    })
}

// @Route      post  /auth/signup 
// @Desc       get signup page to database
// @access     Public

const registerNewUser = async (req, res) => {  
    try{
        const {email, username, phone, password, password2} = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const userExist = await User.findOne({email})

        if(userExist){
            return res.redirect('/auth/signup')
        }
        if(password !== password2){
            return res.redirect('/auth/signup')
        }
        await User.create({
            email,
            username,
            phone,
            password: hashedPassword
        })

        return res.redirect('/auth/login')

    }catch(err){
        console.log(err)
    }
}

// @Route      post  /auth/login 
// @Desc       login user to website
// @access     Public

const loginUser = async (req, res) => {
    try{
        const userExist = await User.findOne({email: req.body.email})
        if(userExist){
            const matchPassword = await bcrypt.compare(req.body.password, userExist.password)

            if(matchPassword){
                req.session.user = userExist
                req.session.isLogin = true
                req.session.save( err => {
                    if(err) throw err
                    res.redirect('/profile/' + req.session.user.username)
                })
            }else{
                res.redirect('/auth/login')
            }
        }else{
            res.redirect('/auth/login')
        }
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {
    getLoginPage, 
    getRegisterPage, 
    registerNewUser,
    loginUser
}