import constants from './constants'

import { combineReducers } from 'redux'

const initialFilter = {
    eventTimerange: 'tomorrow',
    eventCategory: 'Recommended',
}

function filterReducer (state=initialFilter, action){
    switch(action.type){
        case constants.CHANGE_EVENT_TIMERANGE:
            return {
                ...state,
                timerange: action.payload.timerange
            }
        case constants.CHANGE_EVENT_CATEGORY:
            return {
                ...state,
                category: action.payload.category
            }
        default:
            return state
    }
}


export default combineReducers({
    filterReducer,
})
