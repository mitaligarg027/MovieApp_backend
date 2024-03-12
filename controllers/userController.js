//create user signup
//login or signin
//logout

const User = require("../models/userModel");

async function handlecreateNewUser(req, res) {
    const { Name, email, password } = req.body;
    const newUser = await User.create({
        Name,
        email,
        password
    })
    return res.status(200).json({ status: "user created successfully" });
}
async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(200).json({ status: "success" });
    }

}

module.exports = {
    handlecreateNewUser
}