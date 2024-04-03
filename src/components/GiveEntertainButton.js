import React from "react";
import useTamagotchi from "../app/StateContext";

export const GiveEntertainButton = (props) => {
    const { name, givePet } = useTamagotchi();

    switch (props.action) {
      case ("pet"):
        return (
          <button onClick={() => givePet()}>Pet {name}</button>
        )
    }
}