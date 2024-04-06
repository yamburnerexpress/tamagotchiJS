import React from "react";
import '../css/display.css'
import useTamagotchi from "../app/StateContext";
import { Icon } from "./Icon";
import * as constants from '../util/Constants';

export const StatusIconGroup = () => {
    const {status, isBored, isAsleep, love, tolerance} = useTamagotchi();

    return (
        <div className="statusIconGroup">
            {status.isSick && <Icon status="sick" />}
            {isBored && <Icon status="bored" />}
            {isAsleep && <Icon status="asleep"/>}
            {love >= constants.LOVE_THRESHOLD && <Icon status="love"/>}
            {tolerance >= constants.TOLERANCE_THRESHOLD && <Icon status="annoyed"/>}
        </div>
    )
}