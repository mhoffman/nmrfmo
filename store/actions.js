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

export function changeEventHours(values){
    const start = values[0];
    const end = values[1];

    return {
        type: constants.CHANGE_EVENT_HOURS,
        payload: {
            hours: {
                start,
                end
            }
        }
    }
}

export function changeGoogleAccessToken(token){
    return {
        type: constants.CHANGE_GOOGLE_ACCESS_TOKEN,
        payload: {
            token: token
        }
    }
}
