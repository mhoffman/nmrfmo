import constants from './constants'

import { combineReducers } from 'redux'

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
})
