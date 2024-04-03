import React from "react";
import useTamagotchi from "../app/StateContext";

export const WakeUpButton = () => {
    const { name, wakeUp } = useTamagotchi();

    return (
        <button onClick={() => wakeUp()}>Wake {name} Up</button>
    )
}