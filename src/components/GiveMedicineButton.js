import React from "react";
import useTamagotchi from "../app/StateContext";

export const GiveMedicineButton = () => {
    const { name, giveMedicine } = useTamagotchi();

    return (
      <button onClick={() => giveMedicine()}>Give {name} Medicine</button>
    )
}