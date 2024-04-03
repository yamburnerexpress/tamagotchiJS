import React from "react";
import useTamagotchi from "../app/StateContext";

export const Health = () => {
    const { hp, age } = useTamagotchi();
  
    return (
      <div id='logGroup'>
        <h2>Health: {hp}</h2>
        <h2>Age: {age}</h2>
      </div>
    )
}