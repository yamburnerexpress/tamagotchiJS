import React from "react";
import useTamagotchi from "../app/StateContext";

export const DoSleepButton = () => {
    const { name, doSleep } = useTamagotchi();

    return (
        <button onClick={() => doSleep()}>Put {name} Down for a Nap</button>
    )
}