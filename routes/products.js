const express = require('express');
const productController = require('./../controllers/productController');
const apiConfig = require('./../config/appConfig');
const auth = require('./../middlewares/auth')

let setRouter = (app) => {

    let baseUrl = apiConfig.apiVersion+'/products';

    app.get(baseUrl+'/all', productController.getAllProducts);

    app.get(baseUrl+'/view/:productId', productController.viewByProductId);

    app.post(baseUrl+'/create', productController.createProduct);

    app.put(baseUrl+'/:productId/edit', productController.editProduct);

    app.post(baseUrl+'/:productId/delete', productController.deleteProduct);
    
    } // end of setROuter function

module.exports = {

    setRouter: setRouter

}