import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";
import { getProduct, removeErrors } from "../features/products/productSlice";
import Loader from "../components/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import NoProduct from "../components/NoProduct";
import Pagination from "../components/Pagination";

const Products = () => {
    const {
        loading,
        error,
        products,
        resultPerPage,
        totalPages,
        productCount,
    } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get("keyword");
    const category = searchParams.get("category");
    const pageFromURL = parseInt(searchParams.get("page"), 10) || 1;

    const [currentPage, setCurrentPage] = useState(pageFromURL);

    const categories = ["Men", "Women", "Electronics", "Accessories", "Kids"];

    useEffect(() => {
        dispatch(getProduct({ keyword, page: currentPage, category }));
    }, [dispatch, keyword, currentPage, category]);

    useEffect(() => {
        if (error) {
            toast.error(error.message, {
                position: "top-center",
                autoClose: 3000,
            });
        }

        dispatch(removeErrors());
    }, [dispatch, error]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col justify-between bg-gray-50">
                <Navbar />
                <Loader />
                <Footer />
            </div>
        );
    }

    if (error || !products) {
        return (
            <div className="min-h-screen flex flex-col justify-between bg-gray-50">
                <PageTitle title={`All Products`} />
                <Navbar />
                <div className="grow flex items-center justify-center text-gray-500">
                    <p>Failed to load products. Please try again later.</p>
                </div>
                <Footer />
            </div>
        );
    }

    const handlePageChange = (page) => {
        if (page !== currentPage) {
            setCurrentPage(page);
            const newSearchParams = new URLSearchParams(location.search);

            if (page === 1) {
                newSearchParams.delete("page");
            } else {
                newSearchParams.set("page", page);
            }
            navigate(`?${newSearchParams.toString()}`);
        }
    };

    const handleCategoryClick = (cat) => {
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.set("category", cat);
        newSearchParams.delete("page");
        navigate(`?${newSearchParams.toString()}`);
    };

    const handleClearFilter = () => {
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.delete("category");
        newSearchParams.delete("page");
        navigate(`?${newSearchParams.toString()}`);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
            <PageTitle title="All Products" />
            <Navbar />

            <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
                    {keyword ? `Search results for "${keyword}"` : "All Products"}
                </h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Categories Sidebar */}
                    <aside className="w-full lg:w-64 shrink-0">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                                    Categories
                                </h3>
                                {category && (
                                    <button
                                        onClick={handleClearFilter}
                                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>
                            <ul className="space-y-2">
                                {categories.map((cat) => {
                                    const isSelected = category === cat;
                                    return (
                                        <li
                                            key={cat}
                                            onClick={() => handleCategoryClick(cat)}
                                            className={`cursor-pointer px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                isSelected
                                                    ? "bg-indigo-50 text-indigo-600"
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                            }`}
                                        >
                                            {cat}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </aside>

                    {/* Product Listing Area */}
                    <div className="grow">
                        {products.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {products.map((product) => (
                                        <ProductCard
                                            key={product._id}
                                            product={product}
                                        />
                                    ))}
                                </div>
                                <div className="mt-8 flex justify-center">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                                <NoProduct keyword={keyword} />
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Products;