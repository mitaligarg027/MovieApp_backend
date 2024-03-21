const express = require('express')
const router = express.Router();
const multer = require('multer')

const { handleCreateNewMovie, handleEditMovie, handleDeleteMovie, handleGetAllMovies, handleGetMovieById } = require('../controllers/movieController')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, '../utils/uploads/')
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
})
var upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.post('/addMovie', upload.single('poster'), handleCreateNewMovie)
router.patch('/editMovie', handleEditMovie)
router.delete('/deleteMovie', handleDeleteMovie)
router.post('/getMovies', handleGetAllMovies)
router.get('/:id', handleGetMovieById)
module.exports = router;
