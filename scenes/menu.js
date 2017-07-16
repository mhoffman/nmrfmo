'use strict';
import React, { PropTypes, Component } from 'react';
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

const styles = ReactNative.StyleSheet.create({
    menu: {
        flex: 1,
        flexDirection: 'column',
        width: window.width,
        height: window.height,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        padding: 20,
        zIndex: -10,
    },
    clickable: {
        borderWidth: 1.,
        borderRadius: 2,
        borderColor: PRIMARY_COLOR,
        padding: 2,
    },
    menuentry: {
        marginTop: 60,
        width: 120,
    },
    avatarContainer: {
        marginBottom: 20,
        marginTop: 20,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        flex: 1,
    },
    name: {
        position: 'absolute',
        left: 70,
        top: 20,
    },
    item: {
        fontSize: 14,
        fontWeight: '300',
        paddingTop: 5,
    },
});

const menuStyle = ReactNative.StyleSheet.create({
    menuList : {
        backgroundColor: 'red',
    }
});



// Create a graph request asking for user information with a callback to handle the response.

class FBLogin extends Component {
    constructor(props) {
        super(props);
        this.handleUserEvents = this.handleUserEvents.bind(this);
    }
    //Create response callback.
    async responseInfoCallback(error, result) {
        if (error) {
            console.log('Error fetching data: ' + error.toString());
            console.log(error);
        } else {
            console.log('Success fetching data: ' + result.toString());
            console.log(result);
        }
    }

    async handleUserEvents(error, result){
        if (error) {
            console.log('Error fetching data: ' + error.toString());
            console.log(error);
        } else {
            /*console.log('Success fetching data: ' + result.toString());*/
            /*console.log(result);*/
            result.data.map((event, ievent) =>{
            });
            /*console.log("PROCESSING PRIVATE MEETINGS");*/
            /*console.log(result.data);*/
            AccessToken.getCurrentAccessToken().then( (data) =>{
                console.log(data.accessToken.toString());
                this.props.parent.setState({accessToken: data.accessToken.toString()})
            });
            try {
                const private_meetings = await result.data
                    .filter((event) => {
                        /*console.log(moment(event.start_time));*/
                        /*console.log(event.start_time);*/
                        /*console.log(event.hasOwnProperty('place')*/
                        /*&& event.place.hasOwnProperty('location')*/
                        /*&& event.hasOwnProperty('start_time')*/
                        /*&& (moment(event.start_time) > moment().startOf('day').subtract(1, 'day').toDate())*/
                        /*);*/
                        return (event.hasOwnProperty('place')
                            && event.place.hasOwnProperty('location')
                            && event.hasOwnProperty('start_time')
                            && (moment(event.start_time) > moment().startOf('day').subtract(1, 'day').toDate()));
                    })
                    .map((event, ievent) =>{
                        return {
                            lon: event.place.location.longitude,
                            lat: event.place.location.latitude,
                            title: event.name,
                            description: event.description,
                            url: 'https://www.facebook.com/events/' + event.id + '/',
                            cost: '',
                            publisher: 'Facebook',
                            publisher_url: 'https://facebook.com',
                            datetime: moment(event.start_time).toDate(),
                            address: '' + event.place.name + ', ' + event.place.location.street + ', ' + ', ' + event.place.location.city + ', ' + event.place.location.state + ', ' + event.place.location.zip,

                        };
                    });
                this.props.parent.props.parent.setState({private_meetings});
                /*console.log("SET PRIVATE MEETINGS");*/
                /*console.log(private_meetings);*/
                /*console.log(this.props.parent.props.parent.state);*/
            } catch (error) {
                console.log("ASYNC ERROR");
                console.log(error);
            }
        }
    }

    render() {
        return (<ReactNative.View>
            <LoginButton
            readPermissions={["public_profile", "user_events"]}
            onLoginFinished={
                (error, result) => {
                    if (error) {
                        /*console.log("Login failed with error: " + result.error);*/
                    } else if (result.isCancelled) {
                        /*console.log("Login was cancelled");*/
                    } else {
                        console.log("Login was successful with permissions: " + result.grantedPermissions);
                        console.log("USER LOGGED INTO FACEBOOK");
                        console.log(result);
                        new GraphRequestManager().addRequest(new GraphRequest( '/me', null, _responseInfoCallback)).start();
                        new GraphRequestManager().addRequest(new GraphRequest( '/me/events', null, this.handleUserEvents)).start();
                    }
                }
            }
            onLogoutFinished={() => console.log("User logged out")}/>
            </ReactNative.View>
        );
    }
}




/*module.exports = class Menu extends Component {*/
class Menu extends Component {
    constructor(props){
        super(props);
        /*console.log("MENU PARENT");*/
        /*console.log(this);*/
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

    _fetchGoogleCalenderEvents = async () => {
        const timeMin = moment.tz().add(-5, 'hours').format()
        const timeMax = moment.tz().add(1, 'weeks').format()
        const user_email = this.props.googleUser.email;
        const url = 'https://www.googleapis.com/calendar/v3/calendars/' + user_email + '/events?' + params({
            timeMin: timeMin,
            timeMax: timeMax
        });
        console.log(url)
        console.log("BLAG")
        let eventList = await fetch(url, {
            method: 'GET',
            headers: { Authorization: `Bearer ${this.props.googleAccessToken}`},

        },
        );
        console.log(JSON.stringify(JSON.parse(eventList._bodyInit), null, '\t'));
        /*console.log(Object.keys(JSON.parse(eventList._bodyInit).items))*/
        console.log(Object.keys(JSON.parse(eventList._bodyInit).items[0]))
        console.log("PREPARING PRIVATE EVENTS REPACKAGE")
        var privateGoogleEvents = []
        JSON.parse(eventList._bodyInit).items.map(function(event){
            console.log(event.summary)
            console.log(event.summary)
            console.log(event.location);
            console.log(JSON.stringify(event, null, '\t'));

            if(event.location!==undefined){
                console.log(app_constants.backend_url + '/_reverse_geocode');
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
                    .then((response) => { console.log(response); return response.json(); })
                    .then((response)=>{
                        console.log(JSON.stringify(response, null, '\t'));
                        let gps_location = response
                        if(gps_location!==undefined){

                            let privateGoogleEvent = ({
                                categories : ["Private"],
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
                            console.log(privateGoogleEvent);
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        });
        this.props.saveGoogleCalendarEvents(privateGoogleEvents)

    };
    _unlinkGoogleLogin = async () => {
        this.props.changeGoogleAccessToken('')
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
                    this.props.changeGoogleAccessToken(accessToken)
                    ReactNative.Alert.alert(
                        'Logged in!',
                        `Hi ${user.name}!`,
                    );
                    console.log(JSON.stringify(user))
                    console.log("Access Token")
                    console.log(accessToken)
                    /*let calendarList = await fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', {*/
                    /*headers: { Authorization: `Bearer ${accessToken}`}, })*/
                    /*console.log(JSON.stringify(calendarList))*/
                    /*console.log((JSON.parse(calendarList._bodyInit).items))*/
                    /*console.log(user.id)*/
                    /*console.log(JSON.stringify(user))*/
                    /*Object.keys(eventList._bodyInit).map((event_i)=>{*/
                    /*console.log(eventList._bodyInit['' + event_i ]);*/
                    /*});*/
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


    render() {
        return (
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
            {moment(this.state.startTime, 'HH').format('h A')} to {moment(this.state.endTime, 'HH').format('h A')}</ReactNative.Text>
            <ReactNative.View
            style={{
                /*borderWidth: 1,*/
            }}
            >
            </ReactNative.View>

            <MultiSlider
            values={[this.state.startTime, this.state.endTime]}
            markerStyle={{
                height: 30,
                    width: 30,
            }}
            min={0}
            max={24}
            sliderLength={280}
            /*onValuesChange={this.onTimeRangeSliderChange.bind(this)}*/
            onChange={(hours)=>this.props.changeHours(hours)}
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
            {/*

                        <ReactNative.View>

                        <ReactNative.Text>
                        {this.state.what}
                        </ReactNative.Text>
                        {this.state.what.match(/[0-9]+/)!=null ?
                        <ReactNative.Text>
                        Found {this.state.what.match(/[0-9]+/)[0]} events
                        </ReactNative.Text>
                        :
                        null
                        }
                        </ReactNative.View>
                        */}
            {/*}

                   <ReactNative.TextInput
                   ref='VenueFeedback'
                   style={{
                   marginBottom:20,
                   height:60
                   }}
                   placeholder="Suggest a venue."
                   onSubmitEditing={this.venueFeedback.bind(this)}
                   />

                   <ReactNative.Text>Private Events</ReactNative.Text>
                   <FBLogin parent={this}/>
                   */}


            <ReactNative.TouchableOpacity style={[styles.menuentry,styles.clickable]}
            /*onPress={()=> Communications.web('https://goo.gl/forms/tusQJD96Z40jF9A72') }*/
            onPress={(index)=>{ this.navigate.bind(this, "web_preview", {url: "https://goo.gl/forms/tusQJD96Z40jF9A72", title: "Add a Venue"})(); }}
            >
            <ReactNative.Text>
            <VectorIcons.MaterialIcons name='add-circle-outline' color='#000000' size={20}/> Add a Venue
            </ReactNative.Text>
            </ReactNative.TouchableOpacity>

            {  this.props.googleAccessToken == '' ?
                <ReactNative.Button
                onPress={this._handleGoogleLogin}
                title="Integrate with Google Calendar"
                style={{
                    marginTop: 10
                }}
                />
                :
                <ReactNative.View>
                <ReactNative.Button
                onPress={this._unlinkGoogleLogin}
                title="Unlink Google Calendar"
                style={{
                    marginTop: 10
                }}
                />
                <ReactNative.Button
                onPress={this._fetchGoogleCalenderEvents}
                title="Reload Calendar Events"
                style={{
                    marginTop: 10
                }}
                />
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
            );
    };
};

const mapStateToProps = (state, ownProps) => {
    const { eventTimerange, eventCategory, eventSearchstring, eventHours } = state.filterReducer
    const { googleAccessToken, googleUser } = state.userReducer
    return { eventTimerange, eventCategory, eventSearchstring, eventHours, googleAccessToken, googleUser }
}


const mapDispatchToProps = (dispatch) => {
    return {
        changeGoogleAccessToken: (token) => {
            dispatch(actions.changeGoogleAccessToken(token))
        },
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
        saveGoogleCalendarEvent: (events) => {
            dispatch(actions.saveGoogleCalendarEvents(events))
        },
        saveGoogleUser: (user) => {
            dispatch(actions.saveGoogleUser(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
