const { Router } = require('express')
const router = Router()

const {
    getLoginPage, 
    getRegisterPage,
    registerNewUser,
    loginUser 
} = require('../controllers/authControllers')

router.get('/login', getLoginPage)
router.post('/login', loginUser)
router.get('/signup', getRegisterPage)
router.post('/signup', registerNewUser)



module.exports = router