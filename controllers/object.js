const Object = require('../models/object');

exports.getObjectList = (req,res,next) => {
    console.log('methode getObjectList');

    Object.find()
        .then((list) => res.status(200).json(list))
        .catch((err) => {
            console.log(err);
            res.status(404).json();
        });
    /*const choseList = [
        {
            _id: 'ABCDEF123',
            name: 'chaise',
            weight: '12',
            imgURL:''
        },
        {
            _id: 'ABCDEF456',
            name: 'table',
            weight: '20',
            imgURL:''
        }
    ];*/
    //res.status(200).json(choseList);

}

exports.getOneObjectById = (req,res,next) => {
    console.log('getoneobjectbyid');
    Object.findOne({_id: req.params.id})
        .then((obj) => res.status(200).json(obj))
        .catch((err) => {
                console.log(err);
            res.status(404).json({message: 'NOT FOUND'})
        });
    /*let objc = {
        _id: 'ABCDEF456',
        name: 'table',
        weight: '20',
        imgURL:''
    }*/
    //res.status(200).json(objc);
}

exports.createObject = (req,res,next) => {
    console.log('create');
    let obj = new Object({
        name: req.body.name,
        weight: req.body.weight,
        url: req.body.url,
        creationDate: new Date(),
        modificationDate: new Date(),
        active: true,
    })
    obj.save()
        .then((saved) => {
            res.status(200).json(saved)
        })
        .catch(() => {
            res.status(500).json({message: 'api rest error: problème avec la création'})
        })

    // res.status(200).json({message: 'OK'});
}

exports.updateObject = (req,res,next) => {
    console.log('update' + req.params, req.body);
    Object.findById(req.params.id)
        .then((obj) => {
            req.body.modificationDate = new Date();
            Object.updateOne( {_id: obj.id}, req.body)
                .then((result) => {res.status(200).json(result)})
                .catch(() => { res.status(500).json({message: 'CANNOT UPDATE'})})
        })
        .catch(() => res.status(500).json({message: 'NOT FOUND'}))

    // devrais marcher aussi
    /*Object.updateOne( {_id: obj.id}, req.body)
        .then((result) => {res.status(200).json(result)})
        .catch(() => { res.status(500).json({message: 'CANNOT UPDATE'})})
    */

    //res.status(200).json({message: 'OK'});
}

exports.deleteObject = (req,res,next) => {
    console.log('delete');
    Object.findByIdAndDelete(req.params.id)
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(500).json({message: 'CANNOT DELETE'});
            }

        })
        .catch((err) => { res.status(500).json({message: 'NOT FOUND', error: err})});

    //res.status(200).json({message: 'OK'});
}

