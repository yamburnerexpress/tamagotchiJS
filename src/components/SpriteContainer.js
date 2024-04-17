import React from "react";
import '../css/display.css'

export const SpriteContainer = ({children}) => {

    return (
        <div className="topPanelContainer">
            <div className="topPanel">
                {children}
            </div>
        </div>
    )
}