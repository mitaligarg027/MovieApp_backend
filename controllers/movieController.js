const { response } = require('express');
const Movie = require('../models/movieModel')
async function handleCreateNewMovie(req, res) {

    // console.log(req)
    try {
        const { title, publishingYear } = req.body;
        console.log(req.body.title)
        const movieExist = await Movie.find({ title })
        // console.log(movieExist.length)
        if (movieExist.length !== 0) {
            return res.status(400).json({ message: "Movie already exists" })
        }
        const newMovie = await Movie.create({
            title,
            publishingYear,
            profileImg: req.file.filename
            // creadedBy: req.user.id,
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
    const findMovie = await Movie.findById({ _id: movieId })
    if (!findMovie) {
        return res.status(400).json({ message: 'Movie not found' })
    }
    const editedMovie = await Movie.updateOne({
        _id: movieId
    }, {
        $set: {
            title,
            publishingYear

        }
    })
    return res.json({ status: "true", message: "Movie updated successfully", editedMovie: findMovie })
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