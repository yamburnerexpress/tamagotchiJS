import React from "react";
import useTamagotchi from "../app/StateContext";

export const GiveEntertainButton = (props) => {
    const { name, doPet } = useTamagotchi();

    switch (props.action) {
      case ("pet"):
        return (
          <button onClick={() => doPet()}>Pet {name}</button>
        )
    }
}