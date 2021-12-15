import { createStore } from 'redux';

//initial state
const initialState = {
    loggedIn: false,
    currUser: {
        userId: -1,
        firstName: "default",
        lastName: "default",
        email: "default",
        password: "default",
        focusTime: -1,
        breakTime: -1,
        segmentsCompleted: -1,
        sessionsCompleted: -1
    },
    intervalId: null,
    countingDown: false,
    sessionOver: false,
    timeRemaining: 10,
    currSession: {
        segments: [
            {   
                segmentName: 'Focus',
                segmentLength: 10,
                break: false
            },
            {
                segmentName: 'Break',
                segmentLength: 10,
                break: true
            },
            {
                segmentName: 'Focus',
                segmentLength: 10,
                break: false
            }
        ],

        sessionStage: 0
    }
}

//reducer function
const productivityReducer = (state = initialState, action) => {
    if(action.type === 'logIn'){
        return {
            ...state,
            loggedIn: true,
            currUser: action.payload
        }
    }

    if(action.type === 'updateUserStats'){
        console.log(state.currUser.segmentsCompleted);
        return{
            ...state,
            currUser: {
                ...state.currUser,
                sessionsCompleted: state.currUser.sessionsCompleted + 1,
                segmentsCompleted: state.currUser.segmentsCompleted + action.numSegments,
                focusTime: state.currUser.focusTime + action.focusTime,
                breakTime: state.currUser.breakTime + action.breakTime
            }
        }
    }

    if (action.type === 'setIntervalId') {
        return {
            ...state,
            intervalId: action.payload
        }
    }

    if(action.type === 'genCurrSession'){
        var breakLength = (action.overallTime - action.focusTime) / action.numBreaks;
        var focusLength = action.focusTime / (parseInt(action.numBreaks) + 1);
        var sessionTemplate = {
            segments: [],
            sessionStage: 0
        }

        for (var i = 0; i < action.numBreaks; i++) {
            let focusSegment = {
                segmentName: 'Focus',
                segmentLength: focusLength,
                break: false
            };

            let breakSegment = {
                segmentName: 'Break',
                segmentLength: breakLength,
                break:true
            };
            sessionTemplate.segments.push(focusSegment);
            sessionTemplate.segments.push(breakSegment);
        }

        let lastSegment = {
            segmentName: 'Focus',
            segmentLength: focusLength,
            break: false
        };

        sessionTemplate.segments.push(lastSegment);

        return {
                    ...state,
                    currSession: {
                        segments: sessionTemplate.segments,
                        sessionStage: sessionTemplate.sessionStage
                    },
                    sessionOver: false
                }

    }

    if(action.type === 'useTemplate'){
        return{
            ...state,
            timeRemaining: action.payload[0].segmentLength,
            currSession: {
                segments: action.payload,
                sessionStage: 0
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