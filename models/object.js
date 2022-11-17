const mongoose = require('mongoose');

const objectSchema = mongoose.Schema({
    name: {type: String, require: true},
    weight: {type: Number, require: true},
    url: {type: String, require: false},
    creationDate: {type: Date, require: false},
    modificationDate: {type: Date, require: false},
    active: {type: Boolean, require: false},
})

module.exports = mongoose.model('Object', objectSchema);
