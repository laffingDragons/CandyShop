const express = require('express');
const mongoose = require('mongoose');
const shortid = require('short-id');
const response = require('./../libs/responseLib');
const moment = require('./../libs/timLib');
const check = require('./../libs/checkLib');
const logger = require('./../libs/loggerLib');
const UserModel = mongoose.model('Users');

//function to get all the Users
let getAllUsers = (req, res) => {

    UserModel.find() 
    .select('-__v -_id')
    .lean()
    .exec((err, result) =>{

        if(err){

            logger.error(`Error Ocurred: ${err}`, 'Database', 10);
            let apiResponse = response.generate(true, "Error Occured", 500, null);
            res.send(apiResponse);
            
        }else if(check.isEmpty(result)){

            logger.info('User not found', 'UserController: getAllUsers', 5);
            let apiResponse = response.generate(true, "User Not Found", 404, null);
            res.send(apiResponse);
            
        }else{

            logger.info('User found Successfully', 'UserController: getAllUsers', 5);
            let apiResponse = response.generate(false, "User found Successfully", 200, result);
            res.send(apiResponse);

        }

    })

}//get all Users ends here

// Function to get a single User by Id
let viewByUserId = (req, res) => {

    UserModel.findOne({ 'userId': req.params.userId }, (err, result) => {

        if(err){

                logger.error(`Error Ocurred: ${err}`, 'Database', 10);
                let apiResponse = response.generate(true, "Error Occured", 500, null);
                res.send(apiResponse);

        }else if(check.isEmpty(result)){

            logger.info('User not found', 'UserController: viewByUserId', 5);
            let apiResponse = response.generate(true, "User Not Found", 404, null);
            res.send(apiResponse);
            
        }else{

            logger.info('User found Successfully', 'UserController: viewByUserId', 5);
            let apiResponse = response.generate(false, "User found", 200, result);
            res.send(apiResponse);

        }

    })

}//end of get single User

let createUser = (req, res) => {

    var today = moment.now();
    let userId = shortid.generate();
   
    let newUser = new UserModel({

        userId : userId,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password,
        phoneNumber : req.body.phoneNumber,
        address : req.body.address,
        created : today,
        lastModified : today

    })


    newUser.save((err, result) => {

        if(err){

            logger.error(`Error Ocurred: ${err}`, 'Database', 10);
            let apiResponse = response.generate(true, "Error Occured", 500, null);
            res.send(apiResponse);

        }else{

            logger.info('User found Successfully', 'UserController: createUserId', 5);
            let apiResponse = response.generate(false, "User Created successfully!", 200, result);
            res.send(apiResponse);

        }

    }) // end of save User function

}//end of User create function

module.exports = {

    getAllUsers: getAllUsers,
    viewByUserId:viewByUserId,
    createUser: createUser,

}