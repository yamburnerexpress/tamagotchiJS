import React from "react";
import useTamagotchi from "../app/StateContext";

export const GiveFoodButton = () => {
    const { name, setIsFeed } = useTamagotchi();

    return (
      <button onClick={() => setIsFeed()}>Give {name} Food</button>
    )
}