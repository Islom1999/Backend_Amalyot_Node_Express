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
const editPosterById = (id, editPoster) => {
    const data = () => fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8')
    let posters = JSON.parse(data())
    const index = posters.findIndex((poster) => poster.id === id)
    
    posters[index] = {
        id: posters[index].id,
        title: editPoster.title,
        amount: editPoster.amount,
        image: editPoster.image,
        region: editPoster.region,
        description: editPoster.description,
    }
    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(posters, undefined, 4))
}

const deletePosterById = async ( id ) => {
    const data = () => fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8')
    let posters = JSON.parse(data())
    posters = posters.filter((poster) => poster.id != id)

    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(posters, undefined, 4))
}

module.exports = {
    addNewPosterToDB,
    getAllPosters,
    getPosterById,
    editPosterById,
    deletePosterById
}