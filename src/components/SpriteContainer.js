import React from "react";
import '../css/display.css'
import { Status } from "./Status";
import {StatusIconGroup} from "./StatusIconGroup"
import { Battery } from "./Battery";
import {PixiApp} from "./PixiApp"
// import { Stage, Sprite, Container } from "@pixi/react";

export const SpriteContainer = () => {
    return (
        <div className="topPanelContainer">
            <div className="topPanel">
                <StatusIconGroup />
                <div className="spriteContainer">
                    <Battery />
                    <PixiApp />
                </div>
                <Status />
            </div>
        </div>
    )
}