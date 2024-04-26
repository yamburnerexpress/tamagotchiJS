import React, { useState, useEffect } from 'react';
import { ActionButtonGroup } from './ActionButtonGroup.js';
import { SpriteContainer } from './SpriteContainer.js';
import { PixiApp } from './PixiApp.js'
import { RoySprite } from './RoySprite.js'
import { Battery } from './Battery.js'
import { StatusIconGroup } from './StatusIconGroup.js'
import { Status } from './Status.js'
import { Dream } from './events/Dream.js';
import { RockPaperScissors } from './events/RockPaperScissors.js';
import { TicTacToe } from './events/TicTacToe.js';
import { Simon } from './events/Simon.js';
import { PissProgress } from './PissProgress.js'
import { EventCounter } from './EventCounter.js';
import useTamagotchi from '../app/StateContext.js';
import useEvent from '../app/EventContext.js';
import * as constants from '../util/Constants.js'

export const Game = () => {
  const { age, status, love, setSpriteState, isPissing, spriteState, prevAction } = useTamagotchi();
  const {setRockPaperScissors, setTicTacToe, setSimon, removeEvent, isEvent, name} = useEvent();
  const [isDream, setIsDream] = useState(false)

  useEffect(() => {
    if (age !== 0 && age % 10 === 0) {
      if (!status.isSick && !isPissing) {
        const chance = Math.random()
        if (chance < 0.33) {
          setSpriteState('base')
          setRockPaperScissors();
        } else if ((0.33 <= chance) && (chance < 0.66) ) {
          setTicTacToe()
        } else {
          setSimon()
        }
      }
    } else {
      removeEvent()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [age])

  // useEffect(() => {
  //   if (age !== 0 && age === 1) {
  //     if (!status.isSick && !isPissing) {
  //       if (Math.random() < 0.5) {
  //         setSimon()
  //       } else {
  //         setSimon()
  //       }
  //     }
  //   } else {
  //     removeEvent()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [age])

  useEffect(() => {
    if (love >= constants.LOVE_THRESHOLD && prevAction.type !== "DREAM") {
      setIsDream(true)
    }
  }, [love, prevAction, setIsDream])

  if (isEvent) {
    return (
      <React.Fragment>
        {name === "TIC_TAC_TOE" && <TicTacToe />}
        {name === "ROCK_PAPER_SCISSORS" && <RockPaperScissors />}
        {name === "DREAM" && <Dream />}
        {name === "SIMON" && <Simon />}
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <EventCounter />
        <SpriteContainer>
          {spriteState !== "dreamintro" && <StatusIconGroup />}
          <div className="spriteContainer">
            <Battery />
            <PixiApp>
              {spriteState !== "away" && <RoySprite key={spriteState} state={spriteState} dream={isDream}/>}
            </PixiApp>
            {spriteState !== "dreamintro" && <PissProgress />}
          </div>
          <Status />
        </SpriteContainer>
        <div className="bottomPanel">
          <ActionButtonGroup />
        </div>
      </React.Fragment>
    )
  }
}