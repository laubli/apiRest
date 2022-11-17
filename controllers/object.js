const Object = require('../models/object');

exports.getObjectList = (req, res, next) => {
    console.log('methode getObjectList');

    Object.find()
        .then((list) => res.status(200).json(list))
        .catch((err) => {
            console.log(err);
            res.status(404).json({ message: 'NOT FOUND' });
        })
}

exports.getOneObjectById = (req, res, next) => {
    Object.findOne({ _id: req.params.id })
        .then((obj) => res.status(200).json(obj))
        .catch((err) => {
            console.log(err);
            res.status(404).json({ message: 'NOT FOUND' });
        })
}

exports.createObject = (req, res, next) => {
    const obj = new Object({
        name: req.body.name,
        weight: req.body.weight,
        url: req.body.url,
        creationDate: new Date(),
        modificationDate: new Date(),
        active: true,
    })

    obj.save()
        .then((saved) => res.status(200).json(saved))
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'API REST ERROR: Pb avec la création' });
        })
}

exports.updateObject = (req, res, next) => {
    Object.findById(req.params.id)
        .then((obj) => {
            req.body.modificationDate = new Date();
            Object.updateOne({ _id: obj.id }, req.body)
                .then((up) => res.status(200).json(up))
                .catch((err) =>
                    res.status(500).json({ message: 'CANNOT UPDATE', error: err }))
        })
        .catch(() => res.status(404).json({ message: 'NOT FOUND' }));
}

exports.deleteObject = (req, res, next) => {
    Object.findByIdAndDelete(req.params.id)
        .then((result) => {
            if(result) {
                res.status(200).json(result)
            } else {
                res.status(500).json({ message: 'ALREADY DELETE'})
            }
        })
        .catch((err) => res.status(500).json({ message: 'CANNOT DELETE', error: err }))
}
