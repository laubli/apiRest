const Object = require('../models/object');

exports.getObjectList = (req,res,next) => {
    console.log('methode getObjectList');
    const choseList = [
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
    ];
    res.status(200).json(choseList);

}

exports.getOneObjectById = (req,res,next) => {
    let objc = {
        _id: 'ABCDEF456',
        name: 'table',
        weight: '20',
        imgURL:''
    }
    res.status(200).json(obj);
}

exports.createObject = (req,res,next) => {
    res.status(200).json({message: 'OK'});
}

exports.updateObject = (req,res,next) => {
    res.status(200).json({message: 'OK'});
}

exports.deleteObject = (req,res,next) => {
    res.status(200).json({message: 'OK'});
}

// save dans la database
const obj = new Object({
    name: 'Chaise',
    weight: '8',
    imgURL:'',
    creationDate: new Date(),
    modificationDate: new Date(),
    active: true,
});

obj.save()
    .then((saved) => console.log('ok ', saved))
    .catch((err) => console.log('error ', err));