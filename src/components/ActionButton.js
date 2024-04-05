import React from "react";

export const ActionButton = (props) => {
    const handleClick = () => {
        props.action()
    }
    return (
        <button 
            className='actionButton' 
            onClick={handleClick}
        >
            {props.label}
        </button>
    )
}