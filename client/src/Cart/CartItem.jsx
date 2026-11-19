import { useState, useEffect } from "react";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
    addItemsToCart,
    removeErrors,
    removeItemFromCart,
} from "../features/cart/cartSlice";
import { toast } from "react-toastify";

const CartItem = ({ item }) => {
    const [quantity, setQuantity] = useState(item.quantity);
    const { error } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    // Sync local state
    useEffect(() => {
        setQuantity(item.quantity);
    }, [item.quantity]);

    const handleIncrease = () => {
        if (quantity < item.stock) {
            const newQty = quantity + 1;
            setQuantity(newQty);
            dispatch(addItemsToCart({ id: item.productId, quantity: newQty }));
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            const newQty = quantity - 1;
            setQuantity(newQty);
            dispatch(addItemsToCart({ id: item.productId, quantity: newQty }));
        }
    };

    const handleRemove = () => {
        dispatch(removeItemFromCart(item.productId));
        toast.success("Item removed from cart successfully!")
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(removeErrors());
        }
    }, [error, dispatch]);

    return (
        <div className="p-6 flex flex-col sm:grid sm:grid-cols-12 sm:items-center gap-4 border-b border-gray-100 last:border-none">
            {/* Product Info */}
            <div className="sm:col-span-6 flex items-center gap-4">
                <div className="w-20 h-20 shrink-0 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                    <img
                        src={item.image || "/images/placeholder.jpg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Price:{" "}
                        <span className="font-medium text-gray-900">
                            ${item.price}
                        </span>
                    </p>
                    <span className="inline-block text-xs text-emerald-600 font-medium mt-1">
                        In Stock ({item.stock} left)
                    </span>
                </div>
            </div>

            {/* Quantity Controls */}
            <div className="sm:col-span-3 flex items-center justify-start sm:justify-center gap-2">
                <button
                    type="button"
                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 text-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Decrease quantity"
                    disabled={quantity <= 1}
                    onClick={handleDecrease}
                >
                    <FaMinus size={10} />
                </button>
                <input
                    type="number"
                    value={quantity}
                    readOnly
                    min="1"
                    className="[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield] w-12 text-center text-sm font-semibold border border-gray-200 rounded-lg py-1 bg-gray-50"
                />
                <button
                    type="button"
                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 text-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Increase quantity"
                    disabled={quantity >= item.stock}
                    onClick={handleIncrease}
                >
                    <FaPlus size={10} />
                </button>
            </div>

            {/* Item Total (Updates live with local quantity) */}
            <div className="sm:col-span-2 text-left sm:text-right font-bold text-gray-900">
                ${(item.price * quantity).toFixed(2)}
            </div>

            {/* Actions / Remove */}
            <div className="sm:col-span-1 flex justify-end">
                <button
                    type="button"
                    onClick={handleRemove}
                    className="text-gray-400 hover:text-red-500 transition p-2"
                    title="Remove item"
                >
                    <FaTrash size={16} />
                </button>
            </div>
        </div>
    );
};

export default CartItem;