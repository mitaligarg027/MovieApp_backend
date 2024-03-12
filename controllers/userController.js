//create user signup
//login or signin
//getUserDetail
//logout
const bcrypt = require('bcrypt');
const User = require("../models/userModel");
const { response } = require('express');
const { createTokenForUser } = require('../services/auth');


async function handlecreateNewUser(req, res) {
    const { Name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "user already exists" })
        }

        const salt = await bcrypt.genSalt(10); //generates salt
        const secPass = await bcrypt.hash(req.body.password, salt)
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
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("user not found")
            return res.status(400).json({ error: "Invalid credentials" })
        }
        const passwordCompare = bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            console.log("password")
            return res.status(400).json({ error: "Invalid credentials" })
        }
        const token = createTokenForUser(user);
        console.log("token")
        return res.status(200).json(token);

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

module.exports = {
    handlecreateNewUser,
    handleUserLogin,
    handleGetUserById
}