const mongoose = require('mongoose');
const moment = require('./../libs/timLib');

const Schema = mongoose.Schema;

let productSchema = new Schema({

    productId: { type: String, unique: true },
    name: { type: String, default: '', required: true },
    shortDescription: { type: String, default: '' },
    longDescription: { type: String, default: '' },
    originalPrice: { type: Number, default: 0 },
    discountedPrice: { type: Number, default: 0 },
    ratings: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
    reviews: [{type: String, ref: 'Users'}],
    category: { type: String, default: '' },
    mainImage: { type: String, default: '' },
    images: [],
    isFeatured: { type: Boolean, default: false },
    created: { type: Date, default: moment.now },
    lastModified: { type: Date, default: moment.now },

})

mongoose.model('Products', productSchema);