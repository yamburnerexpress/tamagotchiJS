import React, { createContext, useReducer, useContext } from 'react';
import dreams from '../data/dreams.json'

const initialState = {
    isEvent: false,
    name: null,
    data: {
        ROCK_PAPER_SCISSORS: {
            hasPlayed: false,
            playerSelect: null,
            opponentSelect: null,
            winState: null
        },
        DREAM: {
            name: null,
            hasPlayed: false,
            frame: 0,
            isFinal: false,
            sprite: null,
            messages: []
        }
    }
}

const EventReducer = (state, action) => {
    const { type, payload={} } = action;

    switch(type) {
        case "SET_EVENT": {
            return {
                ...state,
                isEvent: true,
                name: payload.name
            }
        }
        case "REMOVE_EVENT": {
            return {
                ...state,
                isEvent: false
            }
        }
        case "PLAY_RPS_TURN": {
            return {
                ...state,
                data: {
                    ...state.data,
                    ROCK_PAPER_SCISSORS: payload.ROCK_PAPER_SCISSORS
                }
            }
        }
        case "RESET_EVENT_DATA": {
            return {
                ...initialState
            }
        }
        case "SET_DREAM": {
            return {
                ...state,
                isEvent: true,
                name: "DREAM",
                data: {
                    ...state.data,
                    DREAM: {
                        hasPlayed: true,
                        ...payload.DREAM
                    }
                }
            }
        }
        default:
            throw new Error(`No case for type ${type} found in EventReducer.`);
    }
}

export const EventContext = createContext(initialState);

export const EventProvider = ({ children }) => {
    const [state, dispatch] = useReducer(EventReducer, initialState);

    const removeEvent = () => {
        dispatch({type: "REMOVE_EVENT"})
    }

    const setRockPaperScissors = () => {
        dispatch({
            type: "SET_EVENT",
            payload: {
                name: "ROCK_PAPER_SCISSORS"
            }
        })
    }

    const playRPSTurn = (playerSelect) => {
        const options = ["ROCK", "PAPER", "SCISSORS"]
        const opponentSelect = options[Math.floor((Math.random() * options.length))]

        const winState = () => {
            if (opponentSelect === playerSelect) {
                return "DRAW"
            } else {
                if (playerSelect === "ROCK") {
                    if (opponentSelect === "PAPER") {
                        return "LOSE"
                    } else if (opponentSelect === "SCISSORS") {
                        return "WIN"
                    }
                } else if (playerSelect === "PAPER") {
                    if (opponentSelect === "SCISSORS") {
                        return "LOSE"
                    } else if (opponentSelect === "ROCK") {
                        return "WIN"
                    }
                } else if (playerSelect === "SCISSORS") {
                    if (opponentSelect === "ROCK") {
                        return "LOSE"
                    } else if (opponentSelect === "PAPER") {
                        return "WIN"
                    }
                }
            }
        }

        dispatch({
            type: "PLAY_RPS_TURN",
            payload: {
                ROCK_PAPER_SCISSORS: {
                    hasPlayed: true,
                    playerSelect: playerSelect,
                    opponentSelect: opponentSelect,
                    winState: winState()
                }
            }
        })
    }

    const getDreamFrameById = (name, frame) => {
        const dreamFrames = dreams[name];
        for (var i = 0; i < dreamFrames.length; i++) {
            if (dreamFrames[i].id === frame) {
                return dreamFrames[i]
            }
        }
    }

    const startDream = (name) => {
        const dreamFrame = getDreamFrameById(name, 1)
        
        dispatch({
            type: "SET_DREAM",
            payload: {
                DREAM: {
                    name: name,
                    frame: 1,
                    sprite: dreamFrame.frame,
                    messages: dreamFrame.messages
                }
            } 
        })
    }

    const nextDreamFrame = () => {
        const newFrame = state.data.DREAM.frame + 1;
        const dreamFrame = getDreamFrameById(state.data.DREAM.name, newFrame)
        const finalFrame = dreams[state.data.DREAM.name].slice(-1)[0]
        
        dispatch({
            type: "SET_DREAM",
            payload: {
                DREAM: {
                    name: state.data.DREAM.name,
                    frame: newFrame,
                    isFinal: dreamFrame.id === finalFrame.id,
                    sprite: dreamFrame.frame,
                    messages: dreamFrame.messages
                }
            } 
        })
    }

    const resetEventData = () => {
        dispatch({type: "RESET_EVENT_DATA"})
    }

    const value = {
        isEvent: state.isEvent,
        name: state.name,
        data: state.data,
        removeEvent,
        setRockPaperScissors,
        playRPSTurn,
        startDream,
        nextDreamFrame,
        resetEventData
    }

    return (
        <EventContext.Provider value={value}>
            {children}
        </EventContext.Provider>
    )
}

const useEvent = () => {
    const context = useContext(EventContext);

    if (context === undefined) {
        throw new Error("useEvent must be used within EventContext")
    }

    return context
}

export default useEvent;
