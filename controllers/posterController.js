const Poster = require('../models/posterModel')
const User = require('../models/userModel')

// @Route      GET  /posters 
// @Desc       get all posters
// @access     Public
const getPosterPage = async (req,res) => {
    try{

        // if(req.query.search){
        //     const searchResoult = await Poster.find({title: req.query.search})
        //     console.log(searchResoult)
        // }

        const posters = await Poster.find().lean()
        res.render('poster/posters', {
            title: 'Poster Page',
            url: process.env.URL,
            posters: posters.reverse(),
            user: req.session.user
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
        const poster = await  Poster
            .findByIdAndUpdate(req.params.id, { $inc: { visits: 1 } }, {new: true})
            .populate("author")
            .lean()

        res.render('poster/posterPage', {
            title: poster.title,
            url: process.env.URL, 
            user: req.session.user, 
            author: poster.author, 
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
    if(req.session.isLogin){
        res.render('poster/addPoster', {
            title: 'Yangi elon qo\'shish',
            url: process.env.URL,
            user: req.session.user,
            isLogin: req.session.isLogin,
            user: req.session.user
        })
    }
}

// @Route      POST  /posters/add
// @Desc       Add new Poster
// @access     Privide
const addNewPoster = async (req,res) => {
    if(req.session.isLogin){
        try{
            const newPoster = new Poster({
                title: req.body.title,
                amount: req.body.amount,
                region: req.body.region,
                description: req.body.description,
                image: 'uploads/' + req.file.filename,
                author: req.session.user._id
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
}

// @Route      GET  /posters/:id/edit
// @Desc       Get Edit Poster Page 
// @access     Privide (own)

const getEditPosterPage = async (req,res) => {
    if(req.session.isLogin){
        try{
            const poster = await Poster.findById(req.params.id).lean()
            res.render('poster/editPoster', {
                title: 'Edit Page',
                url: process.env.URL,
                poster,
                user: req.session.user
            })
        }catch(err){
            console.log(err)
        }
    }
}

// @Route      POST  /posters/:id/edit
// @Desc       Get Edit Poster 
// @access     Privide (own)
const updatePoster = async (req,res) => {
    if(req.session.isLogin){
        try{
            const editedPoster = {
                title: req.body.title,
                amount: req.body.amount,
                image: 'uploads/' + req.file.filename,
                region: req.body.region,
                description: req.body.description
            }
            await Poster.findByIdAndUpdate(req.params.id, editedPoster)
            res.redirect('/auth/login') 
        }
        catch(err){
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
}

// @Route      POST  /posters/:id/delete
// @Desc       delete poster by id
// @access     Privide (own)
const deletePoster = async (req, res) => {
    if(req.session.isLogin){
        try{
            await Poster.findByIdAndRemove(req.params.id)
            res.redirect('/posters')
        }
        catch(err){
            console.log(err)
        }
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