const express = require('express');
const { handlecreateNewUser, handleUserLogin, handleGetUserById, handleLogout, handleGetAllUsers } = require('../controllers/userController');
const { restrictToLoggedinUserOnly } = require('../middlewares/restrictAuth');
// const { validateToken } = require('../services/auth');
// const { } = require()
const router = express.Router()

router.post('/signup', restrictToLoggedinUserOnly, handlecreateNewUser)
router.post('/login', handleUserLogin)
router.post('/getUserbyId', handleGetUserById)
router.delete('/deleteUser', restrictToLoggedinUserOnly, handleLogout)
router.get('/getAllUsers', handleGetAllUsers)
module.exports = router;