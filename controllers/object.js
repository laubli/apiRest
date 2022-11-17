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
    let obj = {
        _id: 'ABCDEF456',
        name: 'table',
        weight: '20',
        imgURL:''
    }
    res.status(200).json(obj);
}