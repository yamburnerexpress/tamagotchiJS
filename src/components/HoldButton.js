import React, {useRef, useEffect} from "react";
import '../css/ActionButton.css';

export const HoldButton = (props) => {
    const intervalRef = useRef(null);

    useEffect(() => {
        return () => stopCounter();
    }, []);

    const startCounter = () => {
        if (intervalRef.current) return;
        intervalRef.current = setInterval(() => {
            props.action()
        }, 50);
    };
    
    const stopCounter = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    return (
        <button 
            className='actionButton' 
            onMouseDown={startCounter}
            onMouseUp={stopCounter}
            onMouseLeave={stopCounter}
        >
            {props.label}
        </button>
    )
}