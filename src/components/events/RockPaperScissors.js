import React, {useState, useEffect} from "react";
import { SpriteContainer } from "../SpriteContainer";
import { Battery } from "../Battery";
import { PixiApp } from "../PixiApp";
import { RoySprite } from "../RoySprite";
import { StatusLogWrapper } from "../StatusLogWrapper";
import { ActionButton } from "../ActionButton";
import useEvent from "../../app/EventContext";
import useTamagotchi from "../../app/StateContext";
import { useInterval } from "../../hooks/useInterval";
import "../../css/display.css"

export const RockPaperScissors = () => {
  const {name, spriteState, setPlayedGame, setMessages, setSpriteState} = useTamagotchi();
  const event = useEvent();
  const [message, setMessage] = useState(`${name} wants to play Rock, Paper, Scissors!`);
  const [messageIndex, setMessageIndex] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
        setMounted(true);
    }, 1000)
  }, []);

  const getResultMessage = () => {
    switch (event.data.ROCK_PAPER_SCISSORS.winState) {
      case ("DRAW"):
        return "It's a draw!";
      case ("WIN"):
        return "You win!";
      case ("LOSE"):
        return "You lose!";
      default:
    }
  }

  const messages = ['3...', '2...', '1...'];

  useInterval(() => {
    if (event.data.ROCK_PAPER_SCISSORS.hasPlayed) {
      if (messageIndex < messages.length) {
        setMessage(messages[messageIndex])
        if (messageIndex === messages.length - 1) {
          setSpriteState(event.data.ROCK_PAPER_SCISSORS.opponentSelect)
        }
      } else if (messageIndex < messages.length) {

      }
      setMessageIndex(Math.min(messageIndex + 1))
      if (messageIndex >= messages.length + 2) {
        setPlayedGame()
        event.resetEventData()
        setMessages()
        setSpriteState('base')
      }
    }
  }, 1000)

  const handleClick = (selection) => {
    setDisabled(true);
    if (!disabled) {
      event.playRPSTurn(selection);
    }
  }

  useEffect(() => {
    if (event.data.ROCK_PAPER_SCISSORS.winState) {
      messages.push(getResultMessage())
    }
    // eslint-disable-next-line
  }, [event, messages])

  return (
    <React.Fragment>
      <SpriteContainer>
        <div className="spriteContainer">
          <Battery />
          <PixiApp>
            <RoySprite key={spriteState} state={spriteState} dream={false}/>
          </PixiApp>
        </div>
        <StatusLogWrapper>
          {event.data.ROCK_PAPER_SCISSORS.playerSelect && <li key={event.data.ROCK_PAPER_SCISSORS.playerSelect}>You chose {event.data.ROCK_PAPER_SCISSORS.playerSelect}!</li>}
          <li key={message}>{message}</li>
        </StatusLogWrapper>
      </SpriteContainer>
      <div className="bottomPanel">
        <div className='actions'>
          {mounted && <ActionButton key='ROCK' action={() => handleClick('ROCK')} label='Rock' disabled={disabled} />}
          {mounted && <ActionButton key='PAPER' action={() => handleClick('PAPER')} label='Paper' disabled={disabled} />}
          {mounted && <ActionButton key='SCISSORS' action={() => handleClick('SCISSORS')} label='Scissors' disabled={disabled} />}
        </div>
      </div>
    </React.Fragment>
  )
}