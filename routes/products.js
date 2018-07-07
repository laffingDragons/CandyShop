const express = require('express');
const productController = require('./../controllers/productController');
const apiConfig = require('./../config/appConfig');

let setRouter = (app) => {

    let baseUrl = apiConfig.apiVersion+'/products';

    app.get(baseUrl+'/all', productController.getAllProducts);
      /**
	 * @api {get} /api/v1/products/all Get all products
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	* @apiSuccessExample {json} Success-Response:
	*    
	*   {
	*		"error": false,
	*		"message": "Products found successfully ",
	*		"status": 200,
	*		"data": [
	*					{
	*						"name": "String",
	*						"shortDescription": "String",
	*						"longDescription": "String",
	*						"originalPrice": "Number",
	*						"discountedPrice": "Number",
	*						"ratings": "Number",
	*						"quantity": "Number",
	*						"reviews": object(type = array),
	*						"category": "String",
	*						"mainImage": "String",
	*						"images":object(type = array),
	*						"isFeatured": "Boolean",
	*						"productId": "String",
	*						"created": "Date",
	*						"lastModified": "Date"
	*					},
	*				]
	*   }
	*
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Product Details",
	    "status": 500,
	    "data": null
	   }
	 */
    
    app.get(baseUrl+'/view/:productId', productController.viewByProductId);
     /**
	 * @api {get} /api/v1/products/view/:productId Get Single Products
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	* @apiSuccessExample {json} Success-Response:
	*    
	*   {
	*		"error": false,
	*		"message": "Product found",
	*		"status": 200,
	*		"data": [
	*					{
	*						"name": "String",
	*						"shortDescription": "String",
	*						"longDescription": "String",
	*						"originalPrice": "Number",
	*						"discountedPrice": "Number",
	*						"ratings": "Number",
	*						"quantity": "Number",
	*						"reviews": object(type = array),
	*						"category": "String",
	*						"mainImage": "String",
	*						"images":object(type = array),
	*						"isFeatured": "Boolean",
	*						"productId": "String",
	*						"created": "Date",
	*						"lastModified": "Date"
	*					},
	*				]
	*   }
	*
	 * @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */


    app.post(baseUrl+'/create', productController.createProduct);

     /**
	 * @api {post} /api/v1/products/create Create product
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	 * @apiParam {String} name name of the product passed as a body parameter
	 * @apiParam {String} shortDescription shortDescription of the product passed as a body parameter
	 * @apiParam {String} longDescription longDescription of the product passed as a body parameter
	 * @apiParam {Number} originalPrice originalPrice of the product passed as a body parameter
	 * @apiParam {Number} discountedPrice discountedPrice of the product passed as a body parameter
	 * @apiParam {Number} ratings ratings of the product passed as a body parameter
	 * @apiParam {Number} quantity quantity of the product passed as a body parameter
	 * @apiParam {String} category category of the product passed as a body parameter
	 * @apiParam {String} mainImage mainImage of the product passed as a body parameter
	 * @apiParam {Boolean} isFeatured isFeatured of the product passed as a body parameter
	 *
	* @apiSuccessExample {json} Success-Response:
	*    
	*   {
	*		"error": false,
	*		"message": "Product  created successfully ",
	*		"status": 200,
	*		"data": [
	*					{
	*						"name": "String",
	*						"shortDescription": "String",
	*						"longDescription": "String",
	*						"originalPrice": "Number",
	*						"discountedPrice": "Number",
	*						"ratings": "Number",
	*						"quantity": "Number",
	*						"reviews": object(type = array),
	*						"category": "String",
	*						"mainImage": "String",
	*						"images":object(type = array),
	*						"isFeatured": "Boolean",
	*						"productId": "String",
	*						"created": "Date",
	*						"lastModified": "Date"
	*					},
	*				]
	*   }
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
    

	app.put(baseUrl+'/:productId/edit', productController.editProduct);
	
	
        /**
	 * @api {put} /api/v1/products/:productId/edit Edit product by productId
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * @apiParam {String} productId productId of the product passed as the URL parameter
	 *
	 * @apiSuccessExample {json} Success-Response:
	*    
	*   {
	*		"error": false,
	*		"message": "Product  updated successfully ",
	*		"status": 200,
	*		"data": [
	*					{
	*						"name": "String",
	*						"shortDescription": "String",
	*						"longDescription": "String",
	*						"originalPrice": "Number",
	*						"discountedPrice": "Number",
	*						"ratings": "Number",
	*						"quantity": "Number",
	*						"reviews": object(type = array),
	*						"category": "String",
	*						"mainImage": "String",
	*						"images":object(type = array),
	*						"isFeatured": "Boolean",
	*						"productId": "String",
	*						"created": "Date",
	*						"lastModified": "Date"
	*					}
	*				]
	*    }
	 * @apiErrorExample {json} Error-Response:
	 *
	 * {
	 *   "error": true,
	 *   "message": "Error Occured.,
	 *   "status": 500,
	 *   "data": null
	 * }
	 */
    

    app.post(baseUrl+'/:productId/delete', productController.deleteProduct);
     /**
	 * @api {post} /api/v1/products/:productId/delete Delete product by productId
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * @apiParam {String} productId productId of the product passed as the URL parameter
	 *
	* @apiSuccessExample {json} Success-Response:
	*    
	*   {
	*     "error": false,
	*     "message": "Product Deleted Successfully",
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