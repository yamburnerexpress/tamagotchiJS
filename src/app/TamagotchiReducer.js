import getFood from '../util/getFood';
import getStatusById from '../util/getStatus';
import * as consumables from '../data/consumables.json'

export const initialState = {
    "name": "Roy",
    "age": 0,
    "hp": 100,
    "hunger": 0,
    "tiredness": 0,
    "anger": 0,
    "love": 0,
    "status": getStatusById(1),
    "isFeed": false,
    "isMedicine": false,
    "messages": []
}
  
const TamagotchiReducer = (state, action) => {
    const { type, payload } = action;
  
    switch (type) {
        case 'GIVE_FOOD': {
            console.log("GIVE_FOOD", payload)
  
            return {
                ...state,
                age: payload.age,
                hp: payload.hp,
                hunger: payload.hunger,
                status: payload.status,
                isFeed: payload.isFeed,
                messages: payload.messages
            };  
        }
        case 'GIVE_MEDICINE': {
            console.log("GIVE_MEDICINE", payload)

            return {
                ...state,
                age: payload.age,
                hp: payload.hp,
                status: payload.status,
                isFeed: payload.isMedicine,
                messages: payload.messages
            }
        }
        case 'GET_STATUS': {
            console.log("GET_STATUS", payload)

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