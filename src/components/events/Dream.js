import React, { useState } from "react";
import useEvent from "../../app/EventContext";
import useTamagotchi from "../../app/StateContext";
import { SpriteContainer } from "../SpriteContainer";
import { PixiApp } from "../PixiApp";
import { DreamSprite } from "../DreamSprite";
import { Battery } from "../Battery";
import { Typewriter } from "../Typewriter";
import { StatusLogWrapper } from "../StatusLogWrapper";
import { EventActionButtonGroup } from "./EventActionButtonGroup";
import { useInterval } from "../../hooks/useInterval";
import "../../css/display.css"

export const Dream = () => {
  const {setSpriteState, setPrevAction, setMessages} = useTamagotchi();
  const event = useEvent();
  const [messageIndex, setMessageIndex] = useState(0);

  const getNextMessage = () => {
    if (messageIndex === event.data.DREAM.messages.length - 1) {
      if (event.data.DREAM.isFinal) {
        setSpriteState('dreamoutro')
        setPrevAction('DREAM')
        setMessages()
        event.resetEventData()
        setTimeout(() => {
          setSpriteState('sleep')
        }, 3000)
      } else {
        event.nextDreamFrame()
        setMessageIndex(0)
      }
        
    } else {
      setMessageIndex(messageIndex + 1)
    }
  }

  useInterval(() => {
    getNextMessage()
  }, 3000)

  return (
    <React.Fragment>
        <SpriteContainer>
          <div className="spriteContainer">
            <Battery />
            <PixiApp>
              <DreamSprite key={event.data.DREAM.sprite} dream={event.data.DREAM.name} state={event.data.DREAM.sprite} />
            </PixiApp>
          </div>
          <StatusLogWrapper>
            <Typewriter key={event.data.DREAM.messages[messageIndex]} text={event.data.DREAM.messages[messageIndex]}/>
          </StatusLogWrapper>
        </SpriteContainer>
        <div className="bottomPanel">
          <EventActionButtonGroup event={event.name} />
        </div>
      </React.Fragment>
  )
}