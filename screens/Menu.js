'use strict';
import React, { PropTypes, Component } from 'react';
import {
    Alert,
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    InteractionManager,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import Communications from 'react-native-communications';
import { FontAwesome } from '@exponent/vector-icons';
import moment from 'moment-timezone';


import constants from './constants'


const PRIMARY_COLOR = constants.PRIMARY_COLOR;
const FBSDK = require('react-native-fbsdk');
const {
    AccessToken,
    LoginButton,
    GraphRequest,
    GraphRequestManager,
} = FBSDK;





var t = require('tcomb-form-native');
var Form = t.form.Form;
const options = {
    order: ['when', 'what'],
    fields: {
        when: {
            nullOption: false,
        },
        what: {
            nullOption: false,
        },
    }
}

const window = Dimensions.get('window');
const uri = 'http://pickaface.net/includes/themes/clean/img/slide2.png';

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: window.width,
        height: window.height,
        backgroundColor: 'white',
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

const menuStyle = StyleSheet.create({
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
        return (<View>
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
                </View>
               );
    }
}




/*module.exports = class Menu extends Component {*/
export default class Menu extends Component {
    constructor(props){
        super(props);
        /*console.log("MENU PARENT");*/
        /*console.log(this);*/
        this.state = {
            accessToken: '',
            value: {
                when: this.props.parent.props.parent.state.timeRange,
                lastUpdatedAt: 0,
                what: this.props.parent.props.parent.state.category,
                search: this.props.parent.props.parent.state.search,
            },

        }
    };
    onChange(value){
        /*if(this.state.value.when !== value.when){*/
        /*if(JSON.stringify(this.state.value) !== JSON.stringify(value)){*/
        this.setState({value});
        if(true){
            InteractionManager.runAfterInteractions(()=>{
                this.props.parent.setState({meetings: []});
                this.props.parent.props.parent.setState({lastUpdatedAt: 0, timeRange: value.when, category: value.what, search: ''});
                this.props.parent.setState({event: {title: ''}})
            });
        }
    };

    textSearch(event){
        let search = event.nativeEvent.text;
        if(search.length > 0){
            this.props.parent.props.parent.setState({lastUpdatedAt: 0, search: search, timeRange: 'personal'});
        }else{
            this.props.parent.props.parent.setState({lastUpdatedAt: 0, search: ''});
        }
    };

    venueFeedback(event){
        this.refs.VenueFeedback.clear()
            let feedback = event.nativeEvent.text;
        let url = 'https://nomorefomo.herokuapp.com/venue_feedback?feedback=' + encodeURI(feedback);
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

    render() {
        return (
                <View style={[styles.menu,
                    {
                        paddingTop:50
                    }
                ]}>
                <TextInput
                style={{marginBottom:20, height:60}}
                placeholder="Search events"
                onSubmitEditing={this.textSearch.bind(this)}
                />

                <Form ref="form"
                type={this.props.EventSelection}
                style={menuStyle.menuList}
                options={options}
                onChange={this.onChange.bind(this)}
                value={this.state.value} />

                <TextInput
                ref='VenueFeedback'
                style={{marginBottom:20,height:60}}
                placeholder="Suggest a venue."
                    onSubmitEditing={this.venueFeedback.bind(this)}
                />

                {/*}
                   <Text>Private Events</Text>
                   <FBLogin parent={this}/>
                   */}



                {/*<TouchableOpacity style={[styles.menuentry,styles.clickable]} onPress={()=>*/
                    /*Communications.email(*/
                    /*['feedback@nmrfmo.33mail.com'],*/
                    /*null,*/
                    /*null,*/
                    /*'nmrfmo Feedback',*/
                    /*'Have you found a bug or miss a venue? Thx. Max.'*/
                    /*)*/
                    /*}>*/
                    /*<Text>*/
                    /*Feedback    <FontAwesome name='envelope-o' color='#000000' size={20}/>*/
                    /*</Text>*/
                    /*</TouchableOpacity>*/}


                </View>
                    );
    };
    };
