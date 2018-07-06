const mongoose = require('mongoose');
const moment = require('./../libs/timLib');

const Schema = mongoose.Schema;

let cartSchema = new Schema({

    userId: { type: String, ref: 'Users' },
    productId: { type: String, ref: 'Products' },
    productCount: {type: Number, default: 1 },

})

mongoose.model('Carts', cartSchema);