const res = require('express/lib/response')
const {v4} = require('uuid')
const {addNewPosterToDB, 
    getAllPosters, 
    getPosterById,
    editPosterById,
    deletePosterById} = require("../db/posters")

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

// @Route      GET  /posters/:id/edit
// @Desc       Get Edit Poster Page 
// @access     Privide (own)

const getEditPosterPage = async (req,res) => {
    try{
        const poster = await getPosterById(req.params.id)
        res.render('poster/editPoster', {
            title: 'Edit Page',
            url: process.env.URL,
            poster
        })
    }catch(err){
        console.log(err)
    }
    
}

// @Route      POST  /posters/:id/edit
// @Desc       Get Edit Poster 
// @access     Privide (own)
const updatePoster = async (req,res) => {
    try{
        const editedPoster = {
            title: req.body.title,
            amount: req.body.amount,
            image: req.body.image,
            region: req.body.region,
            description: req.body.description
        }
        await editPosterById(req.params.id, editedPoster)
        res.redirect('/posters')
    }
    catch(err){
        console.log(err)
    }
}

// @Route      POST  /posters/:id/delete
// @Desc       delete poster by id
// @access     Privide (own)
const deletePoster = async (req, res) => {
    try{
        await deletePosterById(req.params.id)
        res.redirect('/posters')
    }
    catch(err){
        console.log(err)
    }
}

module.exports = { 
    getPosterPage,
    addNewPosterPage,
    addNewPoster,
    getOnePosterPage,
    getEditPosterPage,
    updatePoster,
    deletePoster
}