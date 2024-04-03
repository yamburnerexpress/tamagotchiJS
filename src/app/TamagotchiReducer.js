import getStatusById from '../util/getStatus';
import * as constants from '../util/Constants';

export const initialState = {
    "name": "Roy",
    "age": 0,
    "tolerance": 0,
    "hp": 100,
    "hunger": 0,
    "tiredness": 0,
    "anger": 0,
    "love": 0,
    "status": getStatusById(1),
    "isFeed": false,
    "isMedicine": false,
    "isAsleep": false,
    "prevAction": "",
    "messages": []
}
  
const TamagotchiReducer = (state, action) => {
    const { type, payload } = action;

    const incrementAge = () => {
        return state.age + 1;
    }

    const incrementTolerance = (action) => {
        console.log(state.tolerance);
        if (state.prevAction === action) {
            return Math.min(state.tolerance + 20, constants.MAX_TOLERANCE);
        } else {
            return 0;
        }
    }
  
    switch (type) {
        case 'GIVE_FOOD': {
            console.log("GIVE_FOOD", payload)
  
            return {
                ...state,
                age: incrementAge(),
                hp: payload.hp,
                tolerance: incrementTolerance(type),
                hunger: payload.hunger,
                status: payload.status,
                isFeed: false,
                prevAction: type,
                messages: payload.messages
            };  
        }
        case 'GIVE_MEDICINE': {
            console.log("GIVE_MEDICINE", payload)

            return {
                ...state,
                age: incrementAge(),
                hp: payload.hp,
                status: payload.status,
                isFeed: false,
                prevAction: type,
                messages: payload.messages
            }
        }
        case 'GIVE_ENTERTAIN': {
            console.log("GIVE_ENTERTAIN", payload)

            return {
                ...state,
                age: incrementAge(),
                tolerance: incrementTolerance(type),
                tiredness: payload.tiredness,
                love: payload.love,
                prevAction: type,
                messages: payload.messages
            }
        }
        case 'DO_SLEEP': {
            console.log("DO_SLEEP", payload)

            return {
                ...state,
                age: incrementAge(),
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
        default:
            throw new Error(`No case for type ${type} found in TamagotchiReducer.`);
    }
}

export default TamagotchiReducer;