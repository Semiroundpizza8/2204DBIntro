const requireUser = (req, res, next) => {
    if (req.puppy) {
        next();
    } else {
        res.status(401).send("ERROR: User is not authorized with our application")
    }
}

module.exports = {
    requireUser
}