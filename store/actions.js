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

export function saveGoogleAccessToken(token){
    return {
        type: constants.CHANGE_GOOGLE_ACCESS_TOKEN,
        payload: {
            token: token
        }
    }
}

export function saveGoogleEvents(events){
    return {
        type: constants.SAVE_GOOGLE_CALENDAR_EVENTS,
        payload: {
            events: events
        }

    }
}

export function saveGoogleCalendarEvent(event){
    return {
        type: constants.SAVE_GOOGLE_CALENDAR_EVENT,
        payload: {
            event: event
        }

    }
}

export function purgeGoogleCalendarEvents(){
    return {
        type: constants.PURGE_GOOGLE_CALENDAR_EVENTS
    }
}

export function saveGoogleUser(user){
    return {
        type: constants.SAVE_GOOGLE_USER,
        payload: {
            googleUser: user
        }

    }
}

export function saveFacebookAccessToken(token){
    return {
        type: constants.SAVE_FACEBOOK_ACCESS_TOKEN,
        payload: {
            token: token
        }
    }
}

export function saveFacebookUser(user){
    return {
        type: constants.SAVE_FACEBOOK_USER,
        payload: {
            user: user
        }

    }
}
