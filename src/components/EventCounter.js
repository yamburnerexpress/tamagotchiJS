import React, { useRef, useEffect } from "react";
import useTamagotchi from "../app/StateContext";

export const EventCounter = () => {
    const { event, tick, setTick, removeTick, setEvent, isBored, setIsBored, prevAction } = useTamagotchi();

    console.log(prevAction)
  
    const useInterval = (callback, delay) => {
        const savedCallback = useRef();

        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay != null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay])
    }

    console.log(Date.now() - prevAction.time)

    useInterval(() => {
        console.log(event)
        console.log(tick)
        if ((Date.now() - prevAction.time) / 1000 >= 10) {
            setTick(tick);
        }
    }, 1000);

    useEffect(() => {
        if (Math.random() * tick > 20) {
            return setEvent()
        }
    }, [setEvent, tick])

    return (event.isEvent ? <div><span>{event.eventId}</span></div> : false);
}