import React from 'react';
import { EventActionButtonGroup } from './EventActionButtonGroup.js';
import { SpriteContainer } from '../SpriteContainer.js';
// import useEvent from '../../app/EventContext.js';

export const RockPaperScissors = () => {
    // const {data} = useEvent();

    return (
        <>
            <SpriteContainer event={true}/>
            <div className="bottomPanel">
                <EventActionButtonGroup event="ROCK_PAPER_SCISSORS"/>
            </div>
        </>
    )
}