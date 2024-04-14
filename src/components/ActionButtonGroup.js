import React, {useState} from "react";
import useTamagotchi from "../app/StateContext.js";
import { ActionButton } from "./ActionButton.js";
import { HoldButton } from "./HoldButton.js";
import { FoodButton } from "./FoodButton.js";
import { allFoods } from '../util/getFood.js';
import * as constants from '../util/Constants.js'
import "../css/ActionButton.css"

export const ActionButtonGroup = () => {
    const { 
        name, 
        isHere, 
        status, 
        tiredness, 
        isAsleep,
        inventory, 
        jingleKeys, 
        getStatusMessages, 
        doPet, 
        doSleep, 
        wakeUp, 
        giveMedicine,
        playWithToy,
        goPiss,
        isPissing
    } = useTamagotchi();
    const [foodOpt, setFoodOpt] = useState(false);

    if (!isHere) {
        let handleClick = () => {
            setFoodOpt(false)
            jingleKeys()
        }
        return (
            <div className='actions'>
                <ActionButton action={() => handleClick()} label='Jingle Keys' />
            </div>
        )
    } else if (isAsleep) {
        return (
            <div className='actions'>
                <ActionButton action={() => wakeUp()} label={`Wake ${name} Up`}/>
            </div>
        )
    } else if (isPissing) {
        return (
            <div className='actions'>
                <HoldButton action={goPiss} label={'Hold to Piss'} />
            </div>
        )
    } else if (foodOpt) {
        const foodButtons = allFoods.map(selectedFood => (
            <FoodButton key={selectedFood.id} action={setFoodOpt} food={selectedFood} />
        ))
    
        return (
            <div className='actions'>
                {foodButtons}
            </div>
        )
    } else {
        const toyButtons = inventory.map(toy => (<ActionButton key={toy.name} action={() => playWithToy(toy.name)} label={`${toy.action} ${toy.name}`} />))

        const buttons = [
            <ActionButton key='status' action={() => getStatusMessages()} label={`Get ${name}'s Status`}/>,
            <ActionButton key='food' action={() => setFoodOpt(true)} label={`Give ${name} Food`} />,
            <ActionButton key='pet' action={() => doPet()} label={`Pet ${name}`}/>,
            ...tiredness >= constants.TIREDNESS_THRESHOLD_1
                ? [<ActionButton key='nap' action={() => doSleep()} label={`Put ${name} Down for a Nap`} />] : [],
            ...status.isSick 
                ? [<ActionButton key='medicine' action={() => giveMedicine()} label={`Give ${name} Medicine`} />] : [],
            ...toyButtons
        ]

        return <div className='actions'>{buttons}</div>;
    }
}