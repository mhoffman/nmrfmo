// Just define all actions here like enums
const actions = [

    'CHANGE_EVENT_TIMERANGE',
    'CHANGE_EVENT_CATEGORY',
    'CHANGE_EVENT_SEARCHSTRING',

]



// Export Section
var actions_enums = {}
actions.map(key=>{
    actions_enums[key] = key
})
module.exports = actions_enums
