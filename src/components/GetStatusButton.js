import React from "react";
import useTamagotchi from "../app/StateContext";

export const GetStatusButton = () => {
    const { name, getStatusMessages } = useTamagotchi();

    return (
      <button onClick={() => getStatusMessages()}>Get {name}'s Status</button>
    )
}