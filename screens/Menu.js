'use strict';
import React, { PropTypes, Component } from 'react';
import {
    Alert,
    Dimensions,
    Picker,
    StyleSheet,
    ScrollView,
    View,
    Image,
    InteractionManager,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import ReactNative from 'react-native';
import Communications from 'react-native-communications';
import ModalPicker from 'react-native-modal-picker';
import { FontAwesome } from '@expo/vector-icons';
import VectorIcons from '@expo/vector-icons';
import moment from 'moment-timezone';

import DrawerLayout from 'react-native-drawer-layout'
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import _ from 'lodash';


import constants from './constants'


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

const window = Dimensions.get('window');
const uri = 'http://pickaface.net/includes/themes/clean/img/slide2.png';

const styles = StyleSheet.create({
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
            startTime: 0,
            endTime: 24,
            when: this.props.parent.props.parent.state.timeRange,
            what: this.props.parent.props.parent.state.category,
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
    componentDidMount() {
        ReactNative.BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    componentWillUnmount() {
        ReactNative.BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }
    onChangeWhat(option){
        this.setState({
            what: option.label
        });
        InteractionManager.runAfterInteractions(()=>{
            this.props.parent.props.parent.setState({
                category: option.key
            })
        });

    };
    onChangeWhen(option){
        this.setState({
            when: option.label
        });
        InteractionManager.runAfterInteractions(()=>{
            this.props.parent.props.parent.setState({
                timeRange: option.key
            });
            this.props.parent.getCounts();
        });
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
                <View style={[styles.menu]}>

                <View
                style={{
                    flex: 0,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    /*borderWidth: 1,*/
                }}
                >
                <TouchableOpacity
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
                /><Text
                    style={{
                        fontSize: 20
                    }}
                > back</Text>
                    </TouchableOpacity>
                    </View>


                    <View
                    style={{
                        /*borderWidth: 1*/
                    }}
                >
                    <View
                    style={{
                        /*borderWidth: 1,*/
                    }}
                >
                    <TextInput
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
                    </View>
                    <ModalPicker
                    data={this.props.parent.state.when}
                key={"whenPicker"}
                initValue="When"
                    onChange={this.onChangeWhen.bind(this)}
                >
                {
                    <Text
                        style={{marginTop: 10,
                            marginBottom: 10,
                            borderWidth:1,
                            borderColor:'#ccc',
                            padding:10,
                            height:45,
                            fontSize: 18,
                            width: 280}}
                    editable={false}
                    value={this.state.when}
                    >
                    {this.state.when} <VectorIcons.FontAwesome name='chevron-right' color='#000000'/>
                    </Text>
                }
                </ModalPicker>
                    </View>

                    <View style={{
                        /*borderWidth: 1,*/
                    }}>
                <Text
                    style={{
                        marginBottom: 30,
                        fontSize: 18,
                        marginTop: 15,
                        /*borderWidth: 1,*/

                    }}
                >
                    <Text style={{
                        fontWeight: 'bold',
                    }}>Time Range: </Text>
                {moment(this.state.startTime, 'HH').format('h A')} to {moment(this.state.endTime, 'HH').format('h A')}</Text>
                <View
                    style={{
                        /*borderWidth: 1,*/
                    }}
                >
                    </View>

                    <MultiSlider
                    values={[this.state.startTime, this.state.endTime]}
                markerStyle={{
                    height: 30,
                    width: 30,
                }}
                min={0}
                max={24}
                sliderLength={280}
                onValuesChange={this.onTimeRangeSliderChange.bind(this)}
                />


                    <ModalPicker
                    data={this.props.parent.state.what}
                key={"whatPicker"}
                initValue="What"
                    onChange={this.onChangeWhat.bind(this)}
                >
                    <Text
                    style={{marginTop: 10,
                        marginBottom: 10,
                        borderWidth:1,
                        borderColor:'#ccc',
                        padding:10,
                        height:45,
                        fontSize: 18,
                        width: 280}}
                editable={false}
                value={this.state.what}
                >
                {this.state.what} <VectorIcons.FontAwesome name='chevron-right' color='#000000'/>
                </Text>
                    </ModalPicker>
                    </View>
                    {/*

                        <View>

                        <Text>
                        {this.state.what}
                        </Text>
                        {this.state.what.match(/[0-9]+/)!=null ?
                        <Text>
                        Found {this.state.what.match(/[0-9]+/)[0]} events
                        </Text>
                        :
                        null
                        }
                        </View>
                        */}
                {/*}

                   <TextInput
                   ref='VenueFeedback'
                   style={{
                   marginBottom:20,
                   height:60
                   }}
                   placeholder="Suggest a venue."
                   onSubmitEditing={this.venueFeedback.bind(this)}
                   />

                   <Text>Private Events</Text>
                   <FBLogin parent={this}/>
                   */}


                    <TouchableOpacity style={[styles.menuentry,styles.clickable]} onPress={()=>
                        Communications.web('https://goo.gl/forms/tusQJD96Z40jF9A72')
                    }>
                    <Text>
                        <VectorIcons.MaterialIcons name='add-circle-outline' color='#000000' size={20}/> Add a Venue
                        </Text>
                        </TouchableOpacity>


                {/*
                    <TouchableOpacity style={[styles.menuentry,styles.clickable]} onPress={()=>*/
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
