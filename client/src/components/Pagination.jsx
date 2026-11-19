import React from "react";
import { useSelector } from "react-redux";

const Pagination = ({
    currentPage,
    onPageChange,
    nextPageText = "Next",
    prevPageText = "Prev",
    firstPageText = "1st",
    lastPageText = "Last",
}) => {
    const { totalPages, products } = useSelector((state) => state.product);
    if (products.length === 0 || totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pageNumbers = [];
        const pageWindow = 2;
        for (
            let i = Math.max(1, currentPage - pageWindow);
            i <= Math.min(totalPages, currentPage + pageWindow);
            i++
        ) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    // Base button classes for consistency
    const baseBtnClass = "px-3.5 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors disabled:opacity-50 shadow-sm";
    
    // Active button classes for the current page
    const activeBtnClass = "px-3.5 py-2 text-sm font-medium rounded-lg border border-indigo-600 bg-indigo-600 text-white shadow-sm";

    return (
        <nav className="flex items-center justify-center space-x-1.5 my-6" aria-label="Pagination">
            {/* First & Previous Buttons */}
            {currentPage > 1 && (
                <>
                    <button 
                        onClick={() => onPageChange(1)}
                        className={baseBtnClass}
                    >
                        {firstPageText}
                    </button>

                    <button 
                        onClick={() => onPageChange(currentPage - 1)}
                        className={baseBtnClass}
                    >
                        {prevPageText}
                    </button>
                </>
            )}

            {/* Page Numbers */}
            {getPageNumbers().map((number) => {
                const isActive = number === currentPage;
                return (
                    <button 
                        key={number} 
                        onClick={() => onPageChange(number)}
                        className={isActive ? activeBtnClass : baseBtnClass}
                        aria-current={isActive ? "page" : undefined}
                    >
                        {number}
                    </button>
                );
            })}

            {/* Next & Last Buttons */}
            {currentPage < totalPages && (
                <>
                    <button 
                        onClick={() => onPageChange(currentPage + 1)}
                        className={baseBtnClass}
                    >
                        {nextPageText}
                    </button>

                    <button 
                        onClick={() => onPageChange(totalPages)}
                        className={baseBtnClass}
                    >
                        {lastPageText}
                    </button>
                </>
            )}
        </nav>
    );
};

export default Pagination;