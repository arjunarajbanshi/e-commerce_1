import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    logoutUser,
    removeErrors,
    removeSuccess,
} from "../features/user/userSlice";
import { toast } from "react-toastify";

const UserDashboard = ({ user }) => {
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const orders = () => navigate("/orders/user");
    const profile = () => navigate("/profile");
    const myCart = () => navigate("/cart");
    const dashboard = () => navigate("/admin/overview");

    const logout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            toast.success("Logged out successfully");
            dispatch(removeSuccess());
            navigate("/login");
        } catch (error) {
            toast.error(error?.message || error || "Logout failed");
            dispatch(removeErrors());
        }
    };

    const options = [
        ...(user?.role === "admin"
            ? [{ name: "Admin", funcName: dashboard }]
            : []),
        { name: "Orders", funcName: orders },
        { name: "Account", funcName: profile },
        { name: `Cart(${cartItems.length})`, funcName: myCart },
        { name: "Logout", funcName: logout },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Button / Profile Header */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-3 focus:outline-none group p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                aria-expanded={isOpen}
            >
                <img
                    src={
                        user?.avatar?.image_url || "/images/default-profile.jpg"
                    }
                    alt="Profile picture"
                    className="w-9 h-9 rounded-full object-cover border border-gray-200 shadow-sm"
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 hidden md:inline">
                    {user?.name || "User"}
                </span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50">
                    <div className="px-4 py-2 border-b border-gray-100 md:hidden">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                            {user?.name || "User"}
                        </p>
                    </div>

                    <div className="flex flex-col">
                        {options.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => {
                                    item.funcName();
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center ${
                                    item.name === "Logout"
                                        ? "text-red-600 hover:bg-red-50 hover:text-red-700"
                                        : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                                }`}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
