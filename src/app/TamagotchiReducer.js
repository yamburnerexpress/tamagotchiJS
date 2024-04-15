import getStatusById from '../util/getStatus';
import * as constants from '../util/Constants';

export const initialState = {
    name: "Roy",
    age: 0,
    tick: 0,
    isBored: false,
    isHere: true,
    timeSick: 0,
    tolerance: 0,
    hp: 100,
    piss: 0,
    hunger: 0,
    spriteState: 'base',
    tiredness: 0,
    anger: 0,
    love: 0,
    status: getStatusById(1),
    isMedicine: false,
    isAsleep: false,
    isPissing: false,
    prevAction: {
        type: "",
        time: Date.now(),
        payload: {}
    },
    inventory: [],
    messages: []
}
  
const TamagotchiReducer = (state, action) => {
    const { type, payload={} } = action;

    const incrementTolerance = () => {
        if (state.prevAction.type === type) {
            return Math.min(state.tolerance + 20, constants.MAX_TOLERANCE);
        } else {
            return 0;
        }
    }

    const setPrevAction = () => ({type: type, time: Date.now(), payload: payload})
  
    switch (type) {
        case 'GIVE_FOOD': {
            return {
                ...state,
                hp: payload.hp,
                isBored: false,
                tolerance: incrementTolerance(),
                hunger: payload.hunger,
                status: payload.status,
                prevAction: setPrevAction(),
                messages: payload.messages
            };  
        }
        case 'GIVE_MEDICINE': {
            return {
                ...state,
                timeSick: 0,
                hp: payload.hp,
                isBored: false,
                tolerance: incrementTolerance(),
                status: payload.status,
                prevAction: setPrevAction(),
                messages: payload.messages
            }
        }
        case 'DO_PET': {
            return {
                ...state,
                isBored: false,
                tolerance: incrementTolerance(),
                tiredness: payload.tiredness,
                love: payload.love,
                prevAction: setPrevAction()
            }
        }
        case 'DO_SLEEP': {
            return {
                ...state,
                hp: constants.MAX_HP,
                isBored: false,
                tiredness: payload.tiredness,
                tolerance: payload.tolerance,
                isAsleep: true,
                prevAction: setPrevAction(),
                messages: payload.messages
            }
        }
        case 'DO_WAKE': {
            return {
                ...state,
                isAsleep: false,
                prevAction: setPrevAction(),
                messages: []
            }
        }
        case 'GET_STATUS': {
            return {
                ...state,
                prevAction: setPrevAction(),
                messages: payload.messages
            }
        }
        case 'PUT_STATUS': {
            return {
                ...state,
                messages: payload.messages
            }
        }
        case 'GET_TOY': {
            const newInv = Array.from(state.inventory ?? []);
            newInv.push(payload.inventory);
            
            return {
                ...state,
                inventory: newInv
            }
        }
        case 'DO_PLAY_WITH_TOY': {
            return {
                ...state,
                isBored: false,
                tolerance: incrementTolerance(),
                tiredness: payload.tiredness,
                love: payload.love,
                prevAction: setPrevAction(),
                inventory: payload.inventory
            }
        }
        case 'SET_IS_MEDICINE': {
            return {
                ...state,
                prevAction: setPrevAction(),
                isMedicine: payload.isMedicine
            }
        }
        case 'INCREMENT_AGE': {
            if (state.status.isSick) {
                return {
                    ...state,
                    age: state.age + 1,
                    timeSick: state.timeSick + 1,
                    hp: Math.max(state.hp - state.status.effect.hp, 0),
                    piss: Math.min(state.piss + 7, 100),
                    tiredness: Math.min(state.tiredness + state.status.effect.tiredness, constants.MAX_TIREDNESS)
                } 
            } else {
                return {
                    ...state,
                    age: state.age + 1,
                    piss: Math.min(state.piss + 7, 100)
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
                prevAction: setPrevAction(),
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
                isBored: true,
                prevAction: setPrevAction(),
                messages: payload.messages
            }
        }
        case 'REMOVE_IS_BORED': {
            return {
                ...state,
                isBored: false
            }
        }
        case 'SET_IS_AWAY': {
            return {
                ...state,
                isHere: false,
                tolerance: 0,
                prevAction: setPrevAction(),
                messages: payload.messages
            }
        }
        case 'SET_IS_HERE': {
            return {
                ...state,
                isHere: true,
                prevAction: setPrevAction(),
                messages: payload.messages
            }
        }
        case 'SET_PLAYED_GAME': {
            return {
                ...state,
                tolerance: incrementTolerance(),
                prevAction: setPrevAction()
            }
        }
        case 'SET_HAS_TO_PISS': {
            return {
                ...state,
                isPissing: true,
                spriteState: 'pee',
                prevAction: setPrevAction(),
                messages: [`${state.name} has to piss!`]
            }
        }
        case 'GO_PISS': {
            const newVal = Math.max(state.piss - 1, 0);
            return {
                ...state,
                piss: newVal,
                prevAction: setPrevAction(),
                spriteState: newVal === 0 ? 'base' : 'pee',
                isPissing: newVal === 0 ? false : true,
                messages: []
            }
        }
        case 'SET_SPRITE_STATE': {
            return {
                ...state,
                spriteState: payload.spriteState
            }
        }
        case 'RESET_SPRITE_STATE': {
            let condition;
            
            if (!state.isHere) {
                condition = 'away'
            } else {
                if (state.isAsleep) {
                    condition = 'sleep'
                } else {
                    if (state.isPissing) {
                        condition = 'pee'
                    } else {
                        if (state.status.isSick) {
                            condition = 'sick'
                        } else {
                            if (state.isBored) {
                                condition = 'bored'
                            } else {
                                if (state.tolerance >= constants.TOLERANCE_THRESHOLD) {
                                    condition = 'bored'
                                } else {
                                    if (state.love >= constants.LOVE_THRESHOLD) {
                                        condition = 'love'
                                    } else {
                                        condition = 'base'
                                    }
                                }
                            }
                        }
                    }
                }
            }
            
            return {
                ...state,
                spriteState: condition
            }
        }
        default:
            throw new Error(`No case for type ${type} found in TamagotchiReducer.`);
    }
}

export default TamagotchiReducer;