const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

// @Route      GET  /auth/login 
// @Desc       get login page
// @access     Public

const getLoginPage = (req, res) => {
    if(!req.session.isLogin){
        res.render('auth/login', {
            title: 'Login',
            loginErr: req.flash('loginErr'),
            url: process.env.URL
        })
    }
}

// @Route      GET  /auth/signup 
// @Desc       get signup page
// @access     Public

const getRegisterPage = (req, res) => {
    if(!req.session.isLogin){
        res.render('auth/signup', {
            title: 'Sign Up',
            regErr: req.flash('regErr'),
            url: process.env.URL
        })
    }
}

// @Route      post  /auth/signup 
// @Desc       get signup page to database
// @access     Public

const registerNewUser = async (req, res) => {  
    if(!req.session.isLogin){
        try{
            const {email, username, phone, password, password2} = req.body
            const userExist = await User.findOne({email})

            if(userExist){
                req.flash('regErr', "Bunday foydalanuvchi bazada bor")
                return res.redirect('/auth/signup')
            }
            if(password !== password2){
                req.flash('regErr', "Parollar mos tushmayapti")
                return res.redirect('/auth/signup')
            }
            await User.create({
                email,
                username,
                phone,
                password
            })

            return res.redirect('/auth/login')

        }catch(err){
            console.log(err)
        }
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
                req.flash("loginErr", "Noto'g'ri malumot kiritildi")
                res.redirect('/auth/login')
            }
        }else{
            req.flash("loginErr", "Bunday foydalanuvchi mavjud emas")
            res.redirect('/auth/login')
        }
    }
    catch(err){
        console.log(err)
    }
}

// @Route      post  /auth/logout 
// @Desc       logout user
// @access     private

const logout = (req,res) => {
    req.session.destroy(() => {
        res.redirect("/")
    })
}


module.exports = {
    getLoginPage, 
    getRegisterPage, 
    registerNewUser,
    loginUser,
    logout
}