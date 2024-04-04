import getStatusById from '../util/getStatus';
import * as constants from '../util/Constants';

export const initialState = {
    name: "Roy",
    age: 0,
    tick: 0,
    event: {
        isEvent: false,
        eventId: 0
    },
    isBored: false,
    timeSick: 0,
    tolerance: 0,
    hp: 100,
    hunger: 0,
    tiredness: 0,
    anger: 0,
    love: 0,
    status: getStatusById(1),
    isFeed: false,
    isMedicine: false,
    isAsleep: false,
    prevAction: {
        type: "",
        time: Date.now()
    },
    messages: []
}
  
const TamagotchiReducer = (state, action) => {
    const { type, payload } = action;

    const incrementTolerance = (action) => {
        console.log(state.tolerance);
        if (state.prevAction.type === action) {
            return Math.min(state.tolerance + 20, constants.MAX_TOLERANCE);
        } else {
            return 0;
        }
    }

    const setPrevAction = (type) => ({type: type, time: Date.now()})
  
    switch (type) {
        case 'GIVE_FOOD': {
            console.log("GIVE_FOOD", payload)
  
            return {
                ...state,
                hp: payload.hp,
                tolerance: incrementTolerance(type),
                hunger: payload.hunger,
                status: payload.status,
                isFeed: false,
                prevAction: setPrevAction(type),
                messages: payload.messages
            };  
        }
        case 'GIVE_MEDICINE': {
            console.log("GIVE_MEDICINE", payload)

            return {
                ...state,
                timeSick: 0,
                hp: payload.hp,
                status: payload.status,
                isFeed: false,
                prevAction: setPrevAction(type),
                messages: payload.messages
            }
        }
        case 'DO_PET': {
            console.log("DO_PET", payload)

            return {
                ...state,
                tolerance: incrementTolerance(type),
                tiredness: payload.tiredness,
                love: payload.love,
                prevAction: setPrevAction(type),
                messages: payload.messages
            }
        }
        case 'DO_SLEEP': {
            console.log("DO_SLEEP", payload)

            return {
                ...state,
                tiredness: payload.tiredness,
                tolerance: payload.tolerance,
                isAsleep: true,
                messages: payload.messages
            }
        }
        case 'DO_WAKE': {
            return {
                ...state,
                isAsleep: false,
                messages: []
            }
        }
        case 'GET_STATUS': {
            console.log("GET_STATUS", payload)
            console.log(state);

            return {
                ...state,
                messages: payload.messages
            }
        }
        case 'SET_IS_FEED': {
            return {
                ...state,
                isFeed: payload.isFeed
            }
        }
        case 'SET_IS_MEDICINE': {
            return {
                ...state,
                isMedicine: payload.isMedicine
            }
        }
        case 'INCREMENT_AGE': {
            console.log("INCREMENT_AGE", state.status.isSick)
            if (state.status.isSick) {
                return {
                    ...state,
                    age: state.age + 1,
                    timeSick: state.timeSick + 1,
                    hp: Math.max(state.hp - state.status.effect.hp, 0),
                    tiredness: Math.min(state.tiredness + state.status.effect.tiredness, constants.MAX_TIREDNESS)
                } 
            } else {
                return {
                    ...state,
                    age: state.age + 1
                }
            }
        }
        case 'SET_TICK': {
            return {
                ...state,
                tick: state.tick + 1
            }
        }
        case 'REMOVE_TICK': {
            return {
                ...state,
                tick: 0
            }
        }
        case 'SET_EVENT': {
            return {
                ...state,
                event: {
                    isEvent: true,
                    eventId: 1
                }
            }
        }
        case 'REMOVE_EVENT': {
            return {
                ...state,
                event: {
                    isEvent: false,
                    eventId: 0
                }
            }
        }
        case 'SET_IS_BORED': {
            return {
                ...state,
                isBored: true
            }
        }
        case 'REMOVE_IS_BORED': {
            return {
                ...state,
                isBored: false
            }
        }
        default:
            throw new Error(`No case for type ${type} found in TamagotchiReducer.`);
    }
}

export default TamagotchiReducer;