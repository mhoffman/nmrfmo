'use strict';

import moment from 'moment-timezone';

const PRIMARY_HUE = 156;
const PRIMARY_SATURATION = 100;
const PRIMARY_LIGHTNESS = 100;

const SECONDARY_HUE = 221;
const SECONDARY_SATURATION = 44;
const SECONDARY_LIGHTNESS = 41;


let what = [
{key: "All", label:"All"},
{key: "Activism", label:"Activism"},
{key: "Arts", label:"Arts"},
{key: "Charity", label:"Charity"},
{key: "Community", label:"Community"},
{key: "Concerts", label:"Concerts"},
{key: "Music", label:"Music"},
{key: "Dance", label:"Dance"},
{key: "Educational", label:"Educational"},
{key: "Festivals", label:"Festivals"},
{key: "Film", label:"Film"},
{key: "Meetup", label:"Meetup"},
{key: "Health & Fitness", label:"Health & Fitness"},
{key: "Kids & Family", label:"Kids & Family"},
{key: "Museums & Attractions", label:"Museums & Attractions"},
{key: "Nightlife", label:"Nightlife"},
{key: "Outdoors", label:"Outdoors"},
{key: "Personal", label: "Personal"},
{key: "Sports", label:"Sports"},
{key: "Religious", label:"Religious"},
{key: "Theater", label:"Theater"},
    /*"Comedy": "Comedy",*/
    /*"Business": "Business",*/
    /*"Food & Drink": "Food & Drink",*/
    /*"Holiday": "Holiday",*/
    /*"Other": "Other",*/
    /*"Religious": "Religious",*/
    /*"Shopping": "Shopping",*/
    ];

    const whatSaturation = {
    };

const whatHues = {
    "Arts": 315,
    "Charity": 0,
    "Community": 80,
    "Meetup": 80,
    "Concerts": 238,
    "Music": 238,
    "Dance": 120,
    "Educational": 206,
    "Festivals": 160,
    "Movies": 205,
    "Food & Drink": 360,
    "Health & Fitness": 80,
    "Fitness": 80,
    "Kids & Family": 156,
    "Museums & Attractions": 280,
    "Nightlife": 279,
    "Comedy": 279,
    "Religious": 84,
    "Sports": 59,
    "Theater": 320,
    "Outdoors": 340,
}

const whatLightness = {
    "Arts": 50,
    "Charity": 50,
    "Community": 50,
    "Meetup": 50,
    "Concerts": 50,
    "Music": 50,
    "Comedy": 50,
    "Dance": 50,
    "Educational": 50,
    "Festivals": 50,
    "Movies": 50,
    "Health & Fitness": 60,
    "Fitness": 60,
    "Food & Drink": 26,
    "Kids & Family": 45,
    "Museums & Attractions": 50,
    "Nightlife": 50,
    "Religious": 50,
    "Sports": 35,
    "Theater": 50,
    "Outdoors": 50,
}

let when = [
{key: 'today', label: 'today'},
{key: 'tomorrow', label: 'tomorrow'},
{key: 'days_2', label: moment(moment.now()).add(2, "days").format("dddd")},
{key: 'days_3', label: moment(moment.now()).add(3, "days").format("dddd")},
{key: 'days_4', label: moment(moment.now()).add(4, "days").format("dddd")},
{key: 'days_5', label: moment(moment.now()).add(5, "days").format("dddd")},
{key: 'days_6', label: moment(moment.now()).add(6, "days").format("dddd")},
{key: 'any', label: 'any day'},
];

module.exports = {
    PRIMARY_COLOR: 'hsl('+PRIMARY_HUE+','+PRIMARY_SATURATION+'%,'+PRIMARY_LIGHTNESS+'%)',
    PRIMARY_HUE : PRIMARY_HUE,
    PRIMARY_SATURATION: PRIMARY_SATURATION,
    PRIMARY_LIGHTNESS: PRIMARY_LIGHTNESS,
    SECONDARY_COLOR: 'hsl('+SECONDARY_HUE+','+SECONDARY_SATURATION+'%,'+SECONDARY_LIGHTNESS+'%)',
    SECONDARY_HUE : SECONDARY_HUE,
    SECONDARY_SATURATION: SECONDARY_SATURATION,
    SECONDARY_LIGHTNESS: SECONDARY_LIGHTNESS,
    BOTTOM_HEIGHT: 270,
    LISTVIEW_BORDER: 15,
    LOCATION_RADIUS: 5e-4,
    LISTVIEW_BLOCKWIDTH: 240,
    what: what,
    whatHues: whatHues,
    whatLightness: whatLightness,
    when: when,
}
