import constants from './constants'

import { combineReducers } from 'redux'

function userReducer(state={
    clientId: '',
    username: '',
    facebookToken: '',
    googleAccessToken: '',
    meetupToken: '',
    googleCalendarEvents: {},
}, action){
    switch(action.type) {
        case constants.CHANGE_GOOGLE_ACCESS_TOKEN:
            return {
                ...state,
                googleAccessToken: action.payload.token
            }
        case constants.SAVE_GOOGLE_CALENDAR_EVENTS:
            return {
                ...state,
                googleCalendarEvents: action.payload.events
            }

        case constants.SAVE_GOOGLE_USER:
            return {
                ...state,
                googleUser: action.payload.googleUser,
            }

        default:
            return state
    }
}

const initialFilter = {
    eventTimerange: {key: 'tomorrow', label: 'tomorrow'},
    eventCategory: {key: 'All', label: 'All'},
    eventSearchstring: '',
    eventHours: {start: 0, end: 24},
}

function filterReducer (state=initialFilter, action){
    switch(action.type){
        case constants.CHANGE_EVENT_TIMERANGE:
            return {
                ...state,
                eventTimerange: action.payload.timerange
            }
        case constants.CHANGE_EVENT_CATEGORY:
            return {
                ...state,
                eventCategory: action.payload.category
            }
        case constants.CHANGE_EVENT_SEARCHSTRING:
            return {
                ...state,
                eventSearchstring: action.payload.category
            }
        case constants.CHANGE_EVENT_HOURS:
            return {
                ...state,
                eventHours: action.payload.hours
            }
        default:
            return state
    }
}


export default combineReducers({
    filterReducer,
    userReducer,
})
