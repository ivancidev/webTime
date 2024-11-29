import { useState, useEffect } from "react";
import Star from "../../../icons/star";
import StarHappy from "../../../icons/star-happy";
import StarPressed from "../../../icons/star-pressed";
import ButtonIcon from "../../../components/buttons/buttonIcon";

export const StarRow = ({ value, initialValue }) => {
    const [selectedStars, setSelectedStars] = useState(initialValue || 0);
    const [hoveredStars, setHoveredStars] = useState(0);

    useEffect(() => {
        if (initialValue) {
            setSelectedStars(initialValue);
        }
    }, [initialValue]);

    const handleStarClick = (index) => {
        const newRating = index + 1;
        setSelectedStars(newRating);
        if (value) {
            value(newRating);
        }
    };

    const handleMouseEnter = (index) => {
        setHoveredStars(index + 1);
    };

    const handleMouseLeave = () => {
        setHoveredStars(0);
    };

    return (
        <div className="flex flex-row w-full justify-center h-auto space-x-2">
            {Array.from({ length: 5 }, (_, index) => (
                <div
                    key={index}
                    className="cursor-pointer"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleStarClick(index)}
                >
                    <ButtonIcon
                        SvgIcon={
                            hoveredStars > 0
                                ? hoveredStars >= index + 1
                                    ? StarPressed
                                    : Star
                                : selectedStars >= index + 1
                                ? (selectedStars === 5 ? StarHappy : StarPressed)
                                : Star
                    }
                    variant="combColskyblue"
                    />
                </div>
            ))}
        </div>
    );
};
