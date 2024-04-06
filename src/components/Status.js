import React from "react";
import useTamagotchi from "../app/StateContext";
import "../css/display.css"

export const Status = () => {
    const { messages } = useTamagotchi();

    return (
      <div id='messages' className="messageContainer">
          <ul className="statusLog">
              {messages.map((msg, index) => (
                  <li key={index + 1}>{msg}</li>
              ))}
          </ul>
      </div>
    )
}