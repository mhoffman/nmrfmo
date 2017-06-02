import constants from './constants'

import { combineReducers } from 'redux'

const initialFilter = {
    eventTimerange: {key: 'tomorrow', label: 'tomorrow'},
    eventCategory: 'Recommended',
    eventSearchstring: '',
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
        default:
            return state
    }
}


export default combineReducers({
    filterReducer,
})
