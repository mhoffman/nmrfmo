'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';
import Communications from 'react-native-communications';
import ModalPicker from 'react-native-modal-picker';
import { connect } from 'react-redux'
import Exponent from 'expo'
import VectorIcons from '@expo/vector-icons';
import moment from 'moment-timezone';

import DrawerLayout from 'react-native-drawer-layout'
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import _ from 'lodash';
import params from 'jquery-param'
import app from '../app.json';


import constants from './constants'
import * as actions from '../store/actions'
import WebPreview from './web_preview'
import styles from './styles';

import app_constants from '../constants.json'


const PRIMARY_COLOR = constants.PRIMARY_COLOR;
/*const FBSDK = require('react-native-fbsdk');*/
/*const {*/
/*AccessToken,*/
/*LoginButton,*/
/*GraphRequest,*/
/*GraphRequestManager,*/
/*} = FBSDK;*/


import t from 'tcomb-form-native';
var form_styles = t.form.Form.stylesheet;

form_styles.select.normal.borderColor = 'black';
form_styles.select.normal.backgroundColor = 'white';


var Form = t.form.Form;
const options = {
    order: ['when', 'what'],
    fields: {
        when: {
            nullOption: false,
            stylesheet: form_styles,
        },
        what: {
            nullOption: false,
            stylesheet: form_styles,
        },
    }
}

const window = ReactNative.Dimensions.get('window');
const uri = 'http://pickaface.net/includes/themes/clean/img/slide2.png';

const menuStyle = ReactNative.StyleSheet.create({
    menuList : {
        backgroundColor: 'red',
    }
});

let _facebookEventsFollowUp = async (url) => {
    fetch(url)
        .then((response)=>response.json())
        .then((response)=>{
        })
        .catch(e=>{
        });
}

/*module.exports = class Menu extends Component {*/
class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            accessToken: '',
            startTime: 0,
            endTime: 24,
            when: this.props.eventTimerange,
            what: this.props.eventCategory,
            value: {
                lastUpdatedAt: 0,
                search: this.props.parent.props.parent.state.search,
            },

        }
        this.handleBack = (() => {
            if(this.props.parent.state.isOpen){
                this.props.parent._drawerLayout.closeDrawer();
                this.props.parent.toggle();
                return true;
            } else {
                return false;
            }
        }).bind(this) ;
    };
    navigate(routeName, passProps) {
        this.props.navigator.push({
            name: routeName,
            passProps: passProps
        });
    }
    componentDidMount() {
        ReactNative.BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    componentWillUnmount() {
        ReactNative.BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }
    onTimeRangeSliderChange(values){
        const start = values[0];
        const end = values[1];

        this.setState({
            startTime: values[0],
            endTime: values[1],
        });

        this.props.parent.props.parent.setState({
            startTime: start,
            endTime: end,
        });
        this.props.parent.getCategoryCount();
    };

    textSearch(event){
        let search = event.nativeEvent.text;
        if(search.length > 0){
            this.props.parent.props.parent.setState({lastUpdatedAt: 0, search: search});
        }else{
            this.props.parent.props.parent.setState({lastUpdatedAt: 0, search: ''});
        }
        this.props.parent.getCategoryCount();
    };

    venueFeedback(event){
        this.refs.VenueFeedback.clear()
        let feedback = event.nativeEvent.text;
        let url = app_constants.backend_url + '/venue_feedback?feedback=' + encodeURI(feedback);
        fetch (url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'GET'
        })
            .then((response) => response.json())
            .then((response) => {
                /*console.log(response)*/
                Alert.alert(
                    'Feedback',
                    response.message
                )
            })
    };

    _fetchFacebookEvents = async () => {
        let url = `https://graph.facebook.com/me/events?access_token=${this.props.facebookAccessToken}`
        _facebookEventsFollowUp(url)
    };



    _fetchGoogleCalendarEvents = async () => {
        this.props.purgeGoogleCalendarEvents()
        const timeMin = moment.tz().add(-5, 'hours').format()
        const timeMax = moment.tz().add(1, 'weeks').format()
        const user_email = this.props.googleUser.email;
        const url = 'https://www.googleapis.com/calendar/v3/calendars/' + user_email + '/events?' + params({
            timeMin: timeMin,
            timeMax: timeMax
        });
        let eventList = await fetch(url, {
            method: 'GET',
            headers: { Authorization: `Bearer ${this.props.googleAccessToken}`},

        },
        );
        /*console.log(Object.keys(JSON.parse(eventList._bodyInit).items))*/
        var privateGoogleEvents = []
        let self = this;
        JSON.parse(eventList._bodyInit).items.map(function(event){

            if(event.location!==undefined){
                fetch((app_constants.backend_url + '/_reverse_geocode'), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        address: event.location
                    })}
                )
                    .then((response) => { return response.json(); })
                    .then((response)=>{
                        let gps_location = response
                        if(gps_location!==undefined){

                            let privateGoogleEvent = ({
                                count: 1,
                                categories : ["Personal"],
                                title: event.summary,
                                address: event.location,
                                description: event.description,
                                url: event.htmlLink,
                                publisher_url: 'https://calendar.google.com',
                                publisher: 'Google Calendar [' + user_email + ']',
                                datetime: event.start.dateTime,
                                lon: gps_location.lon,
                                lat: gps_location.lat,
                                image_url: 'http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/512/calendar-icon.png',
                                location: {type: "Point",
                                    coordinates: [gps_location.lat, gps_location.lon]
                                }
                            });
                            privateGoogleEvents.push(privateGoogleEvent);
                            self.props.saveGoogleCalendarEvent(privateGoogleEvent);
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        });
        /*this.props.saveGoogleCalendarEvents(privateGoogleEvents)*/

    };
    _unlinkFacebookLogin = async () => {
        this.props.saveFacebookAccessToken('')
    };
    _unlinkGoogleLogin = async () => {
        this.props.saveGoogleAccessToken('')
    };
    _handleGoogleLogin = async () => {
        try {
            const { type, accessToken, user, refreshToken } = await Exponent.Google.logInAsync({
                androidStandaloneAppClientId: '<ANDROID_CLIENT_ID>',
                iosStandaloneAppClientId: '<IOS_CLIENT_ID>',
                androidClientId: "320954026159-1sfn8nh9gbsm9dbep2gncfnng6sep9he.apps.googleusercontent.com",
                iosClientId: "320954026159-c32fsv04hl9429shhortdn7upgi9agkt.apps.googleusercontent.com",
                scopes: ['profile', 'email', 'https://www.googleapis.com/auth/calendar']
            });

            switch (type) {
                case 'success': {
                    this.props.saveGoogleUser(user)
                    this.props.saveGoogleAccessToken(accessToken)
                    ReactNative.Alert.alert(
                        'Logged in!',
                        `Hi ${user.name}!`,
                    );
                    break;
                }
                case 'cancel': {
                    ReactNative.Alert.alert(
                        'Cancelled!',
                        'Login was cancelled!',
                    );
                    break;
                }
                default: {
                    ReactNative.Alert.alert(
                        'Oops!',
                        'Login failed!' + e,
                    );
                }
            }
        } catch (e) {
            ReactNative.Alert.alert(
                'Oops!',
                'Login failed!' + e,
            );
        }
    };
    _handleFacebookLogin = async () => {
        try {
            const { type, token } = await Exponent.Facebook.logInWithReadPermissionsAsync(
                '1666953796951055', // Replace with your own app id in standalone app
                { permissions: ['public_profile', 'user_events'] }
            );
            this.props.saveFacebookAccessToken(token)

            switch (type) {
                case 'success': {
                    // Get the user's name using Facebook's Graph API
                    const profile_url = `https://graph.facebook.com/me?access_token=${token}`
                    fetch(profile_url,{
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        method: 'GET'
                    })
                        .then((response)=>response.json())
                        .then((profile)=>{
                            this.props.saveFacebookUser(profile)
                            ReactNative.Alert.alert(
                                'Logged in!',
                                `Hi ${profile.name}!`,
                            );
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                    break;
                }
                case 'cancel': {
                    Alert.alert(
                        'Cancelled!',
                        'Login was cancelled!',
                    );
                    break;
                }
                default: {
                    Alert.alert(
                        'Oops!',
                        'Login failed!',
                    );
                }
            }
        } catch (e) {
            Alert.alert(
                'Oops!',
                'Login failed!',
            );
        }
    };


    render() {
        return (
            <ReactNative.ScrollView
            style={{
                flex: 1
            }}
            >
            <ReactNative.View style={[styles.menu]}>

            <ReactNative.View
            style={{
                flex: 0,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    /*borderWidth: 1,*/
            }}
            >
            <ReactNative.TouchableOpacity
            onPress={()=>{
                this.props.parent._drawerLayout.closeDrawer();
                this.props.parent.toggle();
            }}
            style={{
                flex: 1,
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    marginTop: 20,
                    marginBottom: 20,
                    /*borderWidth: 1,*/
            }}
            >
            <VectorIcons.MaterialIcons name='chevron-left' size={30}
            /><ReactNative.Text
            style={{
                fontSize: 20
            }}
            > back</ReactNative.Text>
            </ReactNative.TouchableOpacity>
            </ReactNative.View>


            <ReactNative.View
            style={{
                /*borderWidth: 1*/
            }}
            >
            <ReactNative.View
            style={{
                /*borderWidth: 1,*/
            }}
            >
            <ReactNative.TextInput
            autCorrect={true}
            style={{
                borderWidth: 1,
                    borderColor: '#ccc',
                    height:40,
                    width: 280,
                    paddingLeft: 10,
                    fontSize: 18,
            }}
            placeholder="Keywords ..."
            onSubmitEditing={this.textSearch.bind(this)}
            />
            </ReactNative.View>
            <ModalPicker
            data={this.props.parent.state.when}
            key={"whenPicker"}
            initValue="When"
            onChange={(timerange)=>this.props.changeTimerange(timerange)}
            >
            {
                <ReactNative.Text
                style={{marginTop: 10,
                        marginBottom: 10,
                        borderWidth:1,
                        borderColor:'#ccc',
                        padding:10,
                        height:45,
                        fontSize: 18,
                        width: 280}}
                editable={false}
                value={this.props.eventTimerange.key}
                >
                {this.props.eventTimerange.label} <VectorIcons.FontAwesome name='chevron-right' color='#000000'/>
                </ReactNative.Text>
            }
            </ModalPicker>
            </ReactNative.View>

            <ReactNative.View style={{
                /*borderWidth: 1,*/
            }}>
            <ReactNative.Text
            style={{
                marginBottom: 30,
                    fontSize: 18,
                    marginTop: 15,
                    /*borderWidth: 1,*/

            }}
            >
            <ReactNative.Text style={{
                fontWeight: 'bold',
            }}>Time Range: </ReactNative.Text>
            {moment(this.props.eventHours.start, 'HH').format('h A')} to {moment(this.props.eventHours.end, 'HH').format('h A')}</ReactNative.Text>
            <ReactNative.View
            style={{
                /*borderWidth: 1,*/
            }}
            >
            </ReactNative.View>

            <MultiSlider
            values={[this.props.eventHours.start, this.props.eventHours.end]}
            markerStyle={{
                height: 30,
                    width: 30,
            }}
            min={0}
            max={24}
            sliderLength={280}
            /*onValuesChange={this.onTimeRangeSliderChange.bind(this)}*/
            onValuesChangeFinish={(hours)=>{
                this.props.changeHours(hours);
            }}
            />


            <ModalPicker
            data={this.props.parent.state.what}
            key={"whatPicker"}
            initValue="What"
            onChange={(category)=>this.props.changeCategory(category)}
            >
            <ReactNative.Text
            style={{marginTop: 10,
                    marginBottom: 10,
                    borderWidth:1,
                    borderColor:'#ccc',
                    padding:10,
                    height:45,
                    fontSize: 18,
                    width: 280}}
            editable={false}
            value={this.props.eventCategory.key}
            >
            {this.props.eventCategory.key} <VectorIcons.FontAwesome name='chevron-right' color='#000000'/>
            </ReactNative.Text>
            </ModalPicker>
            </ReactNative.View>

            <ReactNative.TouchableOpacity style={[styles.menuentry,styles.clickable, {
                paddingBottom: 25
            }]}
            /*onPress={()=> Communications.web('https://goo.gl/forms/tusQJD96Z40jF9A72') }*/
            onPress={(index)=>{ this.navigate.bind(this, "web_preview", {url: "https://goo.gl/forms/tusQJD96Z40jF9A72", title: "Add a Venue"})(); }}
            >
            <ReactNative.Text>
            <VectorIcons.MaterialIcons name='add-circle-outline' color='#000000' size={20}/> Add a Venue
            </ReactNative.Text>
            </ReactNative.TouchableOpacity>

            { this.props.facebookAccessToken == ''?
                <ReactNative.View
                style={{ flex: 1, flexDirection: 'row' }}
                >
                <ReactNative.TouchableHighlight
                onPress={this._handleFacebookLogin} >
                <ReactNative.Text style={styles.button}>Integrate with Facebook</ReactNative.Text>
                </ReactNative.TouchableHighlight>
                </ReactNative.View>
                :
                <ReactNative.View
                style={{ flex: 1, flexDirection: 'row' }}
                >
                <ReactNative.Text>Facebook</ReactNative.Text>
                <ReactNative.TouchableHighlight onPress={this._unlinkFacebookLogin}>
                <ReactNative.Text style={styles.button}>Unlink <VectorIcons.Foundation name='unlink' size={12}/></ReactNative.Text>
                </ReactNative.TouchableHighlight>

                <ReactNative.TouchableHighlight onPress={this._fetchFacebookEvents}>
                <ReactNative.Text style={styles.button}>Reload <VectorIcons.SimpleLineIcons name='reload' size={12} /></ReactNative.Text>
                </ReactNative.TouchableHighlight>

                </ReactNative.View>
            }


            {  this.props.googleAccessToken == '' ?
                    <ReactNative.View
                style={{ flex: 1, flexDirection: 'row' }}
                    >
                    <ReactNative.TouchableHighlight onPress={this._handleGoogleLogin} >
                    <ReactNative.Text style={styles.button}>Integrate with GCalendar</ReactNative.Text>
                    </ReactNative.TouchableHighlight>
                    </ReactNative.View>
                    :
                    <ReactNative.View
                style={{ flex: 1, flexDirection: 'row' }}
                    >
                    <ReactNative.Text>GCalendar</ReactNative.Text>

                    <ReactNative.TouchableHighlight  onPress={this._unlinkGoogleLogin} >
                    <ReactNative.Text style={styles.button}>Unlink <VectorIcons.Foundation name='unlink' size={12}/></ReactNative.Text>
                    </ReactNative.TouchableHighlight>

                    <ReactNative.TouchableHighlight onPress={this._fetchGoogleCalendarEvents} >
                    <ReactNative.Text style={styles.button}>Reload <VectorIcons.SimpleLineIcons name='reload' size={12} /></ReactNative.Text>
                    </ReactNative.TouchableHighlight>

                    </ReactNative.View>
            }
            {/*
                    <ReactNative.TouchableOpacity style={[styles.menuentry,styles.clickable]} onPress={()=>*/
                /*Communications.email(*/
                /*['feedback@nmrfmo.33mail.com'],*/
                /*null,*/
                /*null,*/
                /*'nmrfmo Feedback',*/
                /*'Have you found a bug or miss a venue? Thx. Max.'*/
                /*)*/
                /*}>*/
                /*<ReactNative.Text>*/
                /*Feedback    <FontAwesome name='envelope-o' color='#000000' size={20}/>*/
                /*</ReactNative.Text>*/
            /*</ReactNative.TouchableOpacity>*/}


                </ReactNative.View>
                    </ReactNative.ScrollView>
            );
    };
};

const mapStateToProps = (state, ownProps) => {
    const { eventTimerange, eventCategory, eventSearchstring, eventHours } = state.filterReducer
    const { googleAccessToken, googleUser, facebookAccessToken, facebookUser } = state.userReducer
    return { eventTimerange, eventCategory, eventSearchstring, eventHours, googleAccessToken, googleUser, facebookAccessToken }
}


const mapDispatchToProps = (dispatch) => {
    return {
        changeTimerange: (timerange) => {
            dispatch(actions.changeEventTimerange(timerange))
        },
        changeCategory: (category) => {
            dispatch(actions.changeEventCategory(category))
        },
        changeHours: (values) => {
            dispatch(actions.changeEventHours(values))
        },
        changeSearchstring: (searchstring) => {
            dispatch(actions.changeEventSearchstring(searchstring))
        },
        saveGoogleAccessToken: (token) => {
            dispatch(actions.saveGoogleAccessToken(token))
        },
        saveGoogleCalendarEvents: (events) => {
            dispatch(actions.saveGoogleCalendarEvents(events))
        },
        saveGoogleCalendarEvent: (event) => {
            dispatch(actions.saveGoogleCalendarEvent(event))
        },
        purgeGoogleCalendarEvents: () => {
            dispatch(actions.purgeGoogleCalendarEvents())
        },
        saveGoogleUser: (user) => {
            dispatch(actions.saveGoogleUser(user))
        },
        saveFacebookAccessToken : (token) => {
            dispatch(actions.saveFacebookAccessToken(token))
        },
        saveFacebookUser : (user) => {
            dispatch(actions.saveFacebookUser(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
