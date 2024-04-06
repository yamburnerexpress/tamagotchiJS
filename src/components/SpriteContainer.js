import React from "react";
import '../css/display.css'
import { Status } from "./Status";
import {StatusIconGroup} from "./StatusIconGroup"

export const SpriteContainer = () => {
    return (
        <div className="spriteContainer">
            <div className="topPanel">
                <StatusIconGroup />
                <div className="sprite"></div>
                <Status />
            </div>
            
        </div>
    )
}