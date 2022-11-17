const User = require('../models/user');

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
    const usr = new User({
        email: req.body.email,
        password: req.body.password,
        creationDate: new Date(),
        modificationDate: new Date(),
        active: true,
    })

    usr.save()
        .then((saved) => res.status(200).json(saved))
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'API REST ERROR: Pb avec la création' });
        })
}

exports.login = (req, res, next) => {
  res.status(200).json({message: 'OK'})
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
