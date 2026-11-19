import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    FiArrowLeft,
    FiLock,
    FiCreditCard,
    FiShield,
    FiCheckCircle,
    FiArrowRight,
    FiPackage,
    FiSmartphone,
} from "react-icons/fi";

import PageTitle from "../components/PageTitle";
import CheckoutPath from "./CheckoutPath";

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState("online");
    const [isProcessing, setIsProcessing] = useState(false);

    const orderItem = useMemo(() => {
        try {
            return JSON.parse(sessionStorage.getItem("orderItem") || "{}");
        } catch {
            return {};
        }
    }, []);

    const subtotal = Number(orderItem.subtotal) || 0;
    const tax = Number(orderItem.tax) || 0;
    const shipping = Number(orderItem.shipping) || 0;
    const total = Number(orderItem.total) || 0;

    const formatPrice = (amount) =>
        `₹${Number(amount).toLocaleString("en-IN")}`;

    const handlePayment = async () => {
        if (total <= 0) return;

        setIsProcessing(true);

        try {
            // Integrate your actual payment gateway here.
            // Example: Razorpay, Stripe, Khalti, or eSewa.
            console.log("Selected payment method:", paymentMethod);
            console.log("Order amount:", total);
        } catch (error) {
            console.error("Payment error:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-16">
            <PageTitle title="Payment" />

            {/* Checkout Progress */}
            <div className="max-w-6xl mx-auto pt-4">
                <CheckoutPath activePath={2} />
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
                        <Link
                            to="/order/confirm"
                            className="hover:text-indigo-600 transition-colors"
                        >
                            Confirmation
                        </Link>
                        <span>/</span>
                        <span className="text-indigo-600 font-medium">
                            Payment
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Complete Your Payment
                    </h1>

                    <p className="text-gray-500 text-sm sm:text-base mt-2">
                        Choose your preferred payment method to complete your
                        order.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* LEFT: Payment Methods */}
                    <div className="lg:col-span-2 space-y-6">
                        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                            {/* Section Header */}
                            <div className="px-5 sm:px-7 py-5 border-b border-gray-100 flex items-center gap-3">
                                <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <FiCreditCard size={21} />
                                </div>

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        Payment Method
                                    </h2>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Select how you would like to pay
                                    </p>
                                </div>
                            </div>

                            <div className="p-5 sm:p-7 space-y-4">
                                {/* Online Payment */}
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod("online")}
                                    className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 ${
                                        paymentMethod === "online"
                                            ? "border-indigo-600 bg-indigo-50/50"
                                            : "border-gray-200 hover:border-gray-300"
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                                                paymentMethod === "online"
                                                    ? "bg-indigo-600 text-white"
                                                    : "bg-gray-100 text-gray-500"
                                            }`}
                                        >
                                            <FiCreditCard size={21} />
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 text-sm">
                                                Online Payment
                                            </h3>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Pay securely using your
                                                preferred payment gateway.
                                            </p>
                                        </div>

                                        <div
                                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                                paymentMethod === "online"
                                                    ? "border-indigo-600"
                                                    : "border-gray-300"
                                            }`}
                                        >
                                            {paymentMethod === "online" && (
                                                <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                                            )}
                                        </div>
                                    </div>
                                </button>

                                {/* Cash on Delivery */}
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod("cod")}
                                    className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 ${
                                        paymentMethod === "cod"
                                            ? "border-indigo-600 bg-indigo-50/50"
                                            : "border-gray-200 hover:border-gray-300"
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                                                paymentMethod === "cod"
                                                    ? "bg-indigo-600 text-white"
                                                    : "bg-gray-100 text-gray-500"
                                            }`}
                                        >
                                            <FiPackage size={21} />
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 text-sm">
                                                Cash on Delivery
                                            </h3>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Pay when your order arrives at
                                                your doorstep.
                                            </p>
                                        </div>

                                        <div
                                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                                paymentMethod === "cod"
                                                    ? "border-indigo-600"
                                                    : "border-gray-300"
                                            }`}
                                        >
                                            {paymentMethod === "cod" && (
                                                <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                                            )}
                                        </div>
                                    </div>
                                </button>

                                {/* Payment Information */}
                                <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-100">
                                    <div className="flex items-start gap-3">
                                        <FiShield
                                            className="text-indigo-600 mt-0.5 shrink-0"
                                            size={19}
                                        />

                                        <div>
                                            <p className="text-sm font-semibold text-gray-800">
                                                {paymentMethod === "online"
                                                    ? "Secure Online Transaction"
                                                    : "Pay After Delivery"}
                                            </p>

                                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                                {paymentMethod === "online"
                                                    ? "Your payment will be processed through an integrated payment gateway."
                                                    : "Your order will be paid for when it is delivered. Availability depends on your delivery location."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Security Information */}
                        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 flex gap-4">
                            <div className="w-11 h-11 shrink-0 rounded-xl bg-white text-indigo-600 flex items-center justify-center">
                                <FiLock size={21} />
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-indigo-900">
                                    Safe & Secure Checkout
                                </h3>

                                <p className="text-xs text-indigo-700 mt-1 leading-relaxed">
                                    Your payment information is handled by the
                                    payment provider. We do not store your
                                    sensitive card details on our servers.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Order Summary */}
                    <aside>
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6 lg:sticky lg:top-6">
                            <div className="flex items-center gap-3 pb-5 border-b border-gray-100">
                                <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <FiPackage size={21} />
                                </div>

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        Order Summary
                                    </h2>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Final payment details
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
                                        {formatPrice(shipping)}
                                    </span>
                                </div>

                                <div className="flex justify-between text-gray-500">
                                    <span>GST (18%)</span>
                                    <span className="font-medium text-gray-900">
                                        {formatPrice(tax)}
                                    </span>
                                </div>

                                <div className="border-t border-dashed border-gray-200 pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-gray-700">
                                            Total Payable
                                        </span>

                                        <span className="text-2xl font-extrabold text-indigo-600">
                                            {formatPrice(total)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Pay Button */}
                            <button
                                onClick={handlePayment}
                                disabled={total <= 0 || isProcessing}
                                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-4 rounded-xl shadow-md shadow-indigo-100 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                {isProcessing ? (
                                    "Processing..."
                                ) : (
                                    <>
                                        <FiLock size={17} />
                                        {paymentMethod === "cod"
                                            ? "Place Order"
                                            : `Pay ${formatPrice(total)}`}
                                        <FiArrowRight size={17} />
                                    </>
                                )}
                            </button>

                            <Link
                                to="/order/confirm"
                                className="w-full flex items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 mt-4 transition-colors"
                            >
                                <FiArrowLeft size={15} />
                                Back to Order Confirmation
                            </Link>

                            {/* Security Footer */}
                            <div className="mt-6 pt-5 border-t border-gray-100">
                                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                                    <FiShield size={15} />
                                    Secure payment experience
                                </div>

                                <div className="flex items-center justify-center gap-2 mt-3">
                                    <FiCheckCircle
                                        className="text-green-500"
                                        size={14}
                                    />
                                    <span className="text-xs text-gray-400">
                                        Your order details are protected
                                    </span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Payment;
