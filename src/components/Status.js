import React from "react";
import useTamagotchi from "../app/StateContext";
import * as constants from '../util/Constants';
import "../css/display.css"

export const Status = () => {
    const { name, messages, tolerance, tiredness, love, prevAction } = useTamagotchi();

    const getAnnoyedMessage = () => {
        if (tolerance >= constants.TOLERANCE_THRESHOLD) {
            return [true, `${name} is annoyed!`]
        } else {
            return [false, null]
        }
    }

    const getTiredMessage = () => {
        if (constants.TIREDNESS_THRESHOLD_1 <= tiredness && tiredness < constants.TIREDNESS_THRESHOLD_2) {
            return [true, `${name} is sleepy!`];
        } else if (tiredness >= constants.TIREDNESS_THRESHOLD_2) {
            return [true, `${name} is really sleepy!!`];
        } else {
            return [false, null];
        }
    }

    const getLoveMessage = () => {
        if (love >= constants.LOVE_THRESHOLD) {
            return [true, `${name} loves you!`];
        } else {
            return [false, null];
        }
    }

    const updatedMessages = () => {
        switch (prevAction.type) {
            case "DO_PET": {
                const [isTired, tiredMessage] = getTiredMessage();
                const [isLove, loveMessage] = getLoveMessage();
                const [isAnnoyed, annoyedMessage] = getAnnoyedMessage();

                return [
                    ...(isAnnoyed ? [annoyedMessage] : [`${name} liked getting pets!`]),
                    ...(isLove && !isAnnoyed ? [loveMessage] : []),
                    ...(isTired ? [tiredMessage] : [])
                ];
            }
            case "DO_PLAY_WITH_TOY": {
                const [isTired, tiredMessage] = getTiredMessage();
                const [isLove, loveMessage] = getLoveMessage();
                const [isAnnoyed, annoyedMessage] = getAnnoyedMessage();

                return [
                    `You threw the ${prevAction.payload.toyName}!`,
                    ...(isAnnoyed ? [annoyedMessage] : []),
                    ...(prevAction.payload.lostToy 
                        ? [`${name} couldn't find the ${prevAction.payload.toyName}`] 
                        : [`${name} brought the ${prevAction.payload.toyName} back!`]
                    ),
                    ...(isLove ? [loveMessage] : []),
                    ...(isTired ? [tiredMessage] : [])
                ];
            }
            default: {
                return messages
            }
        }
    }

    return (
      <div id='messages' className="messageContainer">
          <ul className="statusLog">
              {updatedMessages().map((msg, index) => (
                  <li key={index + 1}>{msg}</li>
              ))}
          </ul>
      </div>
    )
}