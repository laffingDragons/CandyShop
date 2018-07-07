const mongoose = require('mongoose');
const moment = require('./../libs/timLib');

const Schema = mongoose.Schema;

let cartSchema = new Schema({

    cartId: {type:String, uniq:true},
    products: [],

})

mongoose.model('Carts', cartSchema);