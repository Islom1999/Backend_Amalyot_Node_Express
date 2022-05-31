const { Router } = require('express')
const { getPosterPage, 
    addNewPosterPage,
    addNewPoster } = require('../controllers/posterController')

const router = Router()

router.get('/', getPosterPage)
router.get('/add', addNewPosterPage)
router.post('/add', addNewPoster)


module.exports = router