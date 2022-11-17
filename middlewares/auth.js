const jwt = require('jsonwebtoken');
const User = require('../models/user')

module.exports = (req,res,next) => {
    try {
        const token = req.headers.authorization;
        console.log('***',token);
        const decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const email = req.headers.email;

        console.log('*** decode token',decodeToken);
        console.log('*** decode token user',decodeToken.userId);
        User.findById(decodeToken.userId)
            .then((user) => {

                if (email == user.email) {
                    next();
                } else {
                    res.status(401).json({message: 'Erreur dans le middleware ici'})
                }
            })
            .catch(() => res.status(401).json({message: 'Erreur dans le middleware la'}))

    }catch {
        res.status(401).json({message: 'Erreur dans le middleware'})
    }
}