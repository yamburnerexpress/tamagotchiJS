import React, { createContext, useReducer, useContext } from 'react'; 
import TamagotchiReducer, { initialState } from './TamagotchiReducer';
import getStatusById from '../util/getStatus';
import * as constants from '../util/Constants';

export const StateContext = createContext(initialState);

export const TamagotchiProvider = ({ children }) => { 
    const [state, dispatch] = useReducer(TamagotchiReducer, initialState);

    const getIsAnnoyed = () => {
        if (state.tolerance >= constants.TOLERANCE_THRESHOLD) {
            return true
        } else {
            return false
        }
    }

    const incrementAge = () => {
        dispatch({type: "INCREMENT_AGE", payload: {}})
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

        incrementAge()

        dispatch({
            type: "GIVE_FOOD",
            payload: {
                hp: Math.min(state.hp + food.hp, constants.MAX_HP),
                hunger: Math.max(state.hunger - food.hunger, initialState.hunger),
                status: status(),
                messages: messages
            }
        })
    }

    const giveMedicine = () => {
        incrementAge()

        dispatch({
            type: "GIVE_MEDICINE",
            payload: {
                hp: Math.min(state.hp + 50, constants.MAX_HP),
                status: getStatusById(1),
                isFeed: false,
                messages: [`${state.name} is feeling all better!`]
            }
        })
    }

    const doPet = () => {
        const [isTired, tiredMessage] = getTiredMessage();
        const [isLove, loveMessage] = getLoveMessage();
        const isAnnoyed = getIsAnnoyed()

        const newMessages = [
            ...(isAnnoyed ? [`${state.name} is annoyed!`] : [`${state.name} liked getting pets!`]),
            ...(isTired ? [tiredMessage] : []),
            ...(isLove ? [loveMessage] : [])
        ]

        if (state.tiredness === constants.MAX_TIREDNESS) {
            doSleep()
        } else {
            incrementAge()

            dispatch({
                type: "DO_PET",
                payload: {
                    tiredness: Math.min(state.tiredness + 10, constants.MAX_TIREDNESS),
                    love: (isAnnoyed ? Math.max(state.love - 5, 0) : Math.min(state.love + 5, constants.MAX_LOVE)),
                    messages: newMessages
                }
            })
        }
    }

    const doSleep = () => {
        incrementAge()

        dispatch({
            type: "DO_SLEEP",
            payload: {
                tiredness: 0,
                tolerance: 0,
                messages: [`${state.name} fell asleep!`]
            }
        })
    }

    const wakeUp = () => {
        incrementAge()
        
        dispatch({
            type: "DO_WAKE",
            payload: {}
        })
    }

    const getHpMessage = () => {
        let hp = state.hp;
        if (constants.HP_THRESHOLD_2 < hp && hp <= constants.HP_THRESHOLD_1) {
            return [true, `${state.name} is hurt!`];
        } else if (hp <= constants.HP_THRESHOLD_2) {
            return [true, `${state.name} is really hurt!!`];
        } else {
            return [false, null];
        }
    }

    const getTiredMessage = () => {
        let tiredness = state.tiredness;
        if (constants.TIREDNESS_THRESHOLD_1 <= tiredness && tiredness < constants.TIREDNESS_THRESHOLD_2) {
            return [true, `${state.name} is sleepy!`];
        } else if (tiredness >= constants.TIREDNESS_THRESHOLD_2) {
            return [true, `${state.name} is really sleepy!!`];
        } else {
            return [false, null];
        }
    }

    const getLoveMessage = () => {
        let love = state.love;
        if (love > constants.LOVE_THRESHOLD) {
            return [true, `${state.name} loves you!`];
        } else {
            return [false, null];
        }
    }

    const getStatusMessages = () => {
        const [isHurt, hpMessage] = getHpMessage();
        const [isTired, tiredMessage] = getTiredMessage();
        const [isLove, loveMessage] = getLoveMessage();
        const isAnnoyed = getIsAnnoyed();

        const newMessages = [
            `${state.name} is feeling ${state.status.name}!`,
            ...(isHurt ? [hpMessage] : []),
            ...(isTired ? [tiredMessage] : []),
            ...(isLove ? [loveMessage] : []),
            ...(isAnnoyed ? [`${state.name} is annoyed!`] : [])
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
        tolerance: state.tolerance,
        hp: state.hp,
        hunger: state.hunger,
        tiredness: state.tiredness,
        anger: state.anger,
        love: state.love,
        status: state.status,
        isFeed: state.isFeed,
        isMedicine: state.isMedicine,
        isAsleep: state.isAsleep,
        prevAction: state.prevAction,
        messages: state.messages,
        giveFood,
        giveMedicine,
        doPet,
        doSleep,
        wakeUp,
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