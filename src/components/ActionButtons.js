import React, { useEffect } from "react";
import useTamagotchi from "../app/StateContext";
import { FoodButton } from "./FoodButton";
import { GetStatusButton } from "./GetStatusButton";
import { GiveFoodButton } from "./GiveFoodButton.js";
import { GiveMedicineButton } from "./GiveMedicineButton.js";
import { allFoods } from '../util/getFood.js';

export const ActionButtons = () => {
    const { age, isFeed, status } = useTamagotchi();

    if (isFeed) {
        const foodButtons = allFoods.map(selectedFood => (
            <FoodButton key={selectedFood.id} food={selectedFood} />
        ))
    
        return (
            <div id='actions'>
                {foodButtons}
            </div>
        )
    } else {
        return (
            <div id='actions'>
                <GetStatusButton />
                <GiveFoodButton />
                {status.isSick && 
                    <GiveMedicineButton />
                }
            </div>
        )
    }
}