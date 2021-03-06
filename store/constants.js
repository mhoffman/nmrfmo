// Just define all actions here like enums
const actions = [
    'CHANGE_EVENT_TIMERANGE',
    'CHANGE_EVENT_CATEGORY',
    'CHANGE_EVENT_SEARCHSTRING',
    'CHANGE_EVENT_HOURS',
    'CHANGE_GOOGLE_ACCESS_TOKEN',
    'SAVE_GOOGLE_CALENDAR_EVENTS',
    'SAVE_GOOGLE_CALENDAR_EVENT',
    'PURGE_GOOGLE_CALENDAR_EVENTS',
    'SAVE_GOOGLE_USER',
    'SAVE_FACEBOOK_ACCESS_TOKEN',
    'SAVE_FACEBOOK_USER',
]



// Export Section
var actions_enums = {}
actions.map(key=>{
    actions_enums[key] = key
})
module.exports = actions_enums
