import React from "react";
import '../css/display.css'
import useTamagotchi from "../app/StateContext";
import { Icon } from "./Icon";
import * as constants from '../util/Constants';

export const StatusIconGroup = () => {
    const { status, hp, isBored, isAsleep, love, tolerance } = useTamagotchi();

    return (
        <div className="statusIconGroup">
            {isAsleep && <Icon status="asleep" title="Asleep" />}
            {hp <= constants.HP_THRESHOLD_1 && <Icon status="hurt" title="Hurt"/>}
            {status.isSick && <Icon status="sick" title="Sick" />}
            {isBored && <Icon status="bored" title="Bored"/>}
            {love >= constants.LOVE_THRESHOLD && <Icon status="love" title="In Love" />}
            {tolerance >= constants.TOLERANCE_THRESHOLD && <Icon status="annoyed" title="Annoyed" />}
        </div>
    )
}