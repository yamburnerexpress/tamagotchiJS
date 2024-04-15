import React from "react";
import '../css/display.css'
import useTamagotchi from "../app/StateContext";

export const PissProgress = () => {
    const {piss} = useTamagotchi();

    return (
        <div className="progressContainer">
            <div className="progressBar" title={`Piss level: ${piss}%`}>
                <div className="progressFiller" style={{ height: `${piss}%`}}></div>
            </div>
        </div>
    )
}