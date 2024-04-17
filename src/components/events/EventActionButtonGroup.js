import React, {useState} from "react";
import useEvent from "../../app/EventContext.js";
import useTamagotchi from "../../app/StateContext.js";
import { ActionButton } from "../ActionButton.js";
import "../../css/ActionButton.css"

export const EventActionButtonGroup = (props) => {
    const {setSpriteState, setPrevAction, setMessages} = useTamagotchi()
    const {resetEventData, playRPSTurn} = useEvent()
    const [disabled, setDisabled] = useState(false)

    if (props.event === "ROCK_PAPER_SCISSORS") {
        const handleClick = (selection) => {
            setDisabled(true);
            playRPSTurn(selection);
        }

        return (
            <div className='actions'>
                <ActionButton key='ROCK' action={() => handleClick('ROCK')} label='Rock' disabled={disabled} />
                <ActionButton key='PAPER' action={() => handleClick('PAPER')} label='Paper' disabled={disabled} />
                <ActionButton key='SCISSORS' action={() => handleClick('SCISSORS')} label='Scissors' disabled={disabled} />
            </div>
        )
    } else if (props.event === "DREAM") {
        const handleClick = () => {
            setSpriteState('sleep')
            setPrevAction('DREAM')
            setMessages()
            resetEventData()
        }
        return (
            <div className='actions'>
                <ActionButton key='SKIP' action={() => handleClick()} label='Skip' />
            </div>
        )
    }
}