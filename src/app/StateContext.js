import React, { createContext, useReducer, useContext } from 'react'; 
import TamagotchiReducer, { initialState } from './TamagotchiReducer';
import getStatusById from '../util/getStatus';
import * as constants from '../util/Constants';

export const StateContext = createContext(initialState);

export const TamagotchiProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(TamagotchiReducer, initialState);

    const getIsAnnoyed = () => {
        if (state.tolerance >= constants.TOLERANCE_THRESHOLD) {
            return true
        } else {
            return false
        }
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

        dispatch({type: "INCREMENT_AGE"})

        dispatch({
            type: "GIVE_FOOD",
            payload: {
                hp: Math.min(state.hp + food.hp, constants.MAX_HP),
                hunger: Math.max(state.hunger - food.hunger, initialState.hunger),
                status: status(),
                messages: messages
            }
        })

        dispatch({
            type: "SET_SPRITE_STATE",
            payload: {
                spriteState: "eat"
            }
        })
    }

    const giveMedicine = () => {
        dispatch({type: "INCREMENT_AGE"})

        dispatch({
            type: "GIVE_MEDICINE",
            payload: {
                hp: Math.min(state.hp + 50, constants.MAX_HP),
                status: getStatusById(1),
                messages: [`${state.name} is feeling all better!`]
            }
        })

        dispatch({type: "RESET_SPRITE_STATE"})
    }

    const doPet = () => {
        const isAnnoyed = getIsAnnoyed()

        if (state.tiredness === constants.MAX_TIREDNESS) {
            doSleep()
        } else {
            dispatch({type: "INCREMENT_AGE"})

            dispatch({
                type: "DO_PET",
                payload: {
                    tiredness: Math.min(state.tiredness + 10, constants.MAX_TIREDNESS),
                    love: (isAnnoyed ? Math.max(state.love - 5, 0) : Math.min(state.love + 5, constants.MAX_LOVE))
                }
            })
        }

        dispatch({type: "RESET_SPRITE_STATE"})
    }

    const doSleep = () => {
        dispatch({
            type: "DO_SLEEP",
            payload: {
                tiredness: 0,
                tolerance: 0,
                messages: [`${state.name} fell asleep!`]
            }
        })

        dispatch({type: "RESET_SPRITE_STATE"})
    }

    const wakeUp = () => {
        dispatch({type: "INCREMENT_AGE"})
        dispatch({type: "DO_WAKE"})
        dispatch({type: "RESET_SPRITE_STATE"})
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

    const setIsMedicine = () => {
        dispatch({
            type: "SET_IS_MEDICINE",
            payload: {
                isMedicine: true
            }
        })
    }

    const setTick = () => {
        dispatch({type: "SET_TICK"})
    }

    const removeTick = () => {
        dispatch({type: "REMOVE_TICK"})
    }

    const setEvent = () => {
        dispatch({type: "SET_EVENT"})
        dispatch({type: "REMOVE_TICK"})
        dispatch({type: "REMOVE_IS_BORED"})
        dispatch({type: "RESET_SPRITE_STATE"})
    }

    const setIsBored = () => {
        dispatch({
            type: "SET_IS_BORED", 
            payload: {
                messages: [`${state.name} is bored!`]
            }
        })
        dispatch({type: "RESET_SPRITE_STATE"})
    }

    const goPlay = () => {
        dispatch({type: "REMOVE_TICK"})
        dispatch({type: "REMOVE_IS_BORED"})
        dispatch({
            type: "SET_IS_AWAY", 
            payload: {
                messages: [`${state.name} went off to play on his own!`]
            }
        })
        dispatch({type: "RESET_SPRITE_STATE"})
    }

    const jingleKeys = () => {
        const messages = [`${state.name} heard your keys jingling and came back!`];

        if (Math.random() * 10 >= 3) {
            const toy = {
                name: "Gun",
                action: "Throw"
            }
            if (!state.inventory.some(item => item.name === toy.name)) {
                const article = (['a','e','i','o','u'].some(ltr => toy.name.toLocaleLowerCase().startsWith(ltr))) ? 'an' : 'a';
                messages.push(`${state.name} brought back ${article} ${toy.name}`)
                dispatch({
                    type: "GET_TOY",
                    payload: {
                        inventory: toy
                    }
                })
            }
        }
        dispatch({
            type: "SET_IS_HERE",
            payload: {
                messages: messages
            }
        })
        dispatch({type: "RESET_SPRITE_STATE"})
    }

    const playWithToy = (name) => {
        const isAnnoyed = getIsAnnoyed()

        if (state.tiredness === constants.MAX_TIREDNESS) {
            doSleep()
        } else {
            dispatch({type: "INCREMENT_AGE"})

            const lostToy = Math.random() * 10 >= 3;

            dispatch({
                type: "DO_PLAY_WITH_TOY",
                payload: {
                    toyName: name,
                    tiredness: Math.min(state.tiredness + 10, constants.MAX_TIREDNESS),
                    love: (isAnnoyed ? Math.max(state.love - 5, 0) : Math.min(state.love + 5, constants.MAX_LOVE)),
                    inventory: (lostToy ? state.inventory.filter(function(e) { return e.name !== name }) : state.inventory),
                    lostToy: lostToy
                }
            })

            dispatch({type: "RESET_SPRITE_STATE"})
        }
    }

    const setPlayedGame = () => {dispatch({type: "SET_PLAYED_GAME"})}

    const setHasToPiss = () => {dispatch({type: "SET_HAS_TO_PISS"})}

    const goPiss = () => {dispatch({type: "GO_PISS"})}

    const setSpriteState = (spriteState) => {
        dispatch({
            type: "SET_SPRITE_STATE",
            payload: {
                spriteState: spriteState
            }
        })
    }

    const setMessages = (messages = []) => {
        dispatch({
            type: "SET_MESSAGES",
            payload: {
                messages: messages
            }
        })
    }

    const setPrevAction = (action) => {
        dispatch({
            type: "SET_PREV_ACTION",
            payload: {
                action: action
            }
        })
    }

    const dreamInit = () => {
        dispatch({
            type: "SET_PREV_ACTION",
            payload: {
                action: "DREAM_INIT"
            }
        })

        dispatch({
            type: "SET_MESSAGES",
            payload: {
                messages: []
            }
        })

        dispatch({
            type: "SET_SPRITE_STATE",
            payload: {
                spriteState: "dreamintro"
            }
        })
    }

    const resetSpriteState = () => {
        dispatch({type: "RESET_SPRITE_STATE"})
    }

    const value = {
        name: state.name,
        age: state.age,
        tick: state.tick,
        event: state.event,
        isBored: state.isBored,
        isHere: state.isHere,
        tolerance: state.tolerance,
        hp: state.hp,
        piss: state.piss,
        hunger: state.hunger,
        spriteState: state.spriteState,
        tiredness: state.tiredness,
        anger: state.anger,
        love: state.love,
        status: state.status,
        isMedicine: state.isMedicine,
        isAsleep: state.isAsleep,
        isPissing: state.isPissing,
        prevAction: state.prevAction,
        inventory: state.inventory,
        messages: state.messages,
        giveFood,
        giveMedicine,
        doPet,
        doSleep,
        wakeUp,
        getStatusMessages,
        setIsMedicine,
        setTick,
        removeTick,
        setEvent,
        setIsBored,
        goPlay,
        jingleKeys,
        playWithToy,
        setPlayedGame,
        setHasToPiss,
        goPiss,
        setSpriteState,
        setMessages,
        setPrevAction,
        dreamInit,
        resetSpriteState
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

export default useTamagotchi;