import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import errorHandler from "../utils/errorHandler.js";

export const createNewOrder = handleAsyncError(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(201).json({ success: true, order })
})

/* logged-in user orders */
export const getAllMyOrders = handleAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    if (!orders) return next(new errorHandler(404, `No orders found`));

    res.status(200).json({ success: true, orders })
})

/* ADMIN */
export const getSingleOrder = handleAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) return next(new errorHandler(404, `No order found`));

    res.status(200).json({ success: true, order });
})

export const getAllOrdersAdmin = handleAsyncError(async (req, res, next) => {
    const orders = await Order.find();

    if (!orders) return next(new errorHandler(404, `No orders found`));

    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({ success: true, orders })
})

export const updateOrderStatus = handleAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) return next(new errorHandler(404, 'No order found'));

    if (order.orderStatus === 'Delivered') return next(new errorHandler(404, 'This order is already been delivered'));

    await Promise.all(order.orderItems.map(item => updateQuantity(item.product, item.quantity)
    ));

    order.orderStatus = req.body.status;

    if (order.orderStatus === 'Delivered') order.deliveredAt = Date.now();

    await order.save({ validateBeforeSave: false });

    res.status(200).json({ success: true, order })
})

async function updateQuantity(id, quantity) {
    const product = await Product.findById(id);

    if (!product) return next(new errorHandler(404, 'Product not found'));

    product.stock -= quantity;

    await product.save({ validateBeforeSave: false })
}

export const deleteOrder = handleAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) return next(new errorHandler(404, 'No order found'));

    if (order.orderStatus !== 'Delivered') return next(new errorHandler(400, "Order is under processing and cann't be deleted!"));

    await Order.deleteOne({ _id: req.params.id });

    res.status(200).json({ success: true, message: 'Order deleted!' })
})

