const {v4} = require('uuid')
const {addNewPosterToDB, 
    getAllPosters, 
    getPosterById} = require("../db/posters")

// @Route      GET  /posters 
// @Desc       get all posters
// @access     Public
const getPosterPage = async (req,res) => {
    const posters = await getAllPosters()
    res.render('poster/posters', {
        title: 'Poster Page',
        url: process.env.URL,
        posters
    })
}

// @Route      GET  /posters/:id
// @Desc       get one poster by id
// @access     public
const getOnePosterPage = async (req,res) => {
    const poster = await getPosterById(req.params.id)

    res.render('poster/posterPage', {
        title: poster.title,
        url: process.env.URL,
        poster
    })
}


// @Route      GET  /posters/add 
// @Desc       get add poster page
// @access     Privide
const addNewPosterPage = (req,res) => {
    res.render('poster/addPoster', {
        title: 'Yangi elon qo\'shish',
        url: process.env.URL
    })
}

// @Route      POST  /posters/add
// @Desc       Add new Poster
// @access     Privide
const addNewPoster = async (req,res) => {
    const poster = {
        id: v4(),
        title: req.body.title,
        amount: req.body.amount,
        region: req.body.region,
        image: req.body.image,
        description: req.body.description
    }
    await addNewPosterToDB(poster)
    res.redirect('/posters')
}


module.exports = { 
    getPosterPage,
    addNewPosterPage,
    addNewPoster,
    getOnePosterPage
}