'use strict';
import React, { Component } from 'react';
import Share, {ShareSheet, Button} from 'react-native-share';
import {
    Alert,
    Animated,
    AppRegistry,
    BackAndroid,
    Dimensions,
    Image,
    InteractionManager,
    Navigator,
    Platform,
    PropTypes,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View

} from 'react-native';

import constants from './constants';
import Hr from 'react-native-hr';

import Communications from 'react-native-communications';
import SideMenu from 'react-native-side-menu'
import { FontAwesome, Ionicons } from '@exponent/vector-icons';
import { Components, Location, Permissions } from 'exponent';

/*import MapView from 'react-native-maps';*/
/*using exponent component*/
const MapView = Components.MapView;

const LOCATION_RADIUS = 5e-5

// Sharing icons
const TWITTER_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAABvFBMVEUAAAAA//8AnuwAnOsAneoAm+oAm+oAm+oAm+oAm+kAnuwAmf8An+0AqtUAku0AnesAm+oAm+oAnesAqv8An+oAnuoAneoAnOkAmOoAm+oAm+oAn98AnOoAm+oAm+oAmuoAm+oAmekAnOsAm+sAmeYAnusAm+oAnOoAme0AnOoAnesAp+0Av/8Am+oAm+sAmuoAn+oAm+oAnOoAgP8Am+sAm+oAmuoAm+oAmusAmucAnOwAm+oAmusAm+oAm+oAm+kAmusAougAnOsAmukAn+wAm+sAnesAmeoAnekAmewAm+oAnOkAl+cAm+oAm+oAmukAn+sAmukAn+0Am+oAmOoAmesAm+oAm+oAm+kAme4AmesAm+oAjuMAmusAmuwAm+kAm+oAmuoAsesAm+0Am+oAneoAm+wAmusAm+oAm+oAm+gAnewAm+oAle0Am+oAm+oAmeYAmeoAmukAoOcAmuoAm+oAm+wAmuoAneoAnOkAgP8Am+oAm+oAn+8An+wAmusAnuwAs+YAmegAm+oAm+oAm+oAmuwAm+oAm+kAnesAmuoAmukAm+sAnukAnusAm+oAmuoAnOsAmukAqv9m+G5fAAAAlHRSTlMAAUSj3/v625IuNwVVBg6Z//J1Axhft5ol9ZEIrP7P8eIjZJcKdOU+RoO0HQTjtblK3VUCM/dg/a8rXesm9vSkTAtnaJ/gom5GKGNdINz4U1hRRdc+gPDm+R5L0wnQnUXzVg04uoVSW6HuIZGFHd7WFDxHK7P8eIbFsQRhrhBQtJAKN0prnKLvjBowjn8igenQfkQGdD8A7wAAAXRJREFUSMdjYBgFo2AUDCXAyMTMwsrGzsEJ5nBx41HKw4smwMfPKgAGgkLCIqJi4nj0SkhKoRotLSMAA7Jy8gIKing0KwkIKKsgC6gKIAM1dREN3Jo1gSq0tBF8HV1kvax6+moG+DULGBoZw/gmAqjA1Ay/s4HA3MISyrdC1WtthC9ebGwhquzsHRxBfCdUzc74Y9UFrtDVzd3D0wtVszd+zT6+KKr9UDX749UbEBgULIAbhODVHCoQFo5bb0QkXs1RAvhAtDFezTGx+DTHEchD8Ql4NCcSyoGJYTj1siQRzL/JKeY4NKcSzvxp6RmSWPVmZhHWnI3L1TlEFDu5edj15hcQU2gVqmHTa1pEXJFXXFKKqbmM2ALTuLC8Ak1vZRXRxa1xtS6q3ppaYrXG1NWjai1taCRCG6dJU3NLqy+ak10DGImx07LNFCOk2js6iXVyVzcLai7s6SWlbnIs6rOIbi8ViOifIDNx0uTRynoUjIIRAgALIFStaR5YjgAAAABJRU5ErkJggg==";
const FACEBOOK_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAYFBMVEUAAAAAQIAAWpwAX5kAX5gAX5gAX5gAXJwAXpgAWZ8AX5gAXaIAX5gAXpkAVaoAX5gAXJsAX5gAX5gAYJkAYJkAXpoAX5gAX5gAX5kAXpcAX5kAX5gAX5gAX5YAXpoAYJijtTrqAAAAIHRSTlMABFis4vv/JL0o4QvSegbnQPx8UHWwj4OUgo7Px061qCrcMv8AAAB0SURBVEjH7dK3DoAwDEVRqum9BwL//5dIscQEEjFiCPhubziTbVkc98dsx/V8UGnbIIQjXRvFQMZJCnScAR3nxQNcIqrqRqWHW8Qd6cY94oGER8STMVioZsQLLnEXw1mMr5OqFdGGS378wxgzZvwO5jiz2wFnjxABOufdfQAAAABJRU5ErkJggg==";
const WHATSAPP_ICON = "data:image/png;base64,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";
const GOOGLE_PLUS_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAACQ1BMVEUAAAD/RDP/STX9Sjb+STT+SjX+SjX+SjX+STT/SzP/Sjb/SzX/VVX/SDb+SDP+SjX9RzT9STT9SjT+STX+SjT9SjT/SST/TTP+SjX+SjX/RDP/RzP+SjX+SjX/STf9SDX/SjX/TU3+Sjb+SjX/Qyz/Szb+SjX/TTP+SjX9STX+SjP/TTX9Szb+Szb/YCD/SzX/SzX+Sjb+STX/TTX/SzX/Szb/TDT+SjX9SzX/STf+TDX/SjT9SzX9Szb+SjX/SjX/SzX/STT9SjT9TDT+SDT/VQD9STX/STX9SjX+SjX9STX+SzT/UDD9Sjb+SjX9RzT/QED+SjT+SjX/XS7+SjX/Ui7/RC3+SjX/TTz/RzP+SjX/TTP/STf+SjX/STT/RjP+Sjb/SzX/Szz/Rjr/RzL+RzP+SjX/Szf/SjX9Sjb+SjX+Sjb+SjX+SjX+SjX/STf/SjT/SjT9SjX9SzT+RzT+STT/STT+SjX/STP/Tjf+SjX/Szb/SjX/STX9SjX/SjT/AAD/SjH/STb+SzX+Sjb+SjT9SDT+Sjb+SjX9STf9STT/SDX/TDf+STb/TjT/TjH+SjX+SDT/Sjb9SzX9RzX+TDT/TUD/STX+SjX+STX/VTn/QjH/SjX+SjX/Ri7+Szb/TTP+SjX/SDX/STT9SjX+SjX/SDL/TjT9Sjb/RjL+SjX9SzX/QED/TDT+SjX+SjX9STX/RjX/VSv/Rzb/STX/ORz/UDD9SzX+Sjb/STT9SzP+SzX+SjX+SjX9Szb/Ti//ZjPPn7DtAAAAwXRSTlMAD1uiy+j5/8FBZHQDY9zvnYSc5dGhBwr+1S0Zqu44mz4KtNkXY7Yo8YLcfp3bCGZ+sLhWaks2z4wO6VOklrtWRFSXos4DoD+D/ZnoEKasjwS7+gvfHC3kHmjtMlTXYjfZXBEWa+/nQRiK5u7c8vVGRWepp6+5eulQF/dfSHSQdQEfdrzguZzm+4KSQyW1JxrAvCaCiLYUc8nGCR9h6gvzFM41MZHhYDGYTMejCEDi3osdBj1+CSCWyGyp1PC3hUEF/yhErwAAAjFJREFUSMft1tdfE0EQB/ADJD+JKAomHoqKxhJLFCnSpdgIxobYgqhYaJKIHVQUsSFiBSuCvWPv3T/N2ZPD3EucvVcyL3sz2W8+l73ZvShKKEIxcCIsPGJQpAV9MThK1KzAEAaNHjosZviI2DgBR9psVrvCx6Ni1fjRNI5JIDx2nF5m4ejxsCRqVxMmknZMksGTVUzpu5zqJD1NAodNB2boyUzCrlnK7CSKOUCyGJOC4BSan6onaWLN5irpCIwgOAMBt5eZRVk2H+fQx7n92TzK8pT8AopCwCbGgiB4Pk1fsFDPFlG2mL9gRTTdnahnxcASDx/nq6SX6tkyYLnEo1qxknBJ2t9kVSlcq2WaZM1a0qXrtOv18Jbp9Q3l5Rv/39ubHKQ3V2xRtm7bXlkluyGra2qJ76jzwb/TxH721O9K3U1fsMfsgbCXcLFZvI+wL8ok3i/6+ECDOdxYJ/TBQ9Kw+nDTkRyHtodKjjbLyGMtx304cTKi8NRpoVutfJp5xgtv21ntxGw/J7T3PNdeuAhcuqxn9o5W0p1Ma78CpF/9lzdfI3ydiStobrjhIL4BRN7k4WRa3i5D5RbQ3cPDMcDtO4ZKGXCXedtuQL1nqNwHHjDxQ/rNGYbKI/gfM/ETwv6ngafSM3RwH3O7eK86Wzz9L582PO9lN9iLl6KpXr2uf9P7tvHde4e75oNEZ3/85NQ2hKUyzg/1c57klur68vXbd9XtdP34+et36C9WKAZo/AEHHmXeIIIUCQAAAABJRU5ErkJggg==";
const EMAIL_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAABC1BMVEUAAAA/Pz8/Pz9AQEA/Pz8/Pz8+Pj4+Pj4/Pz8/Pz8/Pz8/Pz8+Pj4+Pj4/Pz8/Pz8/Pz9AQEA+Pj5AQEA/Pz87Ozs7Ozs/Pz8+Pj47OztAQEA/Pz89PT01NTVBQUFBQUE/Pz8/Pz8+Pj4/Pz9BQUE+Pj4/Pz8/Pz89PT0+Pj4/Pz9BQUFAQEA9PT09PT0/Pz87Ozs9PT05OTk/Pz8+Pj4/Pz9AQEA/Pz8/Pz8/Pz8/Pz+AgIA+Pj4/Pz8/Pz9AQEA/Pz8/Pz8/Pz8/Pz8+Pj4/Pz8/Pz8/Pz9AQEA+Pj4/Pz8+Pj4/Pz85OTk/Pz8/Pz8/Pz8/Pz88PDw9PT0/Pz88PDw8PDw+Pj45OTlktUJVAAAAWXRSTlMA/7N4w+lCWvSx8etGX/XlnmRO7+1KY/fjOGj44DU7UvndMec/VvLbLj7YKyiJdu9O7jZ6Um1w7DnzWQJz+tpE6uY9t8D9QehAOt7PVRt5q6duEVDwSEysSPRjqHMAAAEfSURBVEjH7ZTXUgIxGEa/TwURUFyKYgMURLCvbe2gYAV7ff8nMRksgEDiKl7lXOxM5p8zO3s2CWAwGAx/CjXontzT25Y+pezxtpv2+xTygJ+BYOvh4BBDwx1lKxxhNNZqNjLK+JjVWUYsykj4+2h8gpNTUMkIBuhPNE+SKU7PQC3D62E60ziYzXIuBx0Z+XRTc9F5fgF6MhKNzWXnRejKWGJdc9GZy8AP3kyurH52Ju01XTkjvnldNN+Qi03RecthfFtPlrXz8rmzi739Ax7mUCjy6FhH/vjPonmqVD6pdT718excLX/tsItLeRAqtc7VLIsFlVy/t6+ub27v7t8XD490niy3p+rZpv3i+jy/Or+5SUrdvcNcywaDwfD/vAF2TBl+G6XvQwAAAABJRU5ErkJggg==";
const CLIPBOARD_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAB5lBMVEUAAAA8PDw+Pj4/Pz8/Pz8/Pz8/Pz8+Pj47OzsAAAA5OTk+Pj4/Pz8/Pz8+Pj49PT0/Pz8/Pz85OTlAQEA/Pz87Ozs+Pj4+Pj4/Pz8/Pz8/Pz8zMzNBQUE/Pz8/Pz8/Pz9AQEA7Ozs9PT0/Pz9AQEA+Pj4/Pz8+Pj4AAABAQEA/Pz87OztBQUE/Pz8+Pj4zMzNDQ0M/Pz89PT03Nzc/Pz8/Pz8/Pz8/Pz88PDw8PDwAAABCQkI7Ozs9PT0/Pz9AQEA/Pz8uLi4rKytAQEA/Pz89PT0+Pj4/Pz8/Pz8/Pz9CQkJAQEA/Pz9CQkI/Pz8/Pz8/Pz8+Pj49PT0/Pz8yMjI/Pz88PDw/Pz9BQUE8PDw/Pz9AQEA/Pz8/Pz8/Pz89PT0/Pz9CQkI9PT1EREQ9PT08PDw4ODg+Pj6AgIA/Pz8/Pz82NjZVVVU7Ozs/Pz81NTVAQEA/Pz8+Pj49PT1BQUE/Pz8/Pz8/Pz8vLy8/Pz87OztAQEA3Nzc9PT0+Pj4/Pz89PT0/Pz8/Pz89PT1AQEA9PT04ODgzMzM/Pz8/Pz9AQEA/Pz9AQEA/Pz83Nzc9PT0/Pz9AQEA/Pz8+Pj4+Pj5AQEA/Pz89PT1FRUU5OTk/Pz8/Pz8+Pj47Ozs/Pz89PT08PDw+Pj6z1Mg0AAAAonRSTlMAEXTG8/7pslICKMn//J0u2LcSLNu9Y0523KoKL9b7hggauZsEOuJ/ARS7VifkiwUX0bEq1f1p6KGQAz4NpnpY8AsGtMIyb46NbSOMcRuh+fGTFc0z1yKFKy/dpKff1CqKMoYPp+lAgAKd6kIDhdorJJExNjflktMr3nkQDoXbvaCe2d2EijIUn3JsbjDDF1jjOOdWvIDhmhoJfWrAK7bYnMgx8fGWAAACNUlEQVRIx+2W6V8SURSGBxEVeydMbVER1DCwRNTCEhMNsywqExXcUrNVU9NK2wy1fd9sMyvrP+1cmYH5eK5f5f3APef85hnuvfPeM6MoaaW1dWXKMGdasrJzrJtgc7dhQ+p2kzRry4OuHfmSbEEhUTt37d5TRGNxiRRrLwUczjKKyiuI3uuSYCv3ARa3ZyOu2k/xAT5b7aXra3xaVlsH1LPZg4cAvzM10wbgMBs+QqtsDKTyJroXGz7a7AgandECtPLXfKzFY8hCbcBxFudpP3Gy49RpQ8UXtgBnOOzZc53CU+e7Ism7uYnt5ji0p1e3pDmqzTnmAEr7GGz/AGEDg0MXaBgeERXrKIWFBQz2IvlYHbtEh/EycOUqVQLXVCDPxvGz+MPYdRGWjE/coGFyyg9M32SwM8PkydlQIim7JX6DxHpvM9g7c+SjoLESmqd9vjvDYO9NEzs1aahYY7SK+3Zm31Ddmp8jDx4qysIj2qt4O6dviH4xqvk5soj40vJjqjzh7HOf6BtPtb1SnulG6X3O6bHdqb5BejHbKtDOl+UcQ78iNuwzFKKvwx1v3npYJ+kd0BYynqz3Eu2OZvnB+IyCRVE+TD5qSmWBRuDjJzb8GWhIJq4xv36kWKoH6mr1vlFDnvRW86e9Qtd/qUrs1VeKv1VKbJjrOz3Wih8UrTpF37ArMlotFmfg58raLxrjvyXfifl/ku/TdZsiK9NfNcH+y93Ed4A1JzvLkmnOMClppbV19R+iQFSQ2tNASwAAAABJRU5ErkJggg==";
const MORE_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAQlBMVEUAAABEREQ9PT0/Pz8/Pz9AQEA7OzszMzM/Pz8/Pz9FRUU/Pz8/Pz9VVVUAAAA/Pz8+Pj4/Pz8/Pz9BQUFAQEA/Pz+e9yGtAAAAFnRSTlMAD5bv9KgaFJ/yGv+zAwGltPH9LyD5QNQoVwAAAF5JREFUSMft0EkKwCAQRFHHqEnUON3/qkmDuHMlZlVv95GCRsYAAAD+xYVU+hhprHPWjDy1koJPx+L63L5XiJQx9PQPpZiOEz3n0qs2ylZ7lkyZ9oyXzl76MAAAgD1eJM8FMZg0rF4AAAAASUVORK5CYII=";
const REACT_ICON = 'data:image/png;base64,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';



import Menu from './Menu'


var t = require('tcomb-form-native');
let what = t.enums({
    "All": "All",
    "Arts": "Arts",
    "Charity": "Charity",
    "Community": "Community",
    "Concerts": "Concerts",
    "Dance": "Dance",
    "Educational": "Educational",
    "Festivals": "Festivals",
    "Film": "Film",
    "Health & Fitness": "Health & Fitness",
    "Kids & Family": "Kids & Family",
    "Museums & Attractions": "Museums & Attractions",
    "Nightlife": "Nightlife",
    "Outdoors": "Outdoors",
    "Sports": "Sports",
    "Theater": "Theater",
    /*"Comedy": "Comedy",*/
    /*"Business": "Business",*/
    /*"Food & Drink": "Food & Drink",*/
    /*"Holiday": "Holiday",*/
    /*"Other": "Other",*/
    /*"Religious": "Religious",*/
    /*"Shopping": "Shopping",*/
}, "Categories");

const whatHues = {
    "Arts": 40,
    "Charity": 0,
    "Community": 80,
    "Concerts": 30,
    "Dance": 120,
    "Educational": 206,
    "Festivals": 160,
    "Film": 180,
    "Health & Fitness": 240,
    "Kids & Family": 314,
    "Museums & Attractions": 280,
    "Nightlife": 279,
    "Sports": 59,
    "Theater": 320,
    "Outdoors": 340,
}

let when = t.enums({
    now: 'now',
    today: 'today',
    tomorrow: 'tomorrow',
    week: 'week',
    weekend: 'weekend',
    /*month: 'month',*/
});



function getCategoryHue(result){
    if(result.categories !== null && result.categories.length > 0){
        /*console.log(result.categories);*/
        /*console.log(whatHues[result.categories[0]]);*/

        if(whatHues[result.categories[0]]!==undefined){
            return whatHues[result.categories[0]]
        } else {
            return constants.PRIMARY_HUE
        }
    } else {
        return constants.PRIMARY_HUE
    }
}




var EventSelection = t.struct({
    what: what,
    when: when
})

/*console.log("IMPORTED MENU")*/
/*console.log(Menu);*/


import querystring from 'querystring';
/*console.log(querystring)*/
import moment from 'moment-timezone';
/*import styles from '../styles/styles';*/

const BOTTOM_HEIGHT = 120;
const window = Dimensions.get('window');
const PRIMARY_COLOR = constants.PRIMARY_COLOR;

const styles = StyleSheet.create({
    contentContainer:{
        paddingTop: 400,
        paddingBottom: 600,
        alignItems: 'flex-start',
        flex: 1,
    },
    clickable: {
        borderWidth: 1.,
        borderRadius: 2,
        borderColor: PRIMARY_COLOR,
        flex: 1,
        padding: 2,
        margin: 2
    },
    customcallout: {
        width: 140,
        /*backgroundColor: '#4da2ab',*/
        paddingHorizontal: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 2,
        borderRadius: 6,
        borderColor: '#007a87',
        borderWidth: 0.5,
    },
    topContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 150,
    },
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menu: {
        flex: 1,
        width: window.width,
        height: window.height,
        backgroundColor: 'white',
        padding: 20,
        zIndex: -10,
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: BOTTOM_HEIGHT,
    },
    fullmap: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    bottomline: {
        position: 'absolute',
        top: window.height - BOTTOM_HEIGHT,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 15,
    },
    nobottomline: {
        position: 'absolute',
        top: window.height+100,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        justifyContent: 'flex-end',
    },
    bubble: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 5,
    },
    button: {
        width: 80,
        paddingHorizontal: 5,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    menu_button: {
        position: 'absolute',
        top: 20,
        padding: 10,
        /*zIndex: 3,*/
    },
    marker: {
        backgroundColor: PRIMARY_COLOR,
        position: 'relative',
        borderRadius: 3,
        padding: 2
    },
    marker_info: {
        backgroundColor: 'crimson',
        position: 'absolute',
        color: 'white',
        borderRadius: 2,
        padding: 0,
        fontSize: 8,
        top:-3,
        left:-2,
        zIndex:0,
    },
    action_link : {
        textAlign: 'center',
        fontSize: 14,
        paddingVertical: 5,
    },
    bottom_message: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    p: {
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    buttonContainer: {
        flexDirection: 'column',
        marginVertical: 20,
        marginHorizontal: 10,
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
    }
});

class MyButton extends Component {
    handlePress(e) {
        if (this.props.onPress) {
            this.props.onPress(e);
        }
    }

    render() {
        return (
                <TouchableOpacity
                onPress={this.handlePress.bind(this)}
                style={this.props.style}>
                <Text>{this.props.children}</Text>
                </TouchableOpacity>
               );
    }
}

class MyMapView extends Component {
    constructor(props) {
        super(props);

        this.state = {text: '',
            isOpen: false,
            position: '',
            longitude: -122.4324,
            latitude: 37.78825,
            description: '',
            meetings: [],
            private_meetings: [],
            lastUpdatedAt: 0,
            event: {title: ''},
        };
        this.getMeetupData();
        // automatically updated every n minutes
        setInterval(()=>{this.getMeetupData();}, 1000 * 60 * 10)
    }


    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
    updateMenuState(isOpen) {
        this.setState({ isOpen, });
        this.setState({event: {title: ''}})
    }

    onMenuItemSelected(item){
        this.setState({
            isOpen: false,
            selectedItem: item,
        });
    }

    getMeetupData(){
        /*console.log("TRYING UPDATE");*/
        /*console.log(this.state);*/

        if (((Date.now() - this.props.parent.state.lastUpdatedAt)/ 1000) >= 1.){
            /*console.log("Updating ...");*/
            /*console.log(this.state);*/
            let lon = this.state.longitude;
            let lat = this.state.latitude;

            var url = "";
            /*console.log(this)*/
            if(this.props.parent.state.search.length==0){
                url = 'https://nomorefomo.herokuapp.com/events/' + this.props.parent.state.timeRange;
            }else{
                url = 'https://nomorefomo.herokuapp.com/search?q=' + encodeURI(this.props.parent.state.search)
            }

            /*console.log("MARKER URL");*/
            /*console.log(this.props.parent.state.timeRange);*/
            /*console.log(this.props.parent.state.search)*/
            /*console.log(url);*/
            fetch (url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'GET'
            })
            .then((response) => response.json())
                .then((response) => {
                    this.setState({meetings: response});
                    this.setState({lastUpdatedAt: Date.now()})
                })
            .catch((error) => {
                /*console.log("ERROR while fetching events");*/
                /*console.log(error)*/
                return null;
            });
        }else{
            /*console.log("Refusing to update, yet.")*/
        }
    }

    componentDidMount(){
        /*console.log("DidMount");*/
        this.getMeetupData();
    }

    componentWillReceiveProps(nextProps){
        /*console.log("WillReceiveProps");*/
        InteractionManager.runAfterInteractions(()=>{
            this.getMeetupData();
        });
    }

    getSaturation(datetime){
        const now = new Date().getTime();
        const diff =  new Date(datetime).getTime() - now;
        let saturation = 0;
        if(diff>0){
            saturation = 100
        }
        switch(this.props.parent.state.timeRange){
            case 'now':
                saturation =  100 - diff/1000./60.;
                break;
            case 'today':
                saturation =  100 - diff/1000/60/60/60/10;
                break;
            case 'tomorrow':
                saturation =  100 - diff/1000/60/18;
                break;
            case 'week':
                saturation =  100 - diff/1000/60/24/7;
                break;
            case 'weekend':
                saturation = 100 - diff/1000/60/60/60/10
                    break;
            case 'personal':
                saturation = 1000*60*60*60/10
                    break;
            default:
                saturation = 1000*60*60*60/10
        }
        /*console.log('DATETIME ' + datetime);*/
        /*console.log('DIFF ' + diff);*/
        /*console.log('TIMERANGE ' + this.props.parent.state.timeRange);*/
        /*console.log(saturation);*/
        return saturation
    }


    marker_format_title(result, timeRange=''){
        let tz = moment.tz.guess();
        let date_format = '';
        switch(timeRange || this.props.parent.state.timeRange){
            case 'now':
                date_format = "h:mm A";
                break;
            case 'today':
                date_format = "dd h:mm A";
                break;
            case 'tomorrow':
                date_format = "dd h:mm A";
                break;
            case 'week':
                date_format = "dd h:mm A";
                break;
            case 'weekend':
                date_format = "dd h:mm A";
                break;
            case 'personal':
                date_format = "M/D h:mm A";
                break;
            default:
                date_format = "M/D h:mm A";
        }
        return  moment.tz(result.datetime, tz).format(date_format);
    }

    marker_infotext(result){
        if (result.cost === null){
            return '';
        }else if(result.cost.toLowerCase().indexOf('$0') > -1){
            return 'FREE';
        }else if(result.cost.toLowerCase().indexOf('free') > -1){
            return 'FREE';
        } else {
            return '';
        }
    }


    navigate(routeName, passProps) {
        this.props.navigator.push({
            name: routeName,
            passProps: passProps
        });
    }


    /*componentDidMount() {*/
    /*navigator.geolocation.getCurrentPosition(*/
    /*(position) => {*/
    /*this.setState({longitude: position['coords']['longitude'],*/
    /*latitude: position['coords']['latitude']})*/
    /*})*/
    /*}*/
    async alertIfRemoteNotificationsDisabledAsync() {
        const { status  } = await Permissions.askAsync(Permissions.LOCATION);

        if (status !== 'granted') {
            alert('Hi, the app needs to know your location.');
        }
    }
    async componentDidMount() {
        let loc_permission = await this.alertIfRemoteNotificationsDisabledAsync();
        if(loc_permission){
            position = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
            this.setState({longitude: position.coords.longitude, latitude: position.coords.latitude});
        }
    }


    publisher_text(event){
        if(event.publisher !== null){
            return '(' + event.publisher + ')'
        } else {
            return ''
        }
    }
    render() {
        const { region } = this.props;
        let longitude = this.state.longitude;
        let latitude = this.state.latitude;
        let time = new Date().getTime() ;
        let later = time + 1000000;
        const menu = <Menu onItemSelected={this.onMenuItemSelected}
        parent={this}
        EventSelection={EventSelection}
        what={what}
        when={when}
        whatHues={whatHues}
        />;

        let map = (
                <SideMenu
                style={styles.menu}
                menu={menu}
                isOpen={this.state.isOpen}
                onChange={(isOpen) => this.updateMenuState(isOpen)}
                >


                <View style={styles.container}>
                <MapView
                style={this.state.event.title == "" ? styles.fullmap : styles.map}
                initialRegion={{latitude : latitude,
                    longitude: longitude,
                    latitudeDelta: 0.135,
                    longitudeDelta: 0.1321
                }}
                showsUserLocation={true}
                followsUserLocation={true}
                showsCompass={true}
                zoomEnabled={true}
                mapType='standard'
                    showPointsOfInterest={true}
                >

                {this.state.private_meetings
                    .map((result, x) =>
                            <MapView.Marker
                            key={x}
                            coordinate={{
                                longitude: result.lon + LOCATION_RADIUS * Math.sin(result.row_number/result.count*2*Math.PI),
                                latitude: result.lat + LOCATION_RADIUS * Math.cos(result.row_number/result.count*2*Math.PI),
                            }}
                            onPress={()=>{
                                InteractionManager.runAfterInteractions(()=>{
                                    this.setState({event: {
                                        longitude: result.lon,
                                        latitude: result.lat,
                                        title: result.title,
                                        categories: result.categories,
                                        url: result.url,
                                        address: result.address,
                                        description: result.description,
                                        publisher: result.publisher,
                                        cost: result.cost,
                                        publisher_url: result.publisher_url,
                                        datetime: result.datetime,
                                    },
                                        event_title: result.title});

                                });
                            }}

                            >
                                <View
                                style={[styles.marker,
                                    {
                                        backgroundColor: 'hsl('+constants.SECONDARY_HUE+',' + (100) + '%,'+constants.SECONDARY+'%)',
                                    }]}
                            >
                                <Text style={{color: 'white'}}><FontAwesome name='facebook-square' color='#ffffff' size={15}/> {this.marker_format_title(result, 'personal')}</Text>
                                <Text style={styles.marker_info}>{this.marker_infotext(result)}</Text>
                                </View>
                                </MapView.Marker>

                                )}
                {this.state.meetings
                    .filter((elem) => {
                        /*console.log("MEETINGS FILTER");*/
                        /*console.log(elem);*/
                        /*console.log("PARENT STATE");*/
                        /*console.log(this.props.parent.state);*/
                        if(this.props.parent.state.category === 'All'){
                            return true;
                        }else if(elem.categories !== null && elem.categories.indexOf(this.props.parent.state.category)>-1) {
                            return true;
                        } else {
                            return false;
                        }})
                    .map((result, x) =>
                            <MapView.Marker
                            key={x}
                            coordinate={{
                                longitude: result.lon + LOCATION_RADIUS * Math.sin(result.row_number/result.count*2*Math.PI),
                                latitude: result.lat + LOCATION_RADIUS * Math.cos(result.row_number/result.count*2*Math.PI)
                            }}
                            onPress={()=>{
                                InteractionManager.runAfterInteractions(()=>{
                                    this.setState({event: {
                                        title: result.title,
                                        categories: result.categories,
                                        longitude: result.lon,
                                        latitude: result.lat,
                                        url: result.url,
                                        address: result.address,
                                        description: result.description,
                                        publisher: result.publisher,
                                        cost: result.cost,
                                        publisher_url: result.publisher_url,
                                        datetime: result.datetime
                                    },
                                        event_title: result.title
                                    });

                                });
                            }}

                            >
                                <View
                                style={[styles.marker,
                                    { backgroundColor: 'hsl('+getCategoryHue(result)+',' + this.getSaturation(result.datetime) + '%,'+constants.PRIMARY_LIGHTNESS+'%)',
                                        borderColor: 'hsl('+getCategoryHue(result)+',' + '100%,'+constants.PRIMARY_LIGHTNESS+'%)',
                                        borderWidth: 1,
                                    }]}
                            >
                                <Text style={{color: 'white'}}>{this.marker_format_title(result)}</Text>
                                <Text style={styles.marker_info}>{this.marker_infotext(result)}</Text>
                                </View>
                                </MapView.Marker>

                                )}




                </MapView>
                    <View style={this.state.event.title == "" ? styles.nobottomline : [
                        styles.bottomline,
                        styles.clickable,
                        {
                            borderColor: 'hsl('+getCategoryHue(this.state.event)+',' + '100%,'+constants.PRIMARY_LIGHTNESS+'%)',

                        }
                    ]}>
                        <TouchableHighlight
                        onPress={this.navigate.bind(this, "event_details",
                                {event: this.state})}
                    >
                        <Text style={styles.bottom_message}>
                        {this.state.event.title == null ? " " : this.state.event.title.slice(0, 100)} {this.publisher_text(this.state.event)} <FontAwesome name='chevron-right' color='#000000' size={20}/> 
                    </Text>
                        </TouchableHighlight>
                        </View>
                        </View>
                        <MyButton style={[styles.menu_button,{marginTop:20}]} onPress={() => this.toggle()}>
                        <Image
                        source={require('./assets/menu.png')} style={{width: 32, height: 32}} />
                        </MyButton>


                        </SideMenu>
                        );


                    return map
    }

}

class CustomCallout extends Component {
    constructor(props){
        super(props);
    };
    publisher_text(event){
        if(event.publisher !== null){
            return '(' + event.publisher + ')'
        } else {
            return ''
        }
    };
    render(){
        return (
                <View
                >
                <TouchableHighlight
                onPress={this.props.parent.navigate.bind(this, "event_details",
                        {event: this.state})}
                >
                <Text>{this.props.parent.state.event.title} {this.publisher_text(this.props.parent.state.event)}</Text>

                </TouchableHighlight>
                </View>
               );
    }

}

class EventDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            sharing_visible: false,
        };
    }
    onOpenShare() {
        console.log("OPEN SHARE")
        this.setState({sharing_visible: true})
    }
    onCancelShare() {
        console.log("CANCEL SHARE")
        this.setState({sharing_visible: false})
    }
    render () {
        /*console.log("DETAIL PROPS");*/
        /*console.log(this.props);*/
        /*console.log('https://calendar.google.com/calendar/gp#~calendar:view=e&bm=1?action=TEMPLATE&text=' + encodeURI(this.props.event.event.title.replace(/\s+/gi, '+')) + '&dates=' + moment(this.props.event.event.datetime).format("YYYYMMDD[T]HHmmssz/") + moment(this.props.event.event.datetime).add(1, "hours").format("YYYYMMDD[T]HHmmssz") + '&details=' + encodeURI(this.props.event.event.description.replace(/\s+/gi, '+')) + '&location=' + encodeURI(this.props.event.event.address.replace(/\s+/gi, '+')) + '&sf=true&output=xml')*/
        return (
                <ScrollView
                style={{ flex: 1 }}
                >
                <View >
                <TouchableHighlight
                style={[styles.clickable,{
                    marginTop:30,
                    marginBottom:20,
                    borderColor: 'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + constants.PRIMARY_LIGHTNESS+ '%)',
                }]}
                onPress={()=>this.props.navigator.pop()}>
                <Text><FontAwesome name='chevron-left' color='#000000'/> BACK</Text>

                </TouchableHighlight>
                <Text style={[styles.welcome]}>
                {this.props.event.event.title}
                </Text>
                <Text style={styles.p}>
                {moment(this.props.event.event.datetime).format('dddd, MMMM Do, YYYY, h:mm A')}
                </Text>
                    <Hr lineColor='#b3b3b3' text='Description' textColor={'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + constants.PRIMARY_LIGHTNESS+ '%)'}/>
                    <Text style={styles.p}>
                    {this.props.event.event.description == null ? "" :  this.props.event.event.description.slice(0, 400) + ' ...'}
                </Text>
                    <Text style={styles.p}>
                    {this.props.event.event.cost}
                </Text>
                    <Hr lineColor='#b3b3b3' text='Actions' textColor={'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + constants.PRIMARY_LIGHTNESS+ '%)'}/>
                    <TouchableHighlight style={[styles.clickable,
                        {
                            borderColor: 'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + constants.PRIMARY_LIGHTNESS+ '%)',
                        }

                    ]} onPress={(index)=>Communications.web(this.props.event.event.publisher_url)}>
                        <Text style={styles.action_link}> Venue Website: {this.props.event.event.publisher} <FontAwesome name='home' size={18}/></Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={[styles.clickable,{
                            borderColor: 'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + constants.PRIMARY_LIGHTNESS+ '%)',
                        }]} onPress={(index)=>Communications.web(this.props.event.event.url)} >
                    <Text style={styles.action_link}>Event Website <FontAwesome name='external-link' size={18}/></Text>
                        </TouchableHighlight>


                        <TouchableHighlight
                        onPress={(index)=>Communications.web('http://maps.google.com/maps?layer=c&cbll=' + this.props.event.event.latitude + ',' + this.props.event.event.longitude + '/')}
                    style={[styles.clickable, { borderColor: 'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + constants.PRIMARY_LIGHTNESS+ '%)'} ]}>
                        <Text style={styles.action_link}>Street View <FontAwesome size={18} name="street-view" color="#000"/></Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                        onPress={(index)=>Communications.web('https://maps.google.com/maps?daddr=' + encodeURI(this.props.event.event.address.replace(/\s+/gi, '+')) +  '/')}
                    style={[styles.clickable, { borderColor: 'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + constants.PRIMARY_LIGHTNESS+ '%)'} ]}>
                        <Text style={styles.action_link}>Directions <Ionicons size={18} name="md-map" color="#000"/></Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                        onPress={(index)=>Communications.web('https://m.uber.com/ul/?action=setPickup&dropoff[longitude]=' + this.props.event.event.longitude + '&dropoff[latitude]=' + this.props.event.event.latitude +  '&dropoff[formatted_address]=' + this.props.event.event.address.replace(/ /gi, '%20') +'&pickup=my_location&client_id=qnzCX5gbWpvalF4QpJw0EjRfqNbNIgSm')}
                    style={[styles.clickable, { borderColor: 'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + constants.PRIMARY_LIGHTNESS+ '%)'} ]}>
                        <Text style={styles.action_link}>Order Uber <Ionicons size={18} name="ios-car" color="#000"/></Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                        onPress={(index)=>Communications.web('https://calendar.google.com/calendar/gp#~calendar:view=e&bm=1?action=TEMPLATE&text=' + encodeURI(this.props.event.event.title.replace(/\s+/gi, '+')) + '&dates=' + moment(this.props.event.event.datetime).format("YYYYMMDD[T]HHmmssz/") + moment(this.props.event.event.datetime).add(1, "hours").format("YYYYMMDD[T]HHmmssz") + '&details=' + encodeURI(this.props.event.event.description.replace(/\s+/gi, '+')) + '&location=' + encodeURI(this.props.event.event.address.replace(/\s+/gi, '+')) + '&sf=true&output=xml')}
                    style={[styles.clickable, { borderColor: 'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + constants.PRIMARY_LIGHTNESS+ '%)'} ]}>
                        <Text style={styles.action_link}>Copy to Google Calendar <FontAwesome size={18} name="calendar-plus-o" color="#000"/></Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                        onPress={this.onOpenShare.bind(this)}
                    style={[styles.clickable, { borderColor: 'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + constants.PRIMARY_LIGHTNESS+ '%)'} ]}>
                        <Text style={styles.action_link}>Share <Ionicons size={18} name="md-share" color="#000"/></Text>
                        </TouchableHighlight>

                        <Hr lineColor='#b3b3b3' text='Location' textColor={'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + constants.PRIMARY_LIGHTNESS+ '%)'}/>
                        <Text style={styles.p}>{this.props.event.event.address}</Text>

                        <Hr lineColor='#b3b3b3' text='Categories' textColor={'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + constants.PRIMARY_LIGHTNESS+ '%)'}/>
                        <Text style={styles.p}>
                        { this.props.event.event.categories==null ?  "" : this.props.event.event.categories.join(" | ") }
                    </Text>
                        <Text style={styles.p}></Text>
                        <TouchableHighlight
                        style={[styles.clickable,{
                            marginBottom:20,
                            borderColor: 'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + constants.PRIMARY_LIGHTNESS+ '%)',
                        }]}
                    onPress={()=>this.props.navigator.pop()}>
                        <Text><FontAwesome name='chevron-left' color='#000000'/> BACK</Text>

                        </TouchableHighlight>
                        </View>
                        <ShareSheet style={{zIndex:99, position:'absolute'}} visible={this.state.share_visible} onCancel={this.onCancelShare.bind(this)}>
                        <Button iconSrc={{ uri: TWITTER_ICON }}
                    onPress={()=>{
                        this.onCancel();
                        setTimeout(() => {
                            Share.shareSingle(Object.assign(shareOptions, {
                                "social": "twitter"
                            }));
                        },300);
                    }}>Twitter</Button>
                    <Button iconSrc={{ uri: FACEBOOK_ICON }}
                    onPress={()=>{
                        this.onCancel();
                        setTimeout(() => {
                            Share.shareSingle(Object.assign(shareOptions, {
                                "social": "facebook"
                            }));
                        },300);
                    }}>Facebook</Button>
                    <Button iconSrc={{ uri: WHATSAPP_ICON }}
                    onPress={()=>{
                        this.onCancel();
                        setTimeout(() => {
                            Share.shareSingle(Object.assign(shareOptions, {
                                "social": "whatsapp"
                            }));
                        },300);
                    }}>Whatsapp</Button>
                    <Button iconSrc={{ uri: GOOGLE_PLUS_ICON }}
                    onPress={()=>{
                        this.onCancel();
                        setTimeout(() => {
                            Share.shareSingle(Object.assign(shareOptions, {
                                "social": "googleplus"
                            }));
                        },300);
                    }}>Google +</Button>
                    <Button iconSrc={{ uri: EMAIL_ICON }}
                    onPress={()=>{
                        this.onCancel();
                        setTimeout(() => {
                            Share.shareSingle(Object.assign(shareOptions, {
                                "social": "email"
                            }));
                        },300);
                    }}>Email</Button>
                    <Button
                        iconSrc={{ uri: CLIPBOARD_ICON }}
                    onPress={()=>{
                        this.onCancel();
                        setTimeout(() => {
                            if(typeof shareOptions["url"] !== undefined) {
                                Clipboard.setString(shareOptions["url"]);
                                if (Platform.OS === "android") {
                                    ToastAndroid.show('Link copiado al portapapeles', ToastAndroid.SHORT);
                                } else if (Platform.OS === "ios") {
                                    AlertIOS.alert('Link copiado al portapapeles');
                                }
                            }
                        },300);
                    }}>Copy Link</Button>
                    <Button iconSrc={{ uri: MORE_ICON }}
                    onPress={()=>{
                        this.onCancel();
                        setTimeout(() => {
                            Share.open(shareOptions)
                        },300);
                    }}>More</Button>
                    </ShareSheet>
                        </ScrollView>
                        )
    }
}

class Navi extends Component {
    constructor(props){
        super(props);
        this.state = {
            category: 'All',
            timeRange: 'now',
            search: '',
            lastUpdatedAt: 0
        };
    }

    /*Main navigator class, defines routes and everything */
    /*else. All other screens get called from here.*/
    render () {

        return (
                <Navigator initialRoute={{name: 'main'}}
                renderScene={this.renderScene.bind(this)}
                configureScene={(route, routeStack)=>
                    Navigator.SceneConfigs.PushFromRight
                } />
               );
    }

    renderScene(route, navigator) {
        if(route.name == 'main') {
            return <MyMapView navigator={navigator} parent={this}/>
        }
        if(route.name == 'event_details') {
            return <EventDetails navigator={navigator} parent={this} {...route.passProps}/>
        }
    }
}

module.exports = Navi
