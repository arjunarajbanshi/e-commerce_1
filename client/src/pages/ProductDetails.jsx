import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    getProductDetails,
    removeErrors,
} from "../features/products/productSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { addItemsToCart, removeMessage } from "../features/cart/cartSlice";

const ProductDetails = () => {
    const [userRating, setUserRating] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [reviewComment, setReviewComment] = useState("");
    const [selectedImage, setSelectedImage] = useState("");

    const handleRatingChange = (newRating) => {
        setUserRating(newRating);
    };

    const { loading, product, error } = useSelector((state) => state.product);
    const {
        loading: cartLoading,
        error: cartError,
        success,
        message,
        cartItems,
    } = useSelector((state) => state.cart);

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if (id) dispatch(getProductDetails(id));
        return () => dispatch(removeErrors());
    }, [id, dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error.message, {
                position: "top-center",
                autoClose: 3000,
            });

            dispatch(removeErrors());
        }

        if (cartError) {
            toast.error(cartError);
        }
    }, [dispatch, error, cartError]);

    useEffect(() => {
        if (success) {
            toast.success(message);
            dispatch(removeMessage());
        }
    }, [dispatch, success, message]);

    useEffect(() => {
        if (product && product.image && product.image.length > 0) {
            setSelectedImage(product.image[0].image_url);
        } else {
            setSelectedImage("/images/no-image.png");
        }
    }, [product]);

    /* Add to cart */
    const addToCart = () => {
        dispatch(addItemsToCart({ id, quantity }));
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col justify-between">
                <Navbar />
                <Loader />
                <Footer />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col justify-between">
                <PageTitle title={`Product Details`} />
                <Navbar />
                <div className="flex-1 flex items-center justify-center p-8">
                    <p className="text-gray-500 text-lg">Product not found.</p>
                </div>
                <Footer />
            </div>
        );
    }

    const isOutOfStock = product.stock <= 0;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
            <PageTitle title={`${product.name} - Details`} />
            <Navbar />

            <main className="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-12">
                {/* Product Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Image Container & Thumbnails */}
                    <div className="space-y-4">
                        <div className="w-full flex justify-center bg-gray-50 rounded-xl overflow-hidden p-4 border border-gray-100">
                            <img
                                src={selectedImage || "/images/no-image.png"}
                                alt={product.name}
                                className="w-full max-h-112 object-contain transition-transform duration-300 hover:scale-105"
                            />
                        </div>

                        {product.image && product.image.length > 1 && (
                            <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                                {product.image.map((img, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() =>
                                            setSelectedImage(img.image_url)
                                        }
                                        className={`relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                            selectedImage === img.image_url
                                                ? "border-indigo-600 ring-2 ring-indigo-600/20"
                                                : "border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100"
                                        }`}
                                    >
                                        <img
                                            src={img.image_url}
                                            alt={`Product ${index + 1} Thumbnail`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details Container */}
                    <div className="flex flex-col space-y-5">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                            {product.name}
                        </h2>

                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                            {product.description}
                        </p>

                        {/* Price */}
                        <div className="text-3xl font-extrabold text-indigo-600">
                            ${product.price}
                        </div>

                        {/* Rating Summary */}
                        <div className="flex items-center space-x-3 pb-2 border-b border-gray-100">
                            <Rating value={product.ratings} disabled={true} />
                            <span className="text-sm text-gray-500 font-medium">
                                ({product.numOfReviews}{" "}
                                {product.numOfReviews === 1
                                    ? "Review"
                                    : "Reviews"}
                                )
                            </span>
                        </div>

                        {/* Stock Badge */}
                        <div>
                            <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                    isOutOfStock
                                        ? "bg-rose-100 text-rose-700"
                                        : "bg-emerald-100 text-emerald-700"
                                }`}
                            >
                                {isOutOfStock
                                    ? "Out of stock"
                                    : `In stock (${product.stock} available)`}
                            </span>
                        </div>

                        {/* Quantity & Add to Cart */}
                        {!isOutOfStock && (
                            <div className="space-y-4 pt-2">
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm font-medium text-gray-700">
                                        Quantity:
                                    </span>
                                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                                        <button
                                            onClick={() =>
                                                setQuantity((prev) => prev - 1)
                                            }
                                            className="px-3 py-1.5 text-gray-600 hover:bg-gray-200 transition-colors font-bold disabled:opacity-50"
                                            disabled={quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={quantity}
                                            readOnly
                                            className="[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield] w-12 text-center bg-transparent border-none text-sm font-semibold text-gray-800 focus:outline-none"
                                        />
                                        <button
                                            onClick={() =>
                                                setQuantity((prev) => prev + 1)
                                            }
                                            className="px-3 py-1.5 text-gray-600 hover:bg-gray-200 transition-colors font-bold disabled:opacity-50"
                                            disabled={quantity >= product.stock}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <button
                                    className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-sm hover:shadow transition-all duration-200 active:scale-[0.99]"
                                    onClick={addToCart}
                                    disabled={cartLoading}
                                >
                                    {cartLoading ? "Adding..." : "Add to Cart"}
                                </button>
                            </div>
                        )}

                        {/* Review Form */}
                        <form className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Write a Review
                            </h3>
                            <div>
                                <Rating
                                    value={userRating}
                                    disabled={false}
                                    onRatingChange={handleRatingChange}
                                />
                            </div>
                            <textarea
                                value={reviewComment}
                                onChange={(e) =>
                                    setReviewComment(e.target.value)
                                }
                                placeholder="Write your review here..."
                                rows={3}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm outline-none transition-all resize-none"
                            ></textarea>
                            <button
                                type="submit"
                                className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                                Submit Review
                            </button>
                        </form>
                    </div>
                </div>

                {/* Reviews List Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">
                        Customer Reviews
                    </h3>
                    {product.reviews && product.reviews.length > 0 ? (
                        <div className="divide-y divide-gray-100">
                            {product.reviews.map((review, index) => (
                                <div
                                    key={index}
                                    className="py-4 first:pt-0 last:pb-0 space-y-2"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-gray-900 text-sm">
                                            {review.name}
                                        </span>
                                        <Rating
                                            value={review.rating}
                                            disabled={true}
                                        />
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {review.comment}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm italic">
                            No reviews yet. Be the first to review this product!
                        </p>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetails;
