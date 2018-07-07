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

            logger.info('Users found Successfully', 'UserController: getAllUsers', 5);
            let apiResponse = response.generate(false, "Users found Successfully", 200, result);
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
            let apiResponse = response.generate(false, "User Created Successfully", 200, result);
            res.send(apiResponse);

        }

    }) // end of save User function

}//end of User create function

// Function  to edit User
let editUser = (req, res) => {

    let options = req.body;
    
    UserModel.update({'userId': req.params.userId}, options, {multi: true}).exec((err, result) => {

        if(err){

            logger.error(`Error Ocurred: ${err}`, 'Database', 10);
            let apiResponse = response.generate(true, "Error Occured", 500, null);
            res.send(apiResponse);

        }else if(check.isEmpty(result)){

            logger.info('User not found', 'UserController: editUser', 5);
            let apiResponse = response.generate(true, "User Not Found", 404, null);
            res.send(apiResponse);
            
        }else{

            logger.info('User updated successfully', 'UserController: editUser', 5);
            let apiResponse = response.generate(false, "User updated successfully" , 200, result);
            res.send(apiResponse);

        }
    })
}//end of edit User

   /**
 * function to delete the assignment collection.
 */
let deleteUser = (req, res) => {
    UserModel.remove({ 'userId': req.params.userId }, (err, result) => {
        if (err) {

            logger.error(`Error Ocurred: ${err}`, 'Database', 10);
            let apiResponse = response.generate(true, "Error Occured", 500, null);
            res.send(apiResponse);

        } else if (check.isEmpty(result)) {

            logger.info('User not found', 'UserController: deleteUser', 5);
            let apiResponse = response.generate(true, "User Not Found", 404, null);
            res.send(apiResponse);

        } else {

            logger.info('User found Successfully', 'UserController: deleteUser', 5);
            let apiResponse = response.generate(false, "User Deleted successfully" , 200, result);
            res.send(apiResponse);

        }
    })
}//end of delete function


module.exports = {

    getAllUsers: getAllUsers,
    viewByUserId:viewByUserId,
    createUser: createUser,
    deleteUser:deleteUser,
    editUser: editUser

}