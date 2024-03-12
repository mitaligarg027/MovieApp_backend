const Movie = require('../models/movieModel')
async function handleCreateNewMovie(req, res) {
    console.log(req.body.title)
    const { title, publishingYear } = req.body;
    const movieExist = await Movie.findById({ title })
    if (movieExist) {
        return res.status(400).json({ message: "Movie already exists" })
    }
    const newMovie = await Movie.create({
        title,
        publishingYear,
        // creadedBy: req.user.id,
    })
    return res.status(200).json({ status: "success", newMovie })
}

async function handleEditMovie(req, res) {
    const { title, publishingYear } = req.body
    const findMovie = await Movie.findById({ _id: req.params.id })
    if (!findMovie) {
        return res.status(400).json({ message: 'Movie not found' })
    }
    const editedMovie = await Movie.updateOne({
        _id: req.params.id
    }, {
        $set: {
            title,
            publishingYear

        }
    })
    return res.json({ status: "Updated successfully", editedMovie })
}

async function handleDeleteMovie(req, res) {
    const findMovie = await Movie.findById({ _id: req.params.id })
    if (!findMovie) {
        return res.status(400).json({ message: 'Movie not found' })
    }
    const deletedMovie = await Movie.deleteOne({
        _id: req.params.id
    })
    return res.status(200).json({ status: "Deleted successfully" })
}

async function handleGetAllMovies(req, res) {
    const allMovies = await Movie.find({})
    return res.status(200).json({ status: "Success", allMovies })
}

async function handleGetMovieById(req, res) {
    // console.log(req, params.id)
    const movie_by_id = await Movie.findOne({ _id: req.params.id });
    if (!movie_by_id) {
        return res.status(400).json({ message: 'Movie not found' })
    }
    return res.status(200).json({ status: "success", movie_by_id })
}

module.exports = {
    handleCreateNewMovie,
    handleEditMovie,
    handleDeleteMovie,
    handleGetAllMovies,
    handleGetMovieById
}