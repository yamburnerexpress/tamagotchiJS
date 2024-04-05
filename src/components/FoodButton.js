import React from "react";
import useTamagotchi from "../app/StateContext";
import { ActionButton } from "./ActionButton";

export const FoodButton = (props) => {
    const { giveFood } = useTamagotchi();
  
    const handleClick = (food) => {
      props.action(false)
      giveFood(food)
    }
  
    return (
      <ActionButton action={() => handleClick(props.food)} label={`Feed ${props.food.name}`}/>
    )
}