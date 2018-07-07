const express = require('express');
const cartController = require('./../controllers/cartController');
const apiConfig = require('./../config/appConfig');

let setRouter = (app) => {

    let baseUrl = apiConfig.apiVersion+'/cart';

    app.get(baseUrl+'/all', cartController.getAllCarts);
       /**
	 * @api {get} /api/v1/cart/all Get all cart
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 *  @apiSuccessExample {json} Success-Response:
	   {
	    "error": false,
	    "message": "Cart found Successfully",
	    "status": 200,
	    "data": [
				{
					"products": object(type = array),
					"cartId":"String"
				}
	    	    ]
	   }
	
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Cart Details",
	    "status": 500,
	    "data": null
	   }
	 */

    app.post(baseUrl+'/create', cartController.createCart);

      /**
	 * @api {post} /api/v1/cart/create Create Cart
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
		"error": false,
		"message": "Cart Created successfully",
		"status": 200,
		"data": [
					{
						"products": object(type = array),
						"cartId":"String"
					}
			]
}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */

    app.put(baseUrl+'/:cartId/edit', cartController.editCart);

      /**
	 * @api {put} /api/v1/cart/:cartId/edit Edit cart by cartId
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * @apiParam {String} cartId cartId of the cart passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	{
	    "error": false,
	    "message": "Cart Edited Successfully.",
	    "status": 200,
	    "data": [
		   {
                       "carts": object(type = array),
                       "cartId":"String"
                    }
	    	  ]
	}

	  @apiErrorExample {json} Error-Response:
	 *
	   {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    app.post(baseUrl+'/:cartId/delete', cartController.deleteCart);
    /**
	 * @api {post} /api/v1/cart/:cartId/delete Delete cart by cartId
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * @apiParam {String} cartId cartId of the cart passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Cart Deleted Successfully",
	    "status": 200,
	    "data": []
		}
	
	  @apiErrorExample {json} Error-Response:
	 *
	 * 
	 {
	 	"error": true,
	    "message": "Error Occured.",
	    "status": 500,
		"data": null
	}
	 */
    
    } // end of setROuter function

module.exports = {

    setRouter: setRouter

}