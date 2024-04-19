import React, { useState } from "react";
import useEvent from "../../app/EventContext";
import useTamagotchi from "../../app/StateContext";
import { StatusLogWrapper } from "../StatusLogWrapper";
import { useInterval } from "../../hooks/useInterval";
import "../../css/display.css"

export const RockPaperScissorsStatus = () => {
    const {name, setPlayedGame, setSpriteState} = useTamagotchi()
    const {data, resetEventData} = useEvent()
    const [message, setMessage] = useState(`${name} wants to play Rock, Paper, Scissors!`)
    const [messageIndex, setMessageIndex] = useState(0)

    const getResultMessage = () => {
        switch (data.ROCK_PAPER_SCISSORS.winState) {
            case ("DRAW"):
                return "It's a draw!"
            case ("WIN"):
                return "You win!"
            case ("LOSE"):
                return "You lose!"
            default:
        }
    }

    const messages = ['3...', '2...', '1...', getResultMessage() ]

    useInterval(() => {
        if (data.ROCK_PAPER_SCISSORS.hasPlayed) {
            if (messageIndex < messages.length) {
                setMessage(messages[messageIndex])
                if (messageIndex === messages.length - 1) {
                    setSpriteState(data.ROCK_PAPER_SCISSORS.opponentSelect)
                }
            } else if (messageIndex < messages.length) {

            }
            setMessageIndex(Math.min(messageIndex + 1))
            if (messageIndex >= messages.length + 2) {
                setPlayedGame()
                resetEventData()
                setSpriteState('base')
            }
        }
    }, 1000)

    return (
        <StatusLogWrapper>
            {data.ROCK_PAPER_SCISSORS.playerSelect && <li key={data.ROCK_PAPER_SCISSORS.playerSelect}>You chose {data.ROCK_PAPER_SCISSORS.playerSelect}!</li>}
            <li key={message}>{message}</li>
        </StatusLogWrapper>
    )
}