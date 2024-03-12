const mongoose = require('mongoose')
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    publishingYear: {
        type: Number,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    }
},
    {
        timestamps: true
    })
const Movie = mongoose.model('movie', movieSchema);
module.exports = Movie;