const express = require('express')
const router = express.Router();
const multer = require('multer')

const { handleCreateNewMovie, handleEditMovie, handleDeleteMovie, handleGetAllMovies, handleGetMovieById } = require('../controllers/movieController')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './utils/uploads')
        // cb(null, '../my_movieApp/src/images/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        console.log("uniquesuffix", uniqueSuffix)
        cb(null, uniqueSuffix + file.originalname);
    }
})
// const upload = multer({
//     storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//         }
//     }
// });
const fileFilter = function (req, file, cb) {
    // Check if the file type is an image
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Accept the file
    } else {
        const errorMessage = 'Only image files are allowed.';
        const errorResponse = {
            status: false,
            message: errorMessage
        };
        cb(null, false);
        req.fileFilterError = errorResponse;
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})
router.post('/addMovie', upload.single('poster'), handleCreateNewMovie)
router.patch('/editMovie', upload.single('poster'), handleEditMovie)
router.delete('/deleteMovie', handleDeleteMovie)
router.post('/getMovies', handleGetAllMovies)
router.get('/:id', handleGetMovieById)
module.exports = router;
