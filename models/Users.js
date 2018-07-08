const mongoose = require('mongoose');
const moment = require('./../libs/timLib');

const Schema = mongoose.Schema;

let userSchema = new Schema({

    userId: { type: String, unique: true },
    firstName: { type: String, default: '', required: true },
    lastName: { type: String, default: '', required: true },
    email: { type: String, unique: true },
    password: { type: String, default: '' },
    address: { type: String, default: '' },
    phoneNumber: { type: Number, default: 0 },
    created: { type: Date, default: moment.now },
    lastModified: { type: Date, default: moment.now },

})

mongoose.model('Users', userSchema);