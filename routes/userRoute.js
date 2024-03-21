const express = require('express');
const { handlecreateNewUser, handleUserLogin, handleGetUserById } = require('../controllers/userController');
// const { validateToken } = require('../services/auth');
// const { } = require()
const router = express.Router()

router.post('/signup', handlecreateNewUser)
router.post('/login', handleUserLogin)
router.post('/getUserbyId', handleGetUserById)
module.exports = router;