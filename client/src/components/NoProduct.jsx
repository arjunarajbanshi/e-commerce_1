import React from "react";
import { MdWarning } from "react-icons/md";

const NoProduct = ({ keyword }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto my-12 bg-white">
            {/* Warning Icon Container */}
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-amber-50 text-amber-500">
                <MdWarning className="w-8 h-8" />
            </div>

            {/* Heading */}
            <h3 className="text-xl font-bold text-gray-900 mb-2">
                No Products Found
            </h3>

            {/* Subtext */}
            <p className="text-sm text-gray-600 leading-relaxed">
                {keyword ? (
                    <>
                        We couldn't find any products matching{" "}
                        <span className="font-semibold text-gray-800">
                            "{keyword}"
                        </span>
                        . Try using different keywords or browse our complete
                        catalog.
                    </>
                ) : (
                    "No products are currently available. Please check back later."
                )}
            </p>
        </div>
    );
};

export default NoProduct;
