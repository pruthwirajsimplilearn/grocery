import express from "express"
import UserController from "./userController.js";
import ProductController from "./productController.js";
import UserOperationsController from "./userOperationController.js";
import CartOperationsController from "./cartController.js";

const router = express.Router()

router.route('/').get((req,res) => res.send('Hello World'))

router.route('/user').post(UserController.addUser)
.put(UserController.updateUser)
.delete(UserController.deleteUser)
.get(UserController.displayUser)

router.route('/login').get(UserController.displayUserByCred)

router.route('/product').post(ProductController.addProduct)
.put(ProductController.updateProduct)
.delete(ProductController.deleteProduct)
.get(ProductController.showProducts)

router.route('/operations').put(UserOperationsController.addToWishList)
.delete(UserOperationsController.deleteFromWishList)
.get(UserOperationsController.showWishlist)


router.route('/cart').put(CartOperationsController.addToCart)
.delete(CartOperationsController.deleteFromCart)
.get(CartOperationsController.showCart)


export default router