const express = require('express');
const mongoose = require('mongoose');
const shortid = require('short-id');
const response = require('./../libs/responseLib');
const moment = require('./../libs/timLib');
const check = require('./../libs/checkLib');
const logger = require('./../libs/loggerLib');
const ProductModel = mongoose.model('Products');

//function to get all the products
let getAllProducts = (req, res) => {

    ProductModel.find() 
    .select('-__v -_id')
    .lean()
    .exec((err, result) =>{

        if(err){

            logger.error(`Error Ocurred: ${err}`, 'Database', 10);
            let apiResponse = response.generate(true, "Error Occured", 500, null);
            res.send(apiResponse);
            
        }else if(check.isEmpty(result)){

            logger.info('Products not found', 'ProductController: getAllProducts', 5);
            let apiResponse = response.generate(true, "Product Not Found", 404, null);
            res.send(apiResponse);
            
        }else{

            logger.info('Products found Successfully', 'ProductController: getAllProducts', 5);
            let apiResponse = response.generate(false, "Products found Successfully", 200, result);
            res.send(apiResponse);

        }

    })

}//get all products ends here

// Function to get a single product by Id
let viewByProductId = (req, res) => {

    ProductModel.findOne({ 'productId': req.params.productId }, (err, result) => {

        if(err){

                logger.error(`Error Ocurred: ${err}`, 'Database', 10);
                let apiResponse = response.generate(true, "Error Occured", 500, null);
                res.send(apiResponse);

        }else if(check.isEmpty(result)){

            logger.info('Product not found', 'ProductController: viewByProductId', 5);
            let apiResponse = response.generate(true, "Product Not Found", 404, null);
            res.send(apiResponse);
            
        }else{

            logger.info('Product found Successfully', 'ProductController: viewByProductId', 5);
            let apiResponse = response.generate(false, "Product found", 200, result);
            res.send(apiResponse);

        }

    })

}//end of get single product


let createProduct = (req, res) => {

    var today = moment.now();
    let productId = shortid.generate();
   
    let newProduct = new ProductModel({

        productId : productId,
        name : req.body.name,
        shortDescription : req.body.shortDescription,
        longDescription : req.body.longDescription,
        originalPrice : req.body.originalPrice,
        discountedPrice : req.body.discountedPrice,
        ratings : req.body.ratings,
        quantity : req.body.quantity,
        category : req.body.category,
        mainImage: req.body.mainImage, //should be uploaded in base64 format
        isFeatured : true,
        created : today,
        lastModified : today

    })

    let images = (req.body.images != undefined && req.body.images != null && req.body.images != '') ? req.body.images.split(',') : []
        newProduct.images = images;

    newProduct.save((err, result) => {

        if(err){

            logger.error(`Error Ocurred: ${err}`, 'Database', 10);
            let apiResponse = response.generate(true, "Error Occured", 500, null);
            res.send(apiResponse);

        }else{

            logger.info('Product Created Successfully', 'ProductController: createProductId', 5);
            let apiResponse = response.generate(false, "Product Created successfully!", 200, result);
            res.send(apiResponse);

        }

    }) // end of save Product function

}//end of Product create function

// Function  to edit Product
let editProduct = (req, res) => {

    let images = (req.body.images != undefined && req.body.images != null && req.body.images != '') ? req.body.images.split(',') : []

    req.body.images = images;

    let options = req.body;
    
    ProductModel.update({'productId': req.params.productId}, options, {multi: true}).exec((err, result) => {

        if(err){

            logger.error(`Error Ocurred: ${err}`, 'Database', 10);
            let apiResponse = response.generate(true, "Error Occured", 500, null);
            res.send(apiResponse);

        }else if(check.isEmpty(result)){

            logger.info('Product not found', 'ProductController: editProduct', 5);
            let apiResponse = response.generate(true, "Product Not Found", 404, null);
            res.send(apiResponse);
            
        }else{

            logger.info('Product found Successfully', 'ProductController: editProduct', 5);
            let apiResponse = response.generate(false, "Product updated successfully" , 200, result);
            res.send(apiResponse);

        }
    })
}//end of edit Product

   /**
 * function to delete the assignment collection.
 */
let deleteProduct = (req, res) => {
    ProductModel.remove({ 'productId': req.params.productId }, (err, result) => {
        if (err) {

            logger.error(`Error Ocurred: ${err}`, 'Database', 10);
            let apiResponse = response.generate(true, "Error Occured", 500, null);
            res.send(apiResponse);

        } else if (check.isEmpty(result)) {

            logger.info('Product not found', 'ProductController: deleteProduct', 5);
            let apiResponse = response.generate(true, "Product Not Found", 404, null);
            res.send(apiResponse);

        } else {

            logger.info('Product found Successfully', 'ProductController: deleteProduct', 5);
            let apiResponse = response.generate(false, "Product Deleted successfully" , 200, result);
            res.send(apiResponse);

        }
    })
}//end of delete function

module.exports = {

    getAllProducts: getAllProducts,
    viewByProductId: viewByProductId,
    createProduct: createProduct,
    editProduct: editProduct,
    deleteProduct: deleteProduct

}