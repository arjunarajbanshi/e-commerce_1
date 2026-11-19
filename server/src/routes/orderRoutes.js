import { Router } from 'express';
import { createNewOrder, deleteOrder, getAllMyOrders, getAllOrdersAdmin, getSingleOrder, updateOrderStatus } from '../controllers/orderController.js';
import { authorized, verifyUserAuth } from '../middleware/userAuth.js';

const router = Router();

router.route("/new/order").post(verifyUserAuth, createNewOrder)

router.route('/orders/user').get(verifyUserAuth, getAllMyOrders)

// ADMIN
router.route('/admin/order/:id')
    .get(verifyUserAuth, authorized('admin'), getSingleOrder)
    .patch(verifyUserAuth, authorized('admin'), updateOrderStatus)
    .delete(verifyUserAuth, authorized('admin'), deleteOrder)

router.route('/admin/orders').get(verifyUserAuth, authorized('admin'), getAllOrdersAdmin)

export default router;