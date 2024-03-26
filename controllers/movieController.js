const { response } = require('express');
const Movie = require('../models/movieModel')
const mongoose = require('mongoose')

const isValidObjectId = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return false;
    }
    return true;
};

async function handleCreateNewMovie(req, res) {

    // console.log(req)
    console.log("location", req.file)
    console.log("location", req.body)
    try {

        const { title, publishingYear } = req.body;

        const movieExist = await Movie.find({ title })

        if (movieExist.length !== 0) {
            return res.status(400).json({ message: "Movie already exists" })
        }
        const newMovie = await Movie.create({
            title,
            publishingYear,
            poster: req.file ? `http://localhost:3000/uploads/${req.file.filename}` : null

        })

        return res.status(200).json({ status: "true", message: "Movie created successfully", movie: newMovie })
    }
    catch (err) {
        console.log("err", err);
        response.json({ message: err })
    }
}

async function handleEditMovie(req, res) {
    const { title, publishingYear, movieId } = req.body
    console.log(req)
    if (isValidObjectId(movieId)) {
        const findMovie = await Movie.findById({ _id: movieId })
        if (!findMovie) {
            return res.status(400).json({ message: 'Movie not found' })
        }
        try {
            const editedMovie = await Movie.updateOne({
                _id: movieId
            }, {
                $set: {
                    title,
                    publishingYear,
                    poster: req.file ? `http://localhost:3000/uploads/${req.file.filename}` : req.body.poster

                }
            })
            return res.json({ status: "true", message: "Movie updated successfully", editedMovie: findMovie })
        }
        catch (err) {
            return res.status(400).json({ status: false, message: err.message })
        }
    }
    else {
        return res.status(400).json({ status: false, message: "Invalid Movie ID" })
    }



}

async function handleDeleteMovie(req, res) {
    const { movieId } = req.body;

    const findMovie = await Movie.findById({ _id: movieId })
    if (!findMovie) {
        return res.status(400).json({ message: 'Movie not found' })
    }
    const deletedMovie = await Movie.deleteOne({
        _id: movieId
    })
    return res.status(200).json({ status: "true", message: "Deleted successfully" })
}

async function handleGetAllMovies(req, res) {

    const { offset, limit } = req.body;
    const dataLength = await Movie.countDocuments(); //9
    let noOfPages = 0;
    if (dataLength <= limit) {
        noOfPages = 1;
    }
    else {
        noOfPages = Math.ceil(dataLength / limit)

    }


    const allMovies = await Movie.find().skip((offset - 1) * limit).limit(limit).sort({ _id: -1 })
    return res.status(200).json({ status: "true", message: "Record fetched", movies: allMovies, pages: noOfPages })
}

async function handleGetMovieById(req, res) {
    // console.log(req, params.id)
    const movie_by_id = await Movie.findOne({ _id: req.params.id });
    if (!movie_by_id) {
        return res.status(400).json({ message: 'Movie not found' })
    }
    return res.status(200).json({ status: "true", message: "Record fetched!", movie: movie_by_id })
}

module.exports = {
    handleCreateNewMovie,
    handleEditMovie,
    handleDeleteMovie,
    handleGetAllMovies,
    handleGetMovieById
}