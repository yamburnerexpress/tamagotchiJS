import React, { useState } from "react";
import useEvent from "../../app/EventContext";
import useTamagotchi from "../../app/StateContext";
import { StatusLogWrapper } from "../StatusLogWrapper";
import { useInterval } from "../../hooks/UseInterval";
import "../../css/display.css"

export const DreamStatus = () => {
    const {setSpriteState, setPrevAction, setMessages} = useTamagotchi()
    const {data, nextDreamFrame, resetEventData} = useEvent()
    const [messageIndex, setMessageIndex] = useState(0)

    const getNextMessage = () => {
        if (messageIndex === data.DREAM.messages.length - 1) {
            if (data.DREAM.isFinal) {
                setSpriteState('dreamoutro')
                setPrevAction('DREAM')
                setMessages()
                resetEventData()
                setTimeout(() => {
                    setSpriteState('sleep')
                }, 3000)
            } else {
                nextDreamFrame()
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
        <StatusLogWrapper>
            {/* {data.DREAM.messages.map((msg, index) => (
                <li key={index + 1}>{msg}</li>
            ))} */}
            <li key={data.DREAM.messages[messageIndex]}>{data.DREAM.messages[messageIndex]}</li>
        </StatusLogWrapper>
    )
}