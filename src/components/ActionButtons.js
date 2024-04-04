import React from "react";
import useTamagotchi from "../app/StateContext";
import { FoodButton } from "./FoodButton";
import { GetStatusButton } from "./GetStatusButton";
import { GiveFoodButton } from "./GiveFoodButton.js";
import { GiveMedicineButton } from "./GiveMedicineButton.js";
import { GiveEntertainButton } from "./GiveEntertainButton.js";
import { DoSleepButton } from "./DoSleepButton.js";
import { WakeUpButton } from "./WakeUpButton.js";
import { allFoods } from '../util/getFood.js';
import * as constants from '../util/Constants.js'

export const ActionButtons = () => {
    const { isFeed, status, tiredness, isAsleep } = useTamagotchi();
    if (isAsleep) {
        return (
            <div id='actions'>
                <WakeUpButton />
            </div>
        )
    } else if (isFeed) {
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
                <GiveEntertainButton action='pet' />
                {tiredness > constants.TIREDNESS_THRESHOLD_1 &&
                    <DoSleepButton />
                }
                {status.isSick && 
                    <GiveMedicineButton />
                }
            </div>
        )
    }
}