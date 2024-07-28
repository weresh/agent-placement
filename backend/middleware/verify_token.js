const jwt = require('jsonwebtoken');
const User = require('../models/user');

const verifyToken = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader && authorizationHeader.split(' ')[0] === 'JWT') {
        const token = authorizationHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.API_SECRET);
            const user = await User.findOne({ _id: decoded.id }).exec();

            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }

            req.user = user;
            next();
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }
    } else {
        req.user = undefined;
        next();
    }
};

module.exports = verifyToken;
