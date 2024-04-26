import React from "react";
import '../css/ActionButton.css';

export const ActionButton = (props) => {
    const handleClick = () => {
        props.action()
    }
    return (
        <button 
            className='roundButton actionButton ripple' 
            onClick={handleClick}
        >
            {props.label}
        </button>
    )
}