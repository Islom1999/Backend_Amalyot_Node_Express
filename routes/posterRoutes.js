const { Router } = require('express')
const { getPosterPage, 
    addNewPosterPage,
    addNewPoster,
    getOnePosterPage,
    getEditPosterPage,
    updatePoster,
    deletePoster } = require('../controllers/posterController')
    
const upload = require('../utils/fileUpload')
const {protected, guest} = require('../middlewares/auth')

const router = Router()

router.get('/', getPosterPage)
router.get('/add', protected, addNewPosterPage)
router.post('/add', protected, upload.single('image'), addNewPoster)
router.get('/:id', getOnePosterPage) 
router.get('/:id/edit', protected, getEditPosterPage)
router.post('/:id/edit', protected, upload.single('image'), updatePoster)
router.post('/:id/delete', protected, deletePoster) 

module.exports = router  