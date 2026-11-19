import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { MdClose, MdPersonAdd } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserDashboard from "../User/UserDashboard";
import { loadUser } from "../features/user/userSlice";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log("Search submitted with query:", searchQuery);
        if (searchQuery.trim()) {
            navigate(
                `/products?keyword=${encodeURIComponent(searchQuery.trim())}`,
            );
        } else {
            navigate(`/products`);
        }

        setSearchQuery("");
    };

    const { isAuthenticated, user } = useSelector((state) => state.user);

    // Select cart items from the cart state
    const { cartItems } = useSelector((state) => state.cart);

    // Calculate total quantity of items in the cart (summing up quantities, or use cartItems.length if each index represents a unique line item quantity of 1)
    const totalCartItems =
        cartItems?.reduce((acc, item) => acc + (item.quantity || 1), 0) || 0;

    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) dispatch(loadUser());
    }, [dispatch, isAuthenticated]);

    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="shrink-0">
                        <Link
                            to="/"
                            className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                        >
                            ShopNepal
                        </Link>
                    </div>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:block">
                        <ul className="flex items-center space-x-8">
                            {["Home", "Products", "About Us", "Contact Us"].map(
                                (item) => {
                                    const path = `/${item.toLowerCase().replace(" ", "-")}`;
                                    return (
                                        <li key={item}>
                                            <Link
                                                to={path}
                                                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
                                            >
                                                {item}
                                            </Link>
                                        </li>
                                    );
                                },
                            )}
                        </ul>
                    </div>

                    {/* Nav Actions / Icons */}
                    <div className="flex items-center gap-4">
                        {/* Search Bar (Visible on Desktop) */}
                        <form
                            className="hidden sm:flex items-center relative"
                            onSubmit={handleSearchSubmit}
                        >
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-48 lg:w-64 pl-3 pr-9 py-1.5 text-sm bg-gray-100 border border-transparent rounded-full focus:outline-none focus:bg-white focus:border-blue-500 transition-all duration-200"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button
                                type="submit"
                                aria-label="Search"
                                className="absolute right-3 text-gray-400 hover:text-blue-600 transition-colors"
                            >
                                <FaSearch className="text-xs" />
                            </button>
                        </form>

                        {/* Cart Link with Dynamic Badge */}
                        <Link
                            to="/cart"
                            aria-label="Shopping Cart"
                            className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
                        >
                            <FaShoppingCart className="text-xl" />
                            {totalCartItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-pulse">
                                    {totalCartItems}
                                </span>
                            )}
                        </Link>

                        {/* Login Link / User Dashboard */}
                        {isAuthenticated ? (
                            <UserDashboard user={user} />
                        ) : (
                            <Link
                                to="/login"
                                aria-label="Register"
                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
                            >
                                <MdPersonAdd className="text-xl" />
                            </Link>
                        )}

                        {/* Mobile Hamburger Toggle Button */}
                        <button
                            onClick={toggleMenu}
                            aria-label="Toggle navigation menu"
                            className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none"
                        >
                            {isMenuOpen ? (
                                <MdClose className="text-2xl" />
                            ) : (
                                <RxHamburgerMenu className="text-2xl" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-3 shadow-lg">
                    {/* Mobile Search Bar */}
                    <form
                        className="relative mt-2"
                        onSubmit={handleSearchSubmit}
                    >
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-3 pr-9 py-2 text-sm bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-blue-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            aria-label="Search"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                        >
                            <FaSearch className="text-sm" />
                        </button>
                    </form>

                    {/* Mobile Navigation Links */}
                    <div className="flex flex-col space-y-2 pt-2">
                        {[
                            { name: "Home", path: "/home" },
                            { name: "Products", path: "/products" },
                            { name: "About Us", path: "/about-us" },
                            { name: "Contact Us", path: "/contact-us" },
                        ].map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
