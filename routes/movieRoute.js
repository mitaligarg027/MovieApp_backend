const express = require('express')
const router = express.Router();
const { handleCreateNewMovie, handleEditMovie, handleDeleteMovie, handleGetAllMovies, handleGetMovieById } = require('../controllers/movieController')


router.post('/addMovie', handleCreateNewMovie)
router.patch('/:id', handleEditMovie)
router.delete('/:id', handleDeleteMovie)
router.get('/getMovies', handleGetAllMovies)
router.get('/:id', handleGetMovieById)
module.exports = router;
