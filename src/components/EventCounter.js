import { useEffect } from "react";
import useTamagotchi from "../app/StateContext";
import { useInterval } from "../hooks/UseInterval";

export const EventCounter = () => {
    const { isHere, isBored, isAsleep, tick, setTick, goPlay, setIsBored, prevAction, status } = useTamagotchi();

    useInterval(() => {
        if ((Date.now() - prevAction.time) / 1000 >= 10 && isHere && !isAsleep && !isBored && !status.isSick) {
            setIsBored();
        }
        if (isBored) {
            setTick(tick);
        }
    }, 1000)

    useEffect(() => {
        if (Math.random() * tick > 5) {
            return goPlay()
        }
    }, [goPlay, tick])

    return false;
}