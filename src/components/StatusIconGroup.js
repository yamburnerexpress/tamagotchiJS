import React from "react";
import '../css/display.css'
import useTamagotchi from "../app/StateContext";
import { Icon } from "./Icon";
import * as constants from '../util/Constants';

export const StatusIconGroup = () => {
    const {status, hp, isBored, isAsleep, love, tolerance, tiredness} = useTamagotchi();

    const getBattery = () => {
        if (isAsleep) {
            return <Icon status="charging_battery" title="Resoring Energy"/>;
        } else {
            if (constants.TIREDNESS_THRESHOLD_1 <= tiredness && tiredness < constants.TIREDNESS_THRESHOLD_2) {
                return <Icon status="med_battery" title="Getting Sleepy" />;
            } else if (tiredness >= constants.TIREDNESS_THRESHOLD_2) {
                return <Icon status="low_battery" title="Getting Very Sleepy" />;
            } else {
                return <Icon status="full_battery" title="Full Energy" />;
            }
        }
    }

    return (
        <div className="statusIconGroup">
            {getBattery()}
            {isAsleep && <Icon status="asleep" title="Asleep" />}
            {hp <= constants.HP_THRESHOLD_1 && <Icon status="hurt" title="Hurt"/>}
            {status.isSick && <Icon status="sick" title="Sick" />}
            {isBored && <Icon status="bored" title="Bored"/>}
            {love >= constants.LOVE_THRESHOLD && <Icon status="love" title="In Love" />}
            {tolerance >= constants.TOLERANCE_THRESHOLD && <Icon status="annoyed" title="Annoyed" />}
        </div>
    )
}