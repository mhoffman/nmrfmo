import constants from './constants'

import { combineReducers } from 'redux'

const initialFilter = {
    when: 'today',
    category: 'Recommended',
}

function filterReducer (state=initialFilter, action){
    switch(action.type){
        case constants.GET_FILTER_SETTINGS:
            return {
                ...state,
                data: action.data,
            }
        default:
            return state
    }
}


export default combineReducers({
    filterReducer,
})
