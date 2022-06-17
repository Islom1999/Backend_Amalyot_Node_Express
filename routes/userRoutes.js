const { Router } = require('express')
const router = Router()

const {
    getProfilePage,
    updateProfilePage,
    updatePassword 
} = require('../controllers/profileControllers')
 
router.get('/change', updateProfilePage)  
router.post('/change', updatePassword)  
router.get('/:username', getProfilePage)

module.exports = router