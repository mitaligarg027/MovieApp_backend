//create user signup
//login or signin
//getUserDetail
//logout
const bcrypt = require('bcrypt');
const User = require("../models/userModel");
const { response } = require('express');
const { createTokenForUser } = require('../services/auth');
const { isValidEmail, isValidPassword } = require('../services/validation')


async function handlecreateNewUser(req, res) {
    const { Name, email, password } = req.body;
    if (!isValidEmail(email)) {
        return res.status(400).json({ status: "false", message: "Please enter a valid email address" })
    }
    if (!isValidPassword(password)) {
        return res.status(400).json({ status: "false", message: "Password should be at least 8 characters long, contain at least one uppercase, one lowercase letter,one digit, and one special character." })
    }
    if (!email || !password) {
        return res.status(400).send({
            message: "Email or password missing."
        })
    }

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "user already exists" })
        }

        const salt = await bcrypt.genSalt(10); //generates salt
        const secPass = await bcrypt.hash(req.body.password, salt)//secure password
        const newUser = await User.create({
            Name,
            email,
            password: secPass
        })
        return res.status(200).json({ status: "user created successfully", newUser });
    }
    catch (err) {
        console.log("error", err)
        return res.status(500).json({ error: err });
    }
}
async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({
            message: "Email or password missing."
        })
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("user not found")
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        console.log("passwordcompare", passwordCompare)
        if (!passwordCompare) {
            return res.status(400).json({ status: "false", message: "Invalid credentials" })
        }
        const token = createTokenForUser(user);
        return res.status(200).json({ status: "true", message: "Login successfull", token: token });

    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal server error")
    }


}
async function handleGetUserById(req, res) {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error")
    }
}
async function handleLogout(req, res) {
    
}

module.exports = {
    handlecreateNewUser,
    handleUserLogin,
    handleGetUserById
}