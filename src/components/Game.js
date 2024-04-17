import React, { useEffect } from 'react';
import { ActionButtonGroup } from './ActionButtonGroup.js';
import { EventActionButtonGroup } from './events/EventActionButtonGroup.js';
import { SpriteContainer } from './SpriteContainer.js';
import { PixiApp } from './PixiApp.js'
import { RoySprite } from './RoySprite.js'
import { DreamSprite } from './DreamSprite.js';
import { Battery } from './Battery.js'
import { StatusIconGroup } from './StatusIconGroup.js'
import { Status } from './Status.js'
import { RockPaperScissorsStatus } from './events/RockPaperScissorsStatus.js'
import { DreamStatus } from './events/DreamStatus.js';
import { PissProgress } from './PissProgress.js'
import { EventCounter } from './EventCounter.js';
import useTamagotchi from '../app/StateContext.js';
import useEvent from '../app/EventContext.js';
import * as constants from '../util/Constants.js'

export const Game = () => {
    const { age, status, love, setSpriteState, isPissing, spriteState, prevAction } = useTamagotchi();
    const {setRockPaperScissors, removeEvent, isEvent, name, data} = useEvent();

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

    let statusLog = <Status />;
    if (isEvent) {
        // eslint-disable-next-line
        switch (name) {
            case "ROCK_PAPER_SCISSORS": {
                statusLog = <RockPaperScissorsStatus />
                break;
            }
            case "DREAM": {
                statusLog = <DreamStatus name="tornado"/>
            }
        }
    }

    const isDream = love >= constants.LOVE_THRESHOLD && prevAction.type !== "DREAM";
    
    return (
        <>
            {!isEvent && <EventCounter />}
            <SpriteContainer>
                {!isEvent && spriteState !== "dreamintro" && <StatusIconGroup />}
                <div className="spriteContainer">
                    <Battery />
                    <PixiApp>
                        {spriteState !== "away" && (!isEvent || name === "ROCK_PAPER_SCISSORS") && <RoySprite key={spriteState} state={spriteState} dream={isDream}/>}
                        {isEvent && name === "DREAM" && <DreamSprite key={data.DREAM.sprite} state={data.DREAM.sprite} />}
                    </PixiApp>
                    {!isEvent && spriteState !== "dreamintro" && <PissProgress />}
                </div>
                {statusLog}
            </SpriteContainer>
            <div className="bottomPanel">
                {isEvent ? <EventActionButtonGroup event={name} /> : <ActionButtonGroup />}
            </div>
        </>
    );

    
}