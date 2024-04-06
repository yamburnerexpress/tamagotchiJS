import React from "react";
import '../css/display.css'
import { Status } from "./Status";
import {StatusIconGroup} from "./StatusIconGroup"
import { Battery } from "./Battery";

export const SpriteContainer = () => {
    return (
        <div className="topPanelContainer">
            <div className="topPanel">
                <StatusIconGroup />
                <div className="spriteContainer">
                    <Battery />
                </div>
                <Status />
            </div>
            
        </div>
    )
}