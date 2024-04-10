import React from "react";
import '../css/display.css'
import { Status } from "./Status";
import { EventStatus } from "./events/EventStatus";
import {StatusIconGroup} from "./StatusIconGroup"
import { Battery } from "./Battery";
import {PixiApp} from "./PixiApp"
// import {useEvent} from "../app/EventContext"

export const SpriteContainer = (props) => {
    return (
        <div className="topPanelContainer">
            <div className="topPanel">
                {!props.event && <StatusIconGroup />}
                <div className="spriteContainer">
                    <Battery />
                    <PixiApp />
                </div>
                {!props.event && <Status />}
                {props.event && <EventStatus />}
            </div>
        </div>
    )
}