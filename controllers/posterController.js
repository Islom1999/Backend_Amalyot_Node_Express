const Poster = require('../models/posterModel')
const User = require('../models/userModel')

// @Route      GET  /posters 
// @Desc       get all posters
// @access     Public
const getPosterPage = async (req,res) => {
    try{
        const posters = await Poster.find().lean()
        res.render('poster/posters', {
            title: 'Poster Page',
            url: process.env.URL,
            posters: posters.reverse()
            
        })
    }catch(err){
        console.log(err)
    }
}

// @Route      GET  /posters/:id  
// @Desc       get one poster by id
// @access     public
const getOnePosterPage = async (req,res) => {
    try{
        const poster = await  Poster.findByIdAndUpdate(req.params.id, { $inc: { visits: 1 } }, {new: true}).lean()
        res.render('poster/posterPage', {
            title: poster.title,
            url: process.env.URL, 
            user: req.session.user, 
            poster
        })
    }catch(err){
        console.log(err)
    }
}


// @Route      GET  /posters/add 
// @Desc       get add poster page
// @access     Privide
const addNewPosterPage = (req,res) => {
    res.render('poster/addPoster', {
        title: 'Yangi elon qo\'shish',
        url: process.env.URL,
        user: req.session.user,
        isLogin: req.session.isLogin,
    })
}

// @Route      POST  /posters/add
// @Desc       Add new Poster
// @access     Privide
const addNewPoster = async (req,res) => {
    try{
        const newPoster = new Poster({
            title: req.body.title,
            amount: req.body.amount,
            region: req.body.region,
            image: 'uploads/' + req.file.filename,
            description: req.body.description,
        })

        await User.findByIdAndUpdate(req.session.user._id, {
            $push: {posters: newPoster},
            new: true,
            upsert: true 
        })
        await newPoster.save((err, posterSaved) => {
            if(err) throw err
            const posterId = posterSaved._id
            res.redirect('/posters/' + posterId)  
        })
        
        
    }catch (err) { 
        console.log(err) 
    }
}

// @Route      GET  /posters/:id/edit
// @Desc       Get Edit Poster Page 
// @access     Privide (own)

const getEditPosterPage = async (req,res) => {
    try{
        const poster = await Poster.findById(req.params.id).lean()
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
            image: 'uploads/' + req.file.filename,
            region: req.body.region,
            description: req.body.description
        }
        await Poster.findByIdAndUpdate(req.params.id, editedPoster)
        res.redirect('/posters') 
    }
    catch(err){
        /*if(err == 'undefined'){
            console.log('salom')
        }*/
        const editedPoster = {
            title: req.body.title,
            amount: req.body.amount,
            image:  req.body.image,
            region: req.body.region,
            description: req.body.description
        }
        await Poster.findByIdAndUpdate(req.params.id, editedPoster)
        res.redirect('/posters')
    }
}

// @Route      POST  /posters/:id/delete
// @Desc       delete poster by id
// @access     Privide (own)
const deletePoster = async (req, res) => {
    try{
        await Poster.findByIdAndRemove(req.params.id)
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