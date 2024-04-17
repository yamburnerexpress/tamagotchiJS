import { useEffect } from "react";
import useTamagotchi from "../app/StateContext";
import { useInterval } from "../hooks/useInterval";

export const EventCounter = () => {
    const { isHere, isBored, isAsleep, tick, piss, isPissing, setTick, goPlay, setIsBored, prevAction, status, setHasToPiss } = useTamagotchi();

    useInterval(() => {
        if ((Date.now() - prevAction.time) / 1000 >= 10 && isHere && !isAsleep && !isBored && !status.isSick && !isPissing) {
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

    useEffect(() => {
        if (isHere && !isAsleep && !isBored && piss === 100) {
            setHasToPiss()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [piss])

    return false;
}