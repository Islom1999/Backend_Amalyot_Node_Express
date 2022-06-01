const { Router } = require('express')
const { getPosterPage, 
    addNewPosterPage,
    addNewPoster,
    getOnePosterPage } = require('../controllers/posterController')

const router = Router()

router.get('/', getPosterPage)
router.get('/add', addNewPosterPage)
router.post('/add', addNewPoster)
router.get('/:id', getOnePosterPage)



module.exports = router