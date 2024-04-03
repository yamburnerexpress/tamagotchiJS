import React from "react";
import useTamagotchi from "../app/StateContext";

export const FoodButton = (props) => {
    const { giveFood } = useTamagotchi();
  
    const handleClick = (food) => {
      giveFood(food)
    }
  
    return (
      <button key={props.food.id} onClick={() => handleClick(props.food)}>Feed {props.food.name}</button>
    )
}