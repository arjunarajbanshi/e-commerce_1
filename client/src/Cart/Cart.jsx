import { useSelector } from "react-redux";
import { FaShoppingBag, FaArrowRight } from "react-icons/fa";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import CartItem from "./CartItem";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
    const { isAuthenticated } = useSelector((state) => state.user);
    const { cartItems } = useSelector((state) => state.cart);
    const navigate = useNavigate();

    // Calculations
    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
    );
    const tax = Math.round(subtotal * 0.18);
    const shipping = subtotal > 0 ? 50 : 0;
    const total = subtotal + tax + shipping;

    const handleCheckOut = () => {
        if (isAuthenticated) {
            navigate("/shipping");
        } else {
            navigate("/login?redirect=/shipping");
        }
    };
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
            <PageTitle title="Your Cart" />
            <Navbar />

            <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex items-center gap-3 mb-8">
                    <FaShoppingBag className="text-2xl text-indigo-600" />
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        Your Shopping Cart
                    </h1>
                </div>

                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                        <p className="text-lg text-gray-500 mb-4">
                            Your cart is currently empty.
                        </p>
                        <Link
                            to="/products"
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-sm"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                        {/* Cart Items List */}
                        <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8 lg:mb-0">
                            <div className="p-6 border-b border-gray-100 hidden sm:grid grid-cols-12 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                <div className="col-span-6">Product</div>
                                <div className="col-span-3 text-center">
                                    Quantity
                                </div>
                                <div className="col-span-2 text-right">
                                    Total
                                </div>
                                <div className="col-span-1"></div>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {cartItems
                                    .slice()
                                    .reverse()
                                    .map((item) => (
                                        <CartItem
                                            key={item.productId}
                                            item={item}
                                        />
                                    ))}
                            </div>
                        </div>

                        {/* Price Summary Card */}
                        <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                                Price Summary
                            </h2>

                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-gray-900">
                                        ${subtotal}
                                    </span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax (18%)</span>
                                    <span className="font-semibold text-gray-900">
                                        ${tax}
                                    </span>
                                </div>
                                <div className="flex justify-between text-gray-600 pb-4 border-b border-gray-100">
                                    <span>Shipping</span>
                                    <span className="font-semibold text-gray-900">
                                        ${shipping}
                                    </span>
                                </div>
                                <div className="flex justify-between text-base font-bold text-gray-900 pt-2">
                                    <span>Total Amount</span>
                                    <span className="text-indigo-600">
                                        ${total}
                                    </span>
                                </div>
                            </div>

                            <button
                                className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3.5 px-4 rounded-xl transition shadow-sm hover:shadow flex items-center justify-center gap-2 group"
                                onClick={handleCheckOut}
                            >
                                Proceed to Checkout
                                <FaArrowRight
                                    className="group-hover:translate-x-1 transition-transform"
                                    size={14}
                                />
                            </button>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Cart;
