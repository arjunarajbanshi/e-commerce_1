import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
    FiArrowLeft,
    FiUser,
    FiPhone,
    FiMapPin,
    FiEdit2,
    FiPackage,
    FiCreditCard,
    FiShield,
    FiShoppingBag,
    FiArrowRight,
    FiCheckCircle,
} from "react-icons/fi";

import PageTitle from "../components/PageTitle";
import CheckoutPath from "./CheckoutPath";

const OrderConfirm = () => {
    const { shippingInfo, cartItems = [] } = useSelector((state) => state.cart);

    const { user } = useSelector((state) => state.user || {});
    const navigate = useNavigate();

    // Currency formatter
    const formatPrice = (amount) =>
        `₹${Number(amount || 0).toLocaleString("en-IN")}`;

    // Order calculations
    const subtotal = cartItems.reduce(
        (acc, item) =>
            acc + Number(item.price || 0) * Number(item.quantity || 0),
        0,
    );

    const tax = Math.round(subtotal * 0.18);
    const shipping = subtotal > 0 ? 50 : 0;
    const total = subtotal + tax + shipping;

    const proceedToPayment = () => {
        if (!cartItems.length) return;

        const data = {
            subtotal,
            tax,
            shipping,
            total,
        };

        sessionStorage.setItem("orderItem", JSON.stringify(data));
        navigate("/process/payment");
    };

    const address = [
        shippingInfo?.address,
        shippingInfo?.city,
        shippingInfo?.state,
        shippingInfo?.country,
        shippingInfo?.pinCode,
    ]
        .filter(Boolean)
        .join(", ");

    return (
        <div className="min-h-screen bg-slate-50 pb-16">
            <PageTitle title="Order Confirmation" />

            {/* Checkout Progress */}
            <div className="max-w-6xl mx-auto pt-4">
                <CheckoutPath activePath={1} />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
                {/* Page Heading */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Link
                            to="/shipping"
                            className="hover:text-indigo-600 transition-colors"
                        >
                            Shipping
                        </Link>
                        <span>/</span>
                        <span className="text-indigo-600 font-medium">
                            Order Confirmation
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Review your order
                    </h1>

                    <p className="text-gray-500 mt-2 text-sm sm:text-base">
                        Please check your shipping details and items before
                        proceeding to payment.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* LEFT: Order Information */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Shipping Information */}
                        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="px-5 sm:px-6 py-5 border-b border-gray-100 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                        <FiMapPin size={20} />
                                    </div>

                                    <div>
                                        <h2 className="font-bold text-gray-900">
                                            Shipping Information
                                        </h2>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            Your delivery details
                                        </p>
                                    </div>
                                </div>

                                <Link
                                    to="/shipping"
                                    className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                                >
                                    <FiEdit2 size={14} />
                                    Edit
                                </Link>
                            </div>

                            <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Customer */}
                                <div className="flex gap-3">
                                    <div className="w-9 h-9 shrink-0 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                                        <FiUser size={17} />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                            Recipient
                                        </p>
                                        <p className="text-sm font-semibold text-gray-900 mt-1">
                                            {user?.name || "Guest User"}
                                        </p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex gap-3">
                                    <div className="w-9 h-9 shrink-0 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                                        <FiPhone size={17} />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                            Phone Number
                                        </p>
                                        <p className="text-sm font-semibold text-gray-900 mt-1">
                                            {shippingInfo?.phoneNumber ||
                                                "Not provided"}
                                        </p>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="sm:col-span-2 flex gap-3">
                                    <div className="w-9 h-9 shrink-0 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                                        <FiMapPin size={17} />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                            Delivery Address
                                        </p>
                                        <p className="text-sm text-gray-700 leading-relaxed mt-1">
                                            {address || "Address not provided"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Order Items */}
                        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="px-5 sm:px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                        <FiShoppingBag size={20} />
                                    </div>

                                    <div>
                                        <h2 className="font-bold text-gray-900">
                                            Order Items
                                        </h2>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            {cartItems.length} product(s) in
                                            your order
                                        </p>
                                    </div>
                                </div>

                                <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                                    {cartItems.length} Items
                                </span>
                            </div>

                            <div className="px-5 sm:px-6 divide-y divide-gray-100">
                                {cartItems.length > 0 ? (
                                    cartItems.map((item, index) => (
                                        <div
                                            key={item._id || item.id || index}
                                            className="py-5 flex items-center gap-4"
                                        >
                                            {/* Product Image */}
                                            <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-gray-50 border border-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-contain p-2"
                                                    />
                                                ) : (
                                                    <FiPackage
                                                        size={28}
                                                        className="text-gray-300"
                                                    />
                                                )}
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2">
                                                    {item.name}
                                                </h3>

                                                <p className="text-sm text-gray-500 mt-1">
                                                    {formatPrice(item.price)} ×{" "}
                                                    {item.quantity}
                                                </p>

                                                <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium mt-2">
                                                    <FiCheckCircle size={13} />
                                                    Ready for checkout
                                                </span>
                                            </div>

                                            {/* Item Total */}
                                            <div className="text-right shrink-0">
                                                <p className="text-sm sm:text-base font-bold text-gray-900">
                                                    {formatPrice(
                                                        Number(
                                                            item.price || 0,
                                                        ) *
                                                            Number(
                                                                item.quantity ||
                                                                    0,
                                                            ),
                                                    )}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-12 text-center">
                                        <FiShoppingBag
                                            size={36}
                                            className="mx-auto text-gray-300"
                                        />
                                        <h3 className="font-semibold text-gray-800 mt-3">
                                            Your cart is empty
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Add some products to continue.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Secure Checkout Note */}
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                            <FiShield
                                className="text-indigo-600 mt-0.5 shrink-0"
                                size={20}
                            />
                            <div>
                                <p className="text-sm font-semibold text-indigo-900">
                                    Secure Checkout
                                </p>
                                <p className="text-xs text-indigo-700 mt-1 leading-relaxed">
                                    Your order information is protected. You
                                    will proceed to the payment step to complete
                                    your purchase.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Order Summary */}
                    <aside className="lg:col-span-1">
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6 lg:sticky lg:top-6">
                            <div className="flex items-center gap-3 pb-5 border-b border-gray-100">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <FiCreditCard size={20} />
                                </div>

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        Order Summary
                                    </h2>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        Price breakdown
                                    </p>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-4 py-5 text-sm">
                                <div className="flex justify-between text-gray-500">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-gray-900">
                                        {formatPrice(subtotal)}
                                    </span>
                                </div>

                                <div className="flex justify-between text-gray-500">
                                    <span>Shipping Fee</span>
                                    <span className="font-medium text-gray-900">
                                        {shipping === 0 ? (
                                            <span className="text-green-600">
                                                Free
                                            </span>
                                        ) : (
                                            formatPrice(shipping)
                                        )}
                                    </span>
                                </div>

                                <div className="flex justify-between text-gray-500">
                                    <span>GST (18%)</span>
                                    <span className="font-medium text-gray-900">
                                        {formatPrice(tax)}
                                    </span>
                                </div>

                                <div className="border-t border-dashed border-gray-200 pt-4 flex justify-between items-center">
                                    <span className="text-gray-600 font-semibold">
                                        Total Amount
                                    </span>
                                    <span className="text-xl font-bold text-indigo-600">
                                        {formatPrice(total)}
                                    </span>
                                </div>
                            </div>

                            {/* Payment Button */}
                            <button
                                onClick={proceedToPayment}
                                disabled={!cartItems.length}
                                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-4 rounded-xl shadow-md shadow-indigo-100 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Proceed to Payment
                                <FiArrowRight size={18} />
                            </button>

                            <Link
                                to="/shipping"
                                className="w-full flex items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 mt-4 transition-colors"
                            >
                                <FiArrowLeft size={15} />
                                Back to Shipping
                            </Link>

                            {/* Payment Security */}
                            <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-400">
                                <FiShield size={15} />
                                Safe and secure checkout
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirm;
