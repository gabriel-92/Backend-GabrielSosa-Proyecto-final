let admin = true

const auth = (req, res, next) => {
    if (admin) {
        return next();
    } else {
        const response = {
            error: -1,
        }
        res.status(401).json(response)
    }
}

// Export auth
module.exports = auth
