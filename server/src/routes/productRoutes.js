import { Router } from 'express';
import { createProduct, createProductReview, deleteProduct, deleteReview, getAdminProducts, getAllProducts, getOneProduct, getProductReviews, updateProduct } from '../controllers/productController.js';
import { authorized, verifyUserAuth } from '../middleware/userAuth.js';

const router = Router();

router.route("/products").get(getAllProducts)
router.route("/products/:id").get(getOneProduct)
router.route("/reviews")
    .patch(verifyUserAuth, createProductReview)
    .get(getProductReviews)
    .delete(verifyUserAuth, deleteReview)

// ADMIN
router.route("/admin/products").get(verifyUserAuth, authorized('admin'), getAdminProducts)

router.route("/admin/products/create").post(verifyUserAuth, authorized('admin'), createProduct)

router.route("/admin/products/:id")
    .patch(verifyUserAuth, authorized('admin'), updateProduct)
    .delete(verifyUserAuth, authorized('admin'), deleteProduct)

export default router;