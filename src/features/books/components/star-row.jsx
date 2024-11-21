import { useState } from "react";
import Star from "../../../icons/star";
import StarHappy from "../../../icons/star-happy";
import StarPressed from "../../../icons/star-pressed";
import ButtonIcon from "../../../components/buttons/buttonIcon";

export const StarRow = () => {
    const [selectedStars, setSelectedStars] = useState(0);

    const handleStarClick = (index) => {
        if (index === 4) {
            setSelectedStars(5);
        } else {
            setSelectedStars(index + 1);
        }
    };

    return (
        <div className="group flex flex-row w-full justify-center h-auto space-x-2">
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
