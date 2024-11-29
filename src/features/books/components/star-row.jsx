import { useState, useEffect } from "react";
import Star from "../../../icons/star";
import StarHappy from "../../../icons/star-happy";
import StarPressed from "../../../icons/star-pressed";
import ButtonIcon from "../../../components/buttons/buttonIcon";


export const StarRow = ({
    value,
    initialValue
}) => {
    const [selectedStars, setSelectedStars] = useState(0);
    
    useEffect(() => {
        if (initialValue) {
            setSelectedStars(initialValue);
        }
    }, [initialValue]);

    const handleStarClick = (index) => {
        const newRating = index === 4 ? 5 : index + 1;
        setSelectedStars(newRating);
        if (value) {
            value(newRating); 
        }
    };
    
    return (
        <div className="flex flex-row w-full justify-center h-auto space-x-2 hover:space-x-2.5">
            {Array.from({ length: 5 }, (_, index) => (
                <ButtonIcon
                    key={index}
                    SvgIcon={
                        selectedStars === 5
                            ? StarHappy
                            : selectedStars >= index + 1
                            ? StarPressed
                            : Star
                    }
                    variant="combColskyblue"
                    onClick={() => handleStarClick(index)}
                />
            ))}
        </div>
    );
};