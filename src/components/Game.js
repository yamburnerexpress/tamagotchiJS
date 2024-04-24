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
import { DreamStatus } from './events/DreamStatus.js';
import { RockPaperScissors } from './events/RockPaperScissors.js';
import { TicTacToe } from './events/TicTacToe.js';
import { PissProgress } from './PissProgress.js'
import { EventCounter } from './EventCounter.js';
import useTamagotchi from '../app/StateContext.js';
import useEvent from '../app/EventContext.js';
import * as constants from '../util/Constants.js'

export const Game = () => {
  const { age, status, love, setSpriteState, isPissing, spriteState, prevAction } = useTamagotchi();
  const {setRockPaperScissors, setTicTacToe, removeEvent, isEvent, name, data} = useEvent();

  useEffect(() => {
    if (age !== 0 && age % 10 === 0) {
      if (!status.isSick && !isPissing) {
        if (Math.random() < 0.5) {
          setSpriteState('base')
          setRockPaperScissors();
        } else {
          setTicTacToe()
        }
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
      case "DREAM": {
        statusLog = <DreamStatus name={data.DREAM.name}/>
      }
    }
  }

  const isDream = love >= constants.LOVE_THRESHOLD && prevAction.type !== "DREAM";
  
  if (isEvent && name === "TIC_TAC_TOE") {
      return <TicTacToe />
  } else if (isEvent && name === "ROCK_PAPER_SCISSORS") {
      return <RockPaperScissors />
  } else {
    return (
      <React.Fragment>
        {!isEvent && <EventCounter />}
        <SpriteContainer>
          {!isEvent && spriteState !== "dreamintro" && <StatusIconGroup />}
          <div className="spriteContainer">
            <Battery />
            <PixiApp>
              {spriteState !== "away" && <RoySprite key={spriteState} state={spriteState} dream={isDream}/>}
              {isEvent && name === "DREAM" && <DreamSprite key={data.DREAM.sprite} dream={data.DREAM.name} state={data.DREAM.sprite} />}
            </PixiApp>
            {!isEvent && spriteState !== "dreamintro" && <PissProgress />}
          </div>
          {statusLog}
        </SpriteContainer>
        <div className="bottomPanel">
          {isEvent ? <EventActionButtonGroup event={name} /> : <ActionButtonGroup />}
        </div>
      </React.Fragment>
    )
  };

  
}