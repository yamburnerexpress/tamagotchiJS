import React from "react";
import useTamagotchi from "../app/StateContext";

export const Status = () => {
    const { messages } = useTamagotchi();

    return (
      <div id='messages'>
          <ul>
              {messages.map((msg, index) => (
                  <li key={index + 1}>{msg}</li>
              ))}
          </ul>
      </div>
    )
}