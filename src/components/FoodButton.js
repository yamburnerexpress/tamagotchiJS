import React from "react";
import useTamagotchi from "../app/StateContext";
import { ActionButton } from "./ActionButton";

export const FoodButton = (props) => {
    const { giveFood, resetSpriteState } = useTamagotchi();
  
    const handleClick = (food) => {
      props.action(false)
      giveFood(food)
      setTimeout(() => {
        resetSpriteState()
      }, 3000)
    }
  
    return (
      <ActionButton action={() => handleClick(props.food)} label={`Feed ${props.food.name}`}/>
    )
}