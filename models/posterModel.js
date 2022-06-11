const { Schema, model } = require('mongoose')

const PosterSchema = new Schema({
    title: {
        type: String,
        required: true,
        default: 'Some Title'
    },
    amount: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        min: 50
    },
    image: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
    visits: {
        type: Number, 
        default: 1
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User" 
    }
},{
    timestamps: true
})

module.exports = model('Poster', PosterSchema)