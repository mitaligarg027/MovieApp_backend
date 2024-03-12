const JWT = require('jsonwebtoken')
const secret = "$uperM@n#*%&"

function createTokenForUser(user) {
    const token = JWT.sign({
        _id: user._id,
        email: user.email,
    }, secret)
    return token;
}

// function validateToken(token) {
//     const payload = JWT.verify(token, secret);
//     return payload;
// }

module.exports = {
    createTokenForUser,
    // validateToken
}