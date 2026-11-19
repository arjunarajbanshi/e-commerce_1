import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import ImageSlider from "../components/ImageSlider";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Product from "../components/ProductCard";
import { useEffect } from "react";
import { getProduct, removeErrors } from "../features/products/productSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Home = () => {
    const { error, loading, productCount, products } = useSelector(
        (state) => state.product,
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct({ keyword: "" }));
    }, [dispatch]);

    useEffect(() => {
        if (error) toast.error(error.message);

        dispatch(removeErrors());
    }, [dispatch, error]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <PageTitle title="ShopNepal | Home" />
                    <Navbar />
                    <ImageSlider autoPlay={true} interval={4000} />
                    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
                        <div className="max-w-7xl mx-auto">
                            {/* Header Section */}
                            <div className="text-center space-y-3 mb-12">
                                <span className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
                                    Curated Selection
                                </span>
                                <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                                    Trending Now
                                </h2>
                                <div className="w-16 h-1 bg-indigo-600 dark:bg-indigo-500 mx-auto rounded-full" />
                            </div>

                            {/* Products Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                                {products?.map((product) => (
                                    <Product
                                        product={product}
                                        key={product._id}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                    <Footer />
                </>
            )}
        </>
    );
};

export default Home;
