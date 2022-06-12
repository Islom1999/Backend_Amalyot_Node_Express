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

/*
// err bor searchPartial and searchFull
// creating index
PosterSchema.index({
    title: "text",
    description: 'text',
})

PosterSchema.statics = {
    searchPartial: function(q,callback){
        return this.find({
            $or: [
                {'title': new RegExp(q, "gi")},
                {'description': new RegExp(q, "gi")}
            ]
        }, callback)
    },
    searchFull: function(q,callback){
        return this.find({
            $text: {$search: q, $caseSensitive: false}
        }, callback)
    }
}
*/

module.exports = model('Poster', PosterSchema)