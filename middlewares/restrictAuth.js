const { validateToken } = require('../services/auth')
async function restrictToLoggedinUserOnly(req, res, next) {
    // const userUid = req.cookies?.uid;
    // console.log(req)
    const userId = req.headers["authorization"];

    if (!userId) {
        return res.status(401).json({ status: "false", message: "Unauthorized" })
    }
    const token = userId.split("Bearer ")[1]
    // const user = getUser(userUid);

    const user = validateToken(token);

    if (!user) return res.status(401).json({ status: "false", message: "Unauthorized" })

    req.user = user;
    next();
}
module.exports = { restrictToLoggedinUserOnly }