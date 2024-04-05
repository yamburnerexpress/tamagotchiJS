import React from "react";
import useTamagotchi from "../app/StateContext";

export const Health = () => {
    const { name, hp, age } = useTamagotchi();
  
    return (
      <div id='logGroup'>
        <h2>{name} Health: {hp}</h2>
        <h3>Age: {age}</h3>
      </div>
    )
}