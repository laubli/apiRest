const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getUserList = (req, res, next) => {
    User.find()
        .then((list) => res.status(200).json(list))
        .catch((err) => {
            console.log(err);
            res.status(404).json({ message: 'NOT FOUND' });
        })
}

exports.getOneUserById = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then((usr) => res.status(200).json(usr))
        .catch((err) => {
            console.log(err);
            res.status(404).json({ message: 'NOT FOUND' });
        })
}

exports.createUser = (req, res, next) => {
    console.log("create user", req.body);

    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            let user = new User({
                email: req.body.email,
                password: hash,
                creationDate: new Date(),
                modificationDate: new Date(),
                active: true,
            });
            user.save()
                .then((saved) => res.status(200).json(saved))
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({ message: 'API REST ERROR: Pb avec la création' });
                })
        })
        .catch(() => {res.status(500).json({ message: 'ERROR HASH' })});
}

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then((user) => {
            if (!user) {
                res.status(401).json({message: 'USER RESULT NULL'})
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((valid) => {
                        if (!valid) {
                            res.status(500).json({ message: 'API REST ERROR: hash comparaison failed' });
                        } else {
                            const token = jwt.sign({userId: user._id},'RANDOM_TOKEN_SECRET',{expiresIn: '24h'});
                            console.log(token);
                            res.status(200).json({
                                token: token,
                                user: user
                            });
                        }
                    })
                    .catch((err) => { res.status(500).json({ message: 'API REST ERROR: hash comparaison failed' })})
            }
        })
        .catch()

    //res.status(200).json({message: 'OK'})
}

exports.updateUser = (req, res, next) => {
    User.findById(req.params.id)
        .then((usr) => {
            req.body.modificationDate = new Date();
            User.updateOne({ _id: usr.id }, req.body)
                .then((up) => res.status(200).json(up))
                .catch((err) =>
                    res.status(500).json({ message: 'CANNOT UPDATE', error: err }))
        })
        .catch(() => res.status(404).json({ message: 'NOT FOUND' }));
}

exports.deleteUser = (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then((result) => {
            if(result) {
                res.status(200).json(result)
            } else {
                res.status(500).json({ message: 'ALREADY DELETE'})
            }
        })
        .catch((err) => res.status(500).json({ message: 'CANNOT DELETE', error: err }))
}