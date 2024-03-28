const JWT = require('jsonwebtoken')
const secret = "$uperM@n#*%&"

function createTokenForUser(user) {
    const token = JWT.sign({
        _id: user._id,
        email: user.email,
    }, secret)
    return token;
}

function validateToken(token) {

    if (!token) return null;
    try {
        const payload = JWT.verify(token, secret);
        console.log(payload)
        if (!payload) {
            return false

        }
        return true;

    }
    catch (err) {
        return false
    }
}

module.exports = {
    createTokenForUser,
    validateToken
}