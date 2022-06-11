const { Router } = require('express')
const { getPosterPage, 
    addNewPosterPage,
    addNewPoster,
    getOnePosterPage,
    getEditPosterPage,
    updatePoster,
    deletePoster } = require('../controllers/posterController')
    
const upload = require('../utils/fileUpload')

const router = Router()

router.get('/', getPosterPage)
router.get('/add', addNewPosterPage)
router.post('/add', upload.single('image'), addNewPoster)
router.get('/:id', getOnePosterPage)
router.get('/:id/edit', getEditPosterPage)
router.post('/:id/edit', upload.single('image'), updatePoster)
router.post('/:id/delete', deletePoster) 

module.exports = router  