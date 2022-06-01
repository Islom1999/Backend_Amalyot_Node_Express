const fs = require('fs')
const path = require('path')

const addNewPosterToDB = async (poster) => {
    const data = () => fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8')
    const posters = JSON.parse(data())
    posters.push(poster)

    fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(posters,undefined,4), 'utf8', (err) => {
        if(err) throw err 
    })
    console.log('Data Add')
}

const getAllPosters = () => {
    const data = () => fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8')
    const posters = JSON.parse(data())
    return posters
}


const getPosterById = (id) => {
    const data = () => fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8')
    const posters = JSON.parse(data())
    const poster = posters.find((poster) => poster.id === id)
    return poster
}

module.exports = {
    addNewPosterToDB,
    getAllPosters,
    getPosterById
}