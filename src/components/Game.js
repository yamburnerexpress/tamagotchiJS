import React, { useEffect } from 'react';
import { ActionButtonGroup } from './ActionButtonGroup.js';
import { SpriteContainer } from './SpriteContainer.js';
import { RockPaperScissors } from './events/RockPaperScissors.js';
import { EventCounter } from './EventCounter.js';
import useTamagotchi from '../app/StateContext.js';
import useEvent from '../app/EventContext.js';

export const Game = () => {
    const { age, status } = useTamagotchi();
    const {setRockPaperScissors, removeEvent, isEvent, name} = useEvent();

    useEffect(() => {
        switch (age) {
            case 10 && !status.isSick: {
                setRockPaperScissors();
                break;
            }
            default: {
                removeEvent();
            }
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