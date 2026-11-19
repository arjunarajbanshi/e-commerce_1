import React from "react";

const Loader = () => {
    return (
        <div className="flex items-center justify-center min-h-50 w-full">
            <div className="relative flex items-center justify-center">
                {/* Outer spinning ring */}
                <div className="h-12 w-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
            </div>
        </div>
    );
};

export default Loader;
