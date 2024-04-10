import React, {useState} from "react";
import useEvent from "../../app/EventContext.js";
import { ActionButton } from "../ActionButton.js";
import "../../css/ActionButton.css"

export const EventActionButtonGroup = (props) => {
    const {playRPSTurn} = useEvent();
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
    }
}