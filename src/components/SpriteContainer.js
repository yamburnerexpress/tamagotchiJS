import React from "react";
import '../css/display.css'
import { Status } from "./Status";

export const SpriteContainer = () => {
    return (
        <div className="spriteContainer">
            <div className="topPanel">
                <div className="statusIcons"></div>
                <div className="sprite"></div>
                <Status />
            </div>
            
        </div>
    )
}