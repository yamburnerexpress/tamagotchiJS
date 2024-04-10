import React, { useState } from "react";
import useEvent from "../../app/EventContext";
import useTamagotchi from "../../app/StateContext";
import { useInterval } from "../../util/UseInterval";
import "../../css/display.css"

export const EventStatus = () => {
    const {name, setPlayedGame} = useTamagotchi()
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
            }
            setMessageIndex(Math.min(messageIndex + 1))
            if (messageIndex >= messages.length + 2) {
                setPlayedGame()
                resetEventData()
            }
        }
    }, 1000)

    return (
        <div id='messages' className="messageContainer">
            <ul className="statusLog">
                <li key={message}>{message}</li>
            </ul>
        </div>
    )
}