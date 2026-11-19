import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const Rating = ({ value = 0, onRatingChange, disabled = false }) => {
    const [hoverRating, setHoverRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(value);

    // Keep internal state in sync if external 'value' prop changes
    useEffect(() => {
        setSelectedRating(value);
    }, [value]);

    const handleMouseEnter = (rating) => {
        if (!disabled) setHoverRating(rating);
    };

    const handleMouseLeave = () => {
        if (!disabled) setHoverRating(0);
    };

    const handleClick = (rating) => {
        if (!disabled) {
            setSelectedRating(rating);
            if (onRatingChange) onRatingChange(rating);
        }
    };

    const generateStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const isFilled = i <= (hoverRating || selectedRating);

            stars.push(
                <button
                    type="button"
                    key={i}
                    disabled={disabled}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(i)}
                    className={`p-1 focus:outline-none transition-transform duration-150 ${
                        disabled
                            ? "cursor-default"
                            : "cursor-pointer hover:scale-110"
                    }`}
                    aria-label={`Rate ${i} out of 5 stars`}
                >
                    <FaStar
                        className={`text-xl transition-colors duration-200 ${
                            isFilled ? "text-amber-400" : "text-gray-300"
                        }`}
                    />
                </button>,
            );
        }

        return stars;
    };

    return <div className="flex items-center gap-1">{generateStars()}</div>;
};

export default Rating;
