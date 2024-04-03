import React, { createContext, useReducer, useContext, useEffect } from 'react'; 
import TamagotchiReducer, { initialState } from './TamagotchiReducer';
import getStatusById from '../util/getStatus';
import getFood from '../util/getFood';

export const StateContext = createContext(initialState);

export const TamagotchiProvider = ({ children }) => { 
    const [state, dispatch] = useReducer(TamagotchiReducer, initialState);

    const incrementAge = () => {
        return state.age + 1;
    }

    const giveFood = (food) => {
        const messages = [`${state.name} ate some ${food.name}!`]
  
        const status = () => {
            let newStatus = getStatusById(food.status.id)
            if (newStatus.severity > state.status.severity) {
                messages.push(`${state.name} is feeling ${newStatus.name}!`)
                return newStatus
            } else {
                return state.status
            }
        }

        dispatch({
            type: "GIVE_FOOD",
            payload: {
                age: incrementAge(),
                hp: Math.min(state.hp + food.hp, initialState.hp),
                hunger: Math.max(state.hunger - food.hunger, initialState.hunger),
                status: status(),
                isFeed: false,
                messages: messages
            }
        })
    }

    const giveMedicine = () => {
        dispatch({
            type: "GIVE_MEDICINE",
            payload: {
                age: incrementAge(),
                hp: Math.min(state.hp + 50, initialState.hp),
                status: getStatusById(1),
                isFeed: false,
                messages: [`${state.name} is feeling all better!`]
            }
        })
    }

    const getHpMessage = () => {
        let hp = state.hp;
        if (25 < hp && hp <= 50) {
            return [true, `${state.name} is hurt!`];
        } else if (hp <= 25) {
            return [true, `${state.name} is really hurt!!`];
        } else {
            return [false, null];
        }
    }

    const getTiredMessage = () => {
        let tiredness = state.tiredness;
        if (50 <= tiredness && tiredness < 80) {
            return [true, `${state.name} is sleepy!`];
        } else if (tiredness >= 80) {
            return [true, `${state.name} is really sleepy!!`];
        } else {
            return [false, null];
        }
    }

    const getStatusMessages = () => {
        const [isHurt, hpMessage] = getHpMessage();
        const [isTired, tiredMessage] = getTiredMessage();

        const newMessages = [
            `${state.name} is feeling ${state.status.name}!`,
            ...(isHurt ? [hpMessage] : []),
            ...(isTired ? [tiredMessage] : [])
        ]

        dispatch({
            type: "GET_STATUS",
            payload: {
                messages: newMessages
            }
        })
    }

    const setIsFeed = () => {
        dispatch({
            type: "SET_IS_FEED",
            payload: {
                isFeed: true
            }
        })
    }

    const setIsMedicine = () => {
        dispatch({
            type: "SET_IS_MEDICINE",
            payload: {
                isMedicine: true
            }
        })
    }

    const value = {
        name: state.name,
        age: state.age,
        hp: state.hp,
        hunger: state.hunger,
        tiredness: state.tiredness,
        anger: state.anger,
        love: state.love,
        status: state.status,
        isFeed: state.isFeed,
        isMedicine: state.isMedicine,
        messages: state.messages,
        giveFood,
        giveMedicine,
        getStatusMessages,
        setIsFeed,
        setIsMedicine
    }

    return ( 
        <StateContext.Provider value={value}> 
            {children}
        </StateContext.Provider> 
    ); 
};

const useTamagotchi = () => {
    const context = useContext(StateContext)

    if (context === undefined) {
        throw new Error("useTamagotchi must be used within StateContext")
    }

    return context
}

export default useTamagotchi