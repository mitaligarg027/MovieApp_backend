const validator = require('validator');

function isValidEmail(email) {
    const validEmail = validator.isEmail(email);
    if (!validEmail) {
        return false;
    }
    return true;
}

function isValidPassword(password) {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    return regex.test(password)
}
module.exports = {
    isValidEmail,
    isValidPassword
}