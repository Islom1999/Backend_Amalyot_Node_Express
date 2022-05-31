// @Route      GET  /posters 
// @Desc       get all posters
// @access     Public
const getPosterPage = (req,res) => {
    res.render('poster/posters', {
        title: 'Poster Page',
        url: process.env.URL
    })
}

const addNewPosterPage = (req,res) => {
    res.render('poster/addPoster', {
        title: 'Yangi elon qo\'shish',
        url: process.env.URL
    })
}

const addNewPoster = (req,res) => {
    console.log(req.body)
}


module.exports = {
    getPosterPage,
    addNewPosterPage,
    addNewPoster
}