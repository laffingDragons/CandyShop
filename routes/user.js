const express = require('express');
const userController = require('./../controllers/userController');
const apiConfig = require('./../config/appConfig');
const auth = require('./../middlewares/auth')

let setRouter = (app) => {

    let baseUrl = apiConfig.apiVersion+'/users';

    app.get(baseUrl+'/all', userController.getAllUsers);

    app.get(baseUrl+'/view/:userId', userController.viewByUserId);

    app.post(baseUrl+'/create', userController.createUser);
} // end of setROuter function

module.exports = {

    setRouter: setRouter

}