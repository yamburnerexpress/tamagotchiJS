import React from "react";
import "../css/display.css"

export const StatusLogWrapper = ({children}) => {
    
    return (
      <div id='messages' className="messageContainer">
          <ul className="statusLog">
              {children}
          </ul>
      </div>
    )
}