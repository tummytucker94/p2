import { createStore } from 'redux';

//initial state
const initialState = {
    intervalId: null,
    countingDown: false,
    sessionOver: false,
    timeRemaining: 10,
    currSession: {
        goalTimes: [10, 10],
        goalNames: ['Focus', 'Break'],
        sessionStage: 0
    }
}

//reducer function
const productivityReducer = (state = initialState, action) => {
    if (action.type === 'setIntervalId') {
        return {
            ...state,
            intervalId: action.payload
        }
    }

    if (action.type === 'genCurrSession') {
        var breakLength = (action.overallTime - action.focusTime) / action.numBreaks;
        var focusLength = action.focusTime / (parseInt(action.numBreaks) + 1);
        var sessionTemplate = {
            goalTimes: [],
            goalNames: [],
            sessionStage: 0
        }

        for (var i = 0; i < action.numBreaks; i++) {
            sessionTemplate.goalTimes.push(focusLength);
            sessionTemplate.goalNames.push("Focus");
            sessionTemplate.goalTimes.push(breakLength);
            sessionTemplate.goalNames.push("Break");
        }

        sessionTemplate.goalTimes.push(focusLength);
        sessionTemplate.goalNames.push("Focus");

        return {
            ...state,
            currSession: {
                goalTimes: sessionTemplate.goalTimes,
                goalNames: sessionTemplate.goalNames,
                sessionStage: sessionTemplate.sessionStage
            },
            sessionOver: false
        }
    }

    if(action.type === 'setSessionOver'){
        return{
            ...state,
            sessionOver: action.payload
        }
    }

    if (action.type === 'goToNextStage') {
        return {
            ...state,
            currSession: {
                ...state.currSession,
                sessionStage: state.currSession.sessionStage + 1
            }
        }
    }

    if (action.type === 'resetStage') {
        return {
            ...state,
            currSession: {
                ...state.currSession,
                sessionStage: 0
            }
        }
    }

    if (action.type === 'setTimeRemaining') {
        return {
            ...state,
            timeRemaining: action.payload
        }
    }

    if (action.type === 'decrementTimer') {
        return {
            ...state,
            countingDown: true,
            timeRemaining: state.timeRemaining - 1
        };
    }

    if (action.type === 'pauseTimer') {
        return {
            ...state,
            countingDown: false,
            intervalId: null
        };
    }

    if (action.type === 'completeTimer') {
        return {
            ...state,
            timeRemaining: 0,
            countingDown: false,
            intervalId: null
        }
    }
    return state;
};

//create store
const store = createStore(productivityReducer);

export default store;