const express = require('express');
const userController = require('./../controllers/userController');
const apiConfig = require('./../config/appConfig');

let setRouter = (app) => {

    let baseUrl = apiConfig.apiVersion+'/users';

    app.get(baseUrl+'/all', userController.getAllUsers);

     /**
	 * @api {get} /api/v1/users/all Get all users
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	 *		"error": false,
	*		"message": "Users found Successfully",
	*		"status": 200,
	*		"data": [
	*					{
	*						"firstName": "String",
	*						"lastName": "String",
	*						"email": "String",
	*						"password": "String",
	*						"address": "String",
	*						"phoneNumber": "Number",
	*						"userId": "String",
	*						"created": "Date",
	*						"lastModified": "Date"
	*					}
	*				]
	*			}
	*
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find user Details",
	    "status": 500,
	    "data": null
	   }
	 */

    app.get(baseUrl+'/view/:userId', userController.viewByUserId);

     /**
	 * @api {get} /api/v1/users/view/:userId Get Single User
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	 *		"error": false,
	*		"message": "User found Successfully",
	*		"status": 200,
	*		"data": [
	*					{
	*						"firstName": "String",
	*						"lastName": "String",
	*						"email": "String",
	*						"password": "String",
	*						"address": "String",
	*						"phoneNumber": "Number",
	*						"userId": "String",
	*						"created": "Date",
	*						"lastModified": "Date"
	*					}
	*				]
	*			}
	*
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */


    app.post(baseUrl+'/create', userController.createUser);

     /**
	 * @api {post} /api/v1/users/create Create user
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	 * @apiParam {String} firstName firstName of the user passed as a body parameter
	 * @apiParam {String} lastName lastName of the user passed as a body parameter
	 * @apiParam {String} email email of the user passed as a body parameter
	 * @apiParam {String} password password of the user passed as a body parameter
	 * @apiParam {String} address address of the user passed as a body parameter
	 * @apiParam {Number} phoneNumber phoneNumber of the user passed as a body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	 *		"error": false,
	*		"message": "User Created Successfully",
	*		"status": 200,
	*		"data": [
	*					{
	*						"firstName": "String",
	*						"lastName": "String",
	*						"email": "String",
	*						"password": "String",
	*						"address": "String",
	*						"phoneNumber": "Number",
	*						"userId": "String",
	*						"created": "Date",
	*						"lastModified": "Date"
	*					}
	*				]
	*			}
	*
	* @apiErrorExample {json} Error-Response:
	 *
	 * {
	 *   "error": true,
	 *   "message": "Error Occured.,
	 *   "status": 500,
	 *   "data": null
	 * }
	 */
    


    app.put(baseUrl+'/:userId/edit', userController.editUser);

      /**
	 * @api {put} /api/v1/users/:userId/edit Edit user by userId
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * @apiParam {String} userId userId of the user passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	 *		"error": false,
	*		"message": "User updated successfully",
	*		"status": 200,
	*		"data": [
	*					{
	*						"firstName": "String",
	*						"lastName": "String",
	*						"email": "String",
	*						"password": "String",
	*						"address": "String",
	*						"phoneNumber": "Number",
	*						"userId": "String",
	*						"created": "Date",
	*						"lastModified": "Date"
	*					}
	*				]
	*			}
	*
	 * @apiErrorExample {json} Error-Response:
	 *
	 * {
	 *   "error": true,
	 *   "message": "Error Occured.,
	 *   "status": 500,
	 *   "data": null
	 * }
	 */
    
    app.post(baseUrl+'/:userId/delete', userController.deleteUser);

     /**
	 * @api {post} /api/v1/users/:userId/delete Delete user by userId
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * @apiParam {String} userId userId of the user passed as the URL parameter
	 *
	* @apiSuccessExample {json} Success-Response:
	*    
	*   {
	*     "error": false,
	*     "message": "User Deleted Successfully",
	*     "status": 200,
	*     "data": []
    * 	}
	*
	
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	 *   "error": true,
	 *   "message": "Error Occured.,
	 *   "status": 500,
	 *   "data": null
	 * }
	 */

} // end of setROuter function

module.exports = {

    setRouter: setRouter

}