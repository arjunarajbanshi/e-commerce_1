import { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const ProductCard = ({ product }) => {
    const [rating, setRating] = useState(product?.ratings || 0);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        console.log(`Rating changed to ${newRating}`);
    };

    return (
        <Link to={`/products/${product._id}`} className="block">
            <div className="w-72 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 p-4 flex flex-col gap-3">
                {/* Product Image */}
                <div className="w-full h-48 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                        src={
                            product.image[0]?.image_url ||
                            "/images/no-image.png"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Details */}
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-gray-800 text-base line-clamp-1">
                        {product.name}
                    </h3>
                    <p className="text-gray-900 font-bold text-lg">
                        ${product.price}
                    </p>

                    {/* Rating Container */}
                    <div className="flex items-center">
                        <Rating
                            value={product.ratings}
                            onRatingChange={handleRatingChange}
                            disabled={true}
                        />
                    </div>

                    <span className="text-sm text-gray-600">
                        ({product.numOfReviews}{" "}
                        {product.numOfReviews === 1 ? "Review" : "Reviews"})
                    </span>

                    <button className="w-full mt-1 bg-black text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-gray-800 active:scale-95 transition-all duration-150 cursor-pointer">
                        View details
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
