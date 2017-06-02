import constants from './constants'


export function changeEventSearchstring(searchstring){
    return {
        type: constants.CHANGE_EVENT_SEARCHSTRING,
        payload: {
            searchstring
        }
    }
}

export function changeEventTimerange(timerange){
    return {
        type: constants.CHANGE_EVENT_TIMERANGE,
        payload: {
            timerange
        }
    }
}

export function changeEventCategory(category){
    return {
        type: constants.CHANGE_EVENT_CATEGORY,
        payload: {
            category
        }
    }
}
