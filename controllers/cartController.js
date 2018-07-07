const express = require('express');
const mongoose = require('mongoose');
const shortid = require('short-id');
const response = require('./../libs/responseLib');
const moment = require('./../libs/timLib');
const check = require('./../libs/checkLib');
const logger = require('./../libs/loggerLib');
const CartModel = mongoose.model('Carts');

//function to get all the Carts
let getAllCarts = (req, res) => {

    CartModel.find() 
    .select('-__v -_id')
    .lean()
    .exec((err, result) =>{

        if(err){

            logger.error(`Error Ocurred: ${err}`, 'Database', 10);
            let apiResponse = response.generate(true, "Error Occured", 500, null);
            res.send(apiResponse);
            
        }else if(check.isEmpty(result)){

            logger.info('Cart not found', 'CartController: getAllCarts', 5);
            let apiResponse = response.generate(true, "Cart Not Found", 404, null);
            res.send(apiResponse);
            
        }else{

            logger.info('Cart found Successfully', 'CartController: getAllCarts', 5);
            let apiResponse = response.generate(false, "Cart found Successfully", 200, result);
            res.send(apiResponse);

        }

    })

}//get all Carts ends here



let createCart = (req, res) => {

    var today = moment.now();
    let cartId = shortid.generate();
   
    let newCart = new CartModel({

        cartId  : cartId,
        
    })

    let products = (req.body.products != undefined && req.body.products != null && req.body.products != '') ? req.body.products.split(',') : []
    newCart.products = products;

    newCart.save((err, result) => {

        if(err){

            logger.error(`Error Ocurred: ${err}`, 'Database', 10);
            let apiResponse = response.generate(true, "Error Occured", 500, null);
            res.send(apiResponse);

        }else{

            logger.info('Cart found Successfully', 'CartController: createCartId', 5);
            let apiResponse = response.generate(false, "Cart Created successfully!", 200, result);
            res.send(apiResponse);

        }

    }) // end of save Cart function

}//end of Cart create function

// Function  to edit Cart
let editCart = (req, res) => {

    let temp = (req.body.products != undefined && req.body.products != null && req.body.products != '') ? req.body.products.split(',') : []
    
    req.body.products = temp;

    let options = req.body;
    
    CartModel.update({'cartId': req.params.cartId}, options, {multi: true}).exec((err, result) => {

        if(err){

            logger.error(`Error Ocurred: ${err}`, 'Database', 10);
            let apiResponse = response.generate(true, "Error Occured", 500, null);
            res.send(apiResponse);

        }else if(check.isEmpty(result)){

            logger.info('Cart not found', 'CartController: editCart', 5);
            let apiResponse = response.generate(true, "Cart Not Found", 404, null);
            res.send(apiResponse);
            
        }else{

            logger.info('Cart Edited Successfully.', 'CartController: editCart', 5);
            let apiResponse = response.generate(false, "Cart Edited Successfully." , 200, result);
            res.send(apiResponse);

        }
    })
}//end of edit Cart

   /**
 * function to delete the assignment collection.
 */
let deleteCart = (req, res) => {
    CartModel.remove({ 'cartId': req.params.cartId }, (err, result) => {
        if (err) {

            logger.error(`Error Ocurred: ${err}`, 'Database', 10);
            let apiResponse = response.generate(true, "Error Occured", 500, null);
            res.send(apiResponse);

        } else if (check.isEmpty(result)) {

            logger.info('Cart not found', 'CartController: deleteCart', 5);
            let apiResponse = response.generate(true, "Cart Not Found", 404, null);
            res.send(apiResponse);

        } else {

            logger.info('Cart found Successfully', 'CartController: deleteCart', 5);
            let apiResponse = response.generate(false, "Cart Deleted successfully" , 200, result);
            res.send(apiResponse);

        }
    })
}//end of delete function


module.exports = {

    getAllCarts: getAllCarts,
    createCart: createCart,
    deleteCart:deleteCart,
    editCart: editCart

}