import React, { useEffect } from 'react';
import { ActionButtonGroup } from './ActionButtonGroup.js';
import { SpriteContainer } from './SpriteContainer.js';
import { RockPaperScissors } from './events/RockPaperScissors.js';
import { EventCounter } from './EventCounter.js';
import useTamagotchi from '../app/StateContext.js';
import useEvent from '../app/EventContext.js';

export const Game = () => {
    const { age, status, setSpriteState, isPissing } = useTamagotchi();
    const {setRockPaperScissors, removeEvent, isEvent, name} = useEvent();

    useEffect(() => {
        if (age !== 0 && age % 10 === 0) {
            if (!status.isSick && !isPissing) {
                setSpriteState('base')
                setRockPaperScissors();
            }
        } else {
            removeEvent()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [age])
    
    if (!isEvent) {
        return (
            <>
                <EventCounter />
                <SpriteContainer />
                <div className="bottomPanel">
                    <ActionButtonGroup />
                </div>
            </>
        );
    } else {
        if (name === "ROCK_PAPER_SCISSORS") {
            return <RockPaperScissors />
        }
    }

    
}