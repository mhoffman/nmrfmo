'use strict';
import React, { Component } from 'react';
import {
    Alert,
    AlertIOS,
    Animated,
    AppRegistry,
    BackAndroid,
    Clipboard,
    Dimensions,
    Image,
    InteractionManager,
    ListView,
    Navigator,
    Platform,
    PropTypes,
    Share,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableHighlight,
    TouchableOpacity,
    View

} from 'react-native';
import ReactNative from 'react-native';
import Exponent from 'expo'

import constants from './constants';
import Hr from 'react-native-hr';
import UpdatingListView from './vendor/UpdatingListView'
import CryptoJS from 'crypto-js'

import _ from 'lodash'

import DrawerLayout from 'react-native-drawer-layout'
import Communications from 'react-native-communications';
import SideMenu from 'react-native-side-menu'
import { FontAwesome, Ionicons, MaterialIcons, Foundation, SimpleLineIcons } from '@expo/vector-icons';
import VectorIcons from '@expo/vector-icons'
import { Components, Location, Permissions } from 'expo';

const window = ReactNative.Dimensions.get('window');
const BOTTOM_HEIGHT = 270;
const LISTVIEW_BORDER = 15
const PRIMARY_COLOR = constants.PRIMARY_COLOR;
const LOCATION_RADIUS = 5e-4
/*const LISTVIEW_BLOCKWIDTH  = window.width/1.5*/
const LISTVIEW_BLOCKWIDTH  = 240 // keep fixed for better optimizing pictures

import Menu from './Menu'
import CustomCallout from './CustomCallout'

var t = require('tcomb-form-native');
var what = [
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

class ReportEventError extends React.Component {
    constructor(props){
        super(props);
    }
    send_feedback(){
    }

    render(){
        return (
                <View
                style={{marginTop: 30}}
                >
                <Modal
                animationType={"slide"}
                transparent={false}
                /*onRequestClose={()=>this.send_feedback.bind(this);}*/

                >

                </Modal>
                </View>
               );
    }
}
class CategoryIcon extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        if(this.props.color===undefined){
            var color = 'hsl(' + whatHues[this.props.category] + ',100%,' + whatLightness[this.props.category] + '%)';
        } else {
            var color = this.props.color;
        }

        var size = this.props.size || 18;
        if(this.props.category =='Arts'){ return <VectorIcons.Ionicons name='ios-color-palette' size={size} color={color}/>
        } else if (this.props.category == 'Activism'){ return <VectorIcons.FontAwesome name='hand-rock-o' size={size} color={color}/>
        } else if (this.props.category == 'Books'){ return  <VectorIcons.Entypo name='book' size={size} color={color}/>
        } else if (this.props.category == 'Comedy'){ return <VectorIcons.Octicons name='smiley' size={size} color={color}/>
        } else if (this.props.category == 'Community'){ return <VectorIcons.MaterialIcons name='location-city' size={size} color={color}/>
        } else if (this.props.category == 'Concerts'){ return <VectorIcons.FontAwesome name='hand-peace-o' size={size} color={color}/>
        } else if (this.props.category == 'Dance'){ return <VectorIcons.Entypo name='sound' size={size} color={color}/>
        } else if (this.props.category == 'Educational'){ return  <VectorIcons.Entypo name='blackboard' size={size} color={color}/>
        } else if (this.props.category == 'Festivals'){ return  <VectorIcons.Ionicons name='ios-beer' size={size} color={color}/>
        } else if (this.props.category == 'Food & Drink'){ return <VectorIcons.MaterialIcons name='local-dining' size={size} color={color}/>
        } else if (this.props.category == 'Health & Fitness'){ return <VectorIcons.MaterialIcons name='fitness-center' size={size} color={color}/>
        } else if (this.props.category == 'Kids & Family'){ return <VectorIcons.MaterialIcons name='child-friendly' size={size} color={color}/>
        } else if (this.props.category == 'Meetup'){ return <VectorIcons.FontAwesome name='meetup' size={size} color={color}/>
        } else if (this.props.category == 'Movies'){ return <VectorIcons.MaterialIcons name='local-movies' size={size} color={color}/>
        } else if (this.props.category == 'Museums & Attractions'){ return <VectorIcons.FontAwesome name='building' size={size} color={color}/>
        } else if (this.props.category == 'Music'){ return  <VectorIcons.MaterialIcons name='music-note' size={size} color={color}/>
        } else if (this.props.category == 'Shopping'){ return  <VectorIcons.MaterialIcons name='shopping-basket' size={size} color={color}/>
        } else if (this.props.category == 'Nightlife'){ return <VectorIcons.Ionicons name='ios-cloudy-night' size={size} color={color}/>
        } else if (this.props.category == 'Outdoors'){ return  <VectorIcons.MaterialIcons name='nature-people' size={size} color={color}/>
        } else if (this.props.category == 'Religious'){ return <VectorIcons.Entypo name='moon' size={size} color={color}/>
        } else if (this.props.category == 'Theater'){ return <VectorIcons.Entypo name='mask' size={size} color={color}/>
        } else if (this.props.category == 'Sports'){ return  <VectorIcons.Ionicons name='ios-american-football-outline' size={size} color={color}/>
        } else { return <VectorIcons.MaterialIcons name='check-box-outline-blank' size={size}/>
        }
    }
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



function getCategoryHue(result){
    if(result !== null && result !== undefined){
        if(result.categories !== null && result.categories!==undefined && result.categories.length > 0){
            if(whatHues[result.categories[0]]!==undefined){
                return whatHues[result.categories[0]]
            } else {
                return constants.PRIMARY_HUE;
            }
        } else {
            return constants.PRIMARY_HUE;
        }
    } else {
        /*console.log("Warning: getCategoryHue received undefined result.");*/
        return constants.PRIMARY_HUE
    }
}


function getCategoryLightness(result){
    if(result !== null && result !== undefined){
        if(result.categories !== null && result.categories !== undefined &&  result.categories.length > 0){

            if(whatLightness[result.categories[0]]!==undefined){
                return whatLightness[result.categories[0]]
            } else {
                return constants.PRIMARY_LIGHTNESS
            }
        } else {
            return constants.PRIMARY_LIGHTNESS
        }
    } else {
        /*console.log("Warning: getCategoryHue received undefined result.");*/
        return constants.PRIMARY_HUE
    }
}




/*var EventSelection = t.struct({*/
/*what: what,*/
/*when: when*/
/*})*/

import moment from 'moment-timezone';
/*import styles from '../styles/styles';*/

const styles = ReactNative.StyleSheet.create({
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
        padding: 2,
        margin: 2,
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
    },
    container: {
        position: 'absolute',
        top: Exponent.Constants.statusBarHeight,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        alignItems: 'center',
    },
    menu: {
        flex: 1,
        width: window.width,
        height: window.height,
        backgroundColor: 'white',
        padding: 20,
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
        top: window.height - BOTTOM_HEIGHT - Exponent.Constants.statusBarHeight,
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
    },
    mini_action_link : {
        /*textAlign: 'center',*/
        paddingVertical: 2,
    },
    action_link : {
        flex: 1,
        flexDirection: 'row',
        textAlign: 'center',
        paddingVertical: 6,
        width: window.width/2. - 10,
        justifyContent: 'center',
        height: 50,
        alignItems: 'center',
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

class MenuButton extends React.Component {
    constructor(props){
        super(props);
    }
    handlePress(e) {
        if (this.props.onPress) {
            this.props.onPress(e);
        }
    }

    render() {
        return (
                <ReactNative.TouchableOpacity
                /*onPress={this.handlePress.bind(this)}*/
                onPress={() => this.props.parent._drawerLayout.openDrawer()}
                style={this.props.style}>
                {this.props.children}
                </ReactNative.TouchableOpacity>
               );
    }
}

class ResultIcons extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (null);
        /*return (*/
        /*let icons = ({this.props.result.categories.map( (category) => */
        /*if(category=='Arts'){*/
        /*<MaterialIcons name='palette'/>*/
        /*}else if(category=="Business"){*/
        /*<MaterialIcons name="business-center"/>*/
        /*}else if(category=="Charity"){*/
        /*<FontAwesome name='heart-o'/>*/
        /*}else if(category=="Comedy"){*/
        /*<FontAwesome name='smile-o'/>*/
        /*}else if(category=="Community"){*/
        /*<FontAwesome name='group'/>*/
        /*}else if(category=="Concerts"){*/
        /*<FontAwesome name='music'/>*/
        /*}else if(category=="Dance"){*/
        /*<MaterialIcons name='speaker'/>*/
        /*}else if(category=="Educational"){*/
        /*<FontAwesome name='graduation-cap'/>*/
        /*}else if(category=="Festivals"){*/
        /*<FontAwesome name='tree'/>*/
        /*}else if(category=="Film"){*/
        /*<FontAwesome name='film'/>*/
        /*}else if(category=="Food & Drink"){*/
        /*<MaterialIcons name='dining'/>*/
        /*}else if(category=="Health & Fitness"){*/
        /*<MaterialIcons name='fitness-center'/>*/
        /*}else if(category=="Holiday"){*/
        /*}else if(category=="Kids & Family"){*/
        /*<FontAwesome name='child'/>*/
        /*}else if(category=="Museums & Attractions"){*/
        /*}else if(category=="Nightlife"){*/
        /*}else if(category=="Outdoors"){*/
        /*<Foundation name='mountains'/>*/
        /*}else if(category=="Religious"){*/
        /*}else if(category=="Shopping"){*/
        /*<FontAwesome name='shopping-cart'/>*/
        /*}else if(category=="Sports"){*/
        /*<Ionicons name='ios-american-football'/>*/
        /*}*/

        /*)});*/
        /*);*/
    }
}

class MyMapView extends React.Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {text: '',
            isOpen: false,
            position: '',
            longitude: -122.4324,
            latitude: 37.78825,
            description: '',
            meetings: [],
            private_meetings: [],
            lastUpdatedAt: 0,
            dataSource: ds.cloneWithRows([]),
            markers: [],
            mapRegion: {},
            mapMoved: false,
            what: what,
            when: when,
            hour_count: null,
            day_count: null,
            category: 'All',
            event: {title: ''},
            loadingEvents: false,
        };
        this.childSizes = [];
        // automatically updated every n minutes
        /*setInterval(()=>{this.getMeetupData();}, 1000 * 60 * 10)*/
    }

    async componentDidMount(){
        this.getMeetupData();
        let loc_permission = await Exponent.Permissions.askAsync(Exponent.Permissions.LOCATION);

        if(loc_permission.status === 'granted'){
            try {
                navigator.geolocation.getCurrentPosition((position) => {
                    if(position!==null && position!==undefined && position.coords !== null && position.coord!==undefined){
                        this.setState({longitude: position.coords.longitude, latitude: position.coords.latitude});
                        this.map.animateToCoordinate(position.coords);
                    }
                });
            } catch(e){
                console.log("Could not fetch location.")
            }
        } else {
            /*ReactNative.Alert.alert("Too bad. nmrfmo doesn't permanently store your location.");*/
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
    updateMenuState(isOpen) {
        this.setState({ isOpen, });
        /*this.setState({event: {title: ''}})*/
    }

    onMenuItemSelected(item){
        this.setState({
            isOpen: false,
            selectedItem: item,
        });
    };

    getDayCount(){
        fetch('https://nomorefomo.herokuapp.com/day_count',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({
                    q: this.props.parent.state.search,
                    timeRange: this.props.parent.state.timeRange,
                    startTime: this.props.parent.state.startTime,
                    endTime: this.props.parent.state.endTime,
                    mapRegion: this.state.mapRegion,
                    deviceId: Exponent.Constants.deviceId,
                    isDevice: Exponent.Constants.isDevice,
                    searchString: this.props.parent.state.search,
                    category: this.props.parent.state.what,
                }),
                }).then((response) => response.json())
        .then((response) => {
            console.log("DAY COUNT");
            console.log(response[0]);
            let dow = parseInt(moment.tz().format('d'));
            let sum = 0;
            let when_keys = [];
            for (var ielem in response[0]){
                var elem = response[0][ielem];
                let idow = parseInt(elem.date_part);
                let icount = parseInt(elem.count);
                sum = sum + icount;
                let rel_dow = (idow - dow + 7) % 7;
                console.log("ELEM " + JSON.stringify(elem));
                console.log("IDOW " + idow) ;
                console.log("DOW " + dow) ;
                console.log("REL_DOW " + rel_dow) ;
                if(rel_dow == 0){
                    when_keys.push({key: 'today', label: moment(moment.now()).add(rel_dow, "days").format('[Today], MMMM Do [(]') + icount  + ')' , index: rel_dow})
                            } else if(rel_dow == 1) {
                                when_keys.push({key: 'tomorrow', label: moment(moment.now()).add(rel_dow, "days").format('[Tomorrow], MMMM Do [(]') + icount  + ')', index: rel_dow})
                                        } else {
                                            when_keys.push({key: 'days_' + rel_dow, label: moment(moment.now()).add(rel_dow, "days").format("dddd, MMMM Do") + ' (' + icount + ')', index: rel_dow})
                                                    }
                                                    }
                                                    when_keys.push({key: 'any', label: 'any day (' + sum + ')', index: 7});
                                                        when_keys = when_keys.sort(function(x, y){ return x.index - y.index });
                                                        this.setState({
                                                            day_count: response[0],
                                                            when: when_keys,
                                                        });
                                                        });
                                                    };

                                                    getHourCount(){
                                                        fetch('https://nomorefomo.herokuapp.com/hour_count',{
                                                                method: 'POST',
                                                                headers: {
                                                                    'Accept': 'application/json',
                                                                    'Content-Type': 'application/json',
                                                                },
                                                                body : JSON.stringify({
                                                                    q: this.props.parent.state.search,
                                                                    timeRange: this.props.parent.state.timeRange,
                                                                    startTime: this.props.parent.state.startTime,
                                                                    endTime: this.props.parent.state.endTime,
                                                                    mapRegion: this.state.mapRegion,
                                                                    deviceId: Exponent.Constants.deviceId,
                                                                    isDevice: Exponent.Constants.isDevice,
                                                                    searchString: this.props.parent.state.search,
                                                                    category: this.props.parent.state.what,
                                                                }),
                                                                }).then((response) => response.json())
                                                        .then((response) => {
                                                            console.log("HOUR COUNT")
                                                                console.log(response[0]);
                                                            this.setState({
                                                                hour_count: response[0]
                                                            });
                                                        });
                                                    };

                                                    getCategoryCount(){
                                                        fetch('https://nomorefomo.herokuapp.com/category_count',{
                                                                method: 'POST',
                                                                headers: {
                                                                    'Accept': 'application/json',
                                                                    'Content-Type': 'application/json',
                                                                },
                                                                body : JSON.stringify({
                                                                    q: this.props.parent.state.search,
                                                                    timeRange: this.props.parent.state.timeRange,
                                                                    startTime: this.props.parent.state.startTime,
                                                                    endTime: this.props.parent.state.endTime,
                                                                    mapRegion: this.state.mapRegion,
                                                                    deviceId: Exponent.Constants.deviceId,
                                                                    isDevice: Exponent.Constants.isDevice,
                                                                    searchString: this.props.parent.state.search,
                                                                    category: this.props.parent.state.what,
                                                                }),
                                                                }).then((response) => response.json())
                                                        .then((response) => {
                                                            let what_keys = [];
                                                            var sum = 0;
                                                            response[0].map(function(key, i){
                                                                /*console.log(key);*/
                                                                what_keys.push({key: key.unnest, label: <Text>{<CategoryIcon key={'c_' + key.unnest} category={key.unnest} />} {key.unnest} ({key.count})</Text>});
                                                                sum = sum + parseInt(key.count);
                                                            });
                                                            what_keys.unshift({key: 'All', label: <Text>All ({sum}) </Text> });
                                                            /*console.log(response[0]);*/
                                                            console.log("CATEGORY COUNT");
                                                            console.log(what_keys);
                                                            if(! _.isEmpty(what_keys)){
                                                                this.setState({
                                                                    what: what_keys,
                                                                });
                                                            }
                                                        });
                                                    };

                                                    getCounts(){
                                                        this.getCategoryCount();
                                                        this.getHourCount();
                                                        this.getDayCount();
                                                    }

                                                    getMeetupData(){
                                                        /*console.log("TRYING UPDATE");*/
                                                        /*console.log(this.state);*/
                                                        this.setState({
                                                            loadingEvents: true,
                                                        })

                                                        if (((Date.now() - this.props.parent.state.lastUpdatedAt)/ 1000) >= 1.){
                                                            /*console.log("Updating ...");*/
                                                            /*console.log(this.state);*/
                                                            let lon = this.state.longitude;
                                                            let lat = this.state.latitude;

                                                            fetch('https://nomorefomo.herokuapp.com/query',{
                                                                    method: 'POST',
                                                                    headers: {
                                                                        'Accept': 'application/json',
                                                                        'Content-Type': 'application/json',
                                                                    },
                                                                    body : JSON.stringify({
                                                                        q: this.props.parent.state.search,
                                                                        timeRange: this.props.parent.state.timeRange,
                                                                        startTime: this.props.parent.state.startTime,
                                                                        endTime: this.props.parent.state.endTime,
                                                                        mapRegion: this.state.mapRegion,
                                                                        deviceId: Exponent.Constants.deviceId,
                                                                        isDevice: Exponent.Constants.isDevice,
                                                                        searchString: this.props.parent.state.search,
                                                                        category: this.props.parent.state.category,
                                                                    }),
                                                                    }).then((response) => response.json())
                                                            .then((response) =>{
                                                                this.setState({
                                                                    loadingEvents: false,
                                                                })
                                                                /*console.log('POST RESPONSE');*/
                                                                /*console.log(response);*/
                                                                response.sort((x, y) => {
                                                                    return new Date(x.datetime) - new Date(y.datetime)
                                                                });
                                                                response = response.filter(function(x){
                                                                    return !_.isEmpty(x);
                                                                })
                                                                response.push({});
                                                                /*response.push({});*/
                                                                response.unshift({});
                                                                this.setState({
                                                                    meetings: response,
                                                                    dataSource: this.state.dataSource.cloneWithRows(response),
                                                                    lastUpdatedAt: Date.now(),
                                                                });
                                                                var offset = (new Date()).getTimezoneOffset() * 60;
                                                                var currentTime = moment.now() - offset;
                                                                var j = 1;
                                                                for(var i=0 ; i < response.length; i++){
                                                                    /*console.log('EVENT DATETETIME ' + parseInt(moment(response[i].datetime).format('x')));*/
                                                                    /*console.log('CURRENT TIME ' +  currentTime);*/
                                                                    /*console.log(currentTime > parseInt(moment(response[i.datetime]).format('x')));*/

                                                                    if(currentTime> parseInt(moment(response[i].datetime).format('x'))){
                                                                        j++;
                                                                    }
                                                                }
                                                                this.listView.scrollTo({x: j * LISTVIEW_BLOCKWIDTH + 90, y: 0});
                                                                this.setState({activeEventID: j});
                                                                this.setState({activeEventLeftSeparatorID: j});
                                                            }).catch((error) => {
                                                                console.log('Error in post ' + error)
                                                            });

                                                        }else{
                                                            /*console.log("Refusing to update, yet.")*/
                                                        }
                                                    }

                                                    componentWillReceiveProps(nextProps){
                                                        /*console.log("WillReceiveProps");*/
                                                        ReactNative.InteractionManager.runAfterInteractions(()=>{
                                                            /*this.getMeetupData();*/
                                                        });
                                                    }

                                                    getSaturation(datetime, time_span=-1, min_time=-1){
                                                        return 100
                                                            if(min_time<0){
                                                                min_time = new Date().getTime();
                                                            }
                                                        const diff =  new Date(datetime).getTime() - min_time;
                                                        let saturation = 0;
                                                        if(diff>0){
                                                            saturation = 100
                                                        }
                                                        if(time_span>0){
                                                            saturation = 100 * (1 - diff / time_span)
                                                        } else {
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
                                                            case 'today':
                                                            case 'tonight':
                                                                date_format = "h:mm A";
                                                                break;
                                                            case 'tomorrow':
                                                                date_format = "dd h:mm A";
                                                                break;
                                                            case 'days_2':
                                                            case 'days_3':
                                                            case 'days_4':
                                                            case 'days_5':
                                                            case 'days_6':
                                                                date_format = "ddd h:mm A";
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
                                                        if(moment.tz(result.datetime, tz).format("HH:mm") == '00:00'){
                                                            date_format = "M/D [All Day]";
                                                        }

                                                        return  moment.tz(result.datetime, tz).format(date_format);
                                                    }

                                                    marker_infotext(result){
                                                        if (result.cost === null || result.cost === undefined){
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
                                                        /*console.log("NAVIGATE KLASS NAME");*/
                                                        /*console.log(this.constructor.name);*/
                                                        /*console.log("NAVIGATE KLASS END");*/
                                                        /*console.log(Object.keys(this));*/
                                                        /*console.log(Object.keys(this.props));*/
                                                        this.props.navigator.push({
                                                            name: routeName,
                                                            passProps: passProps
                                                        });
                                                    }


                                                    publisher_text(event){
                                                        if(event.publisher !== null){
                                                            return '(' + event.publisher + ')'
                                                        } else {
                                                            return ''
                                                        }
                                                    }

                                                    _onRegionChangeComplete(region){
                                                        this.setState({
                                                            mapRegion: region
                                                        });
                                                        this.setState({
                                                            mapMoved: true,
                                                        });
                                                        /*console.log("Map moved");*/
                                                        /*console.log(region);*/
                                                    }

                                                    onScroll(event){
                                                        if(event!==null && event!==undefined){
                                                            /*event.persist();*/
                                                            /*console.log("Scrolling");*/
                                                            /*console.log(event);*/
                                                        }
                                                    }
                                                    onChangeVisibleRows(visibleRows, changedRows){
                                                        /*console.log("ONCHANGEVISIBLEROWS");*/
                                                        /*console.log(visibleRows);*/
                                                        /*console.log(changedRows);*/
                                                        if (visibleRows!== null && visibleRows !== undefined
                                                                && visibleRows.s1 !== null && visibleRows.s1 !== undefined){
                                                            let activeEventID = parseInt(Object.keys(visibleRows.s1)[1]);
                                                            let activeEventSeparatorID = parseInt(Object.keys(visibleRows.s1)[1]);
                                                            let activeEventLeftSeparatorID = parseInt(Object.keys(visibleRows.s1)[1]) - 1;
                                                            this.setState({activeEventID});
                                                            this.setState({activeEventSeparatorID});
                                                            this.setState({activeEventLeftSeparatorID});
                                                            /*console.log(activeEventID);*/
                                                            const activeEvent = this.state.meetings[activeEventID];
                                                            if(activeEvent!==null && activeEvent!==undefined){
                                                                /*console.log(activeEvent);*/
                                                                const coords = {longitude: activeEvent.lon, latitude: activeEvent.lat};
                                                                /*console.log(coords);*/
                                                                /*this.map.animateToCoordinate(coords, 200);*/
                                                                var coordinates = [];
                                                                coordinates.push({latitude: this.state.latitude, longitude: this.state.longitude});
                                                                if (! _.isEmpty(activeEvent) && activeEvent.lat!==0 && activeEvent.lon!==0){
                                                                    coordinates.push({latitude:activeEvent.lat, longitude:activeEvent.lon});
                                                                }
                                                                if(! _.isEmpty(this.state.mapRegion)){
                                                                    let mr = this.state.mapRegion;
                                                                    var _d = 0.
                                                                        if(Exponent.Constants.platform === null || Exponent.Constants.platform === undefined ){
                                                                            _d = 2.375;
                                                                        }else{
                                                                            _d = 2.5;
                                                                        }
                                                                    coordinates.push({latitude:mr.latitude + mr.latitudeDelta/_d, longitude:mr.longitude + mr.longitudeDelta/_d });
                                                                    coordinates.push({latitude:mr.latitude + mr.latitudeDelta/_d, longitude:mr.longitude - mr.longitudeDelta/_d });
                                                                    coordinates.push({latitude:mr.latitude - mr.latitudeDelta/_d, longitude:mr.longitude + mr.longitudeDelta/_d });
                                                                    coordinates.push({latitude:mr.latitude - mr.latitudeDelta/_d, longitude:mr.longitude - mr.longitudeDelta/_d });
                                                                }
                                                                /*console.log("SCREEN SIZE");*/
                                                                /*console.log(ReactNative.Dimensions.get('window'));*/
                                                                /*console.log("COORDINATES");*/
                                                                /*console.log(coordinates);*/
                                                                /*console.log("MAP REGION");*/
                                                                /*console.log(this.state.mapRegion);*/
                                                                /*console.log("ACTIVE EVENT");*/
                                                                /*console.log(activeEvent);*/

                                                                this.map.fitToCoordinates(coordinates,{
                                                                    edgePadding: {
                                                                        top: 40,
                                                                        right: 40,
                                                                        bottom: 40,
                                                                        left: 40,
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    }

                                                    renderSeparator(sectionID, rowID, adjacentRowHighlight){
                                                        /*console.log("RENDER SEPARATOR " + rowID + '/' + this.state.activeEventLeftSeparatorID);*/
                                                        return (
                                                                <View
                                                                key={rowID}
                                                                style={{
                                                                    height: 15,
                                                                    width:  LISTVIEW_BLOCKWIDTH,
                                                                    borderColor: '#cccccc',
                                                                    borderWidth: StyleSheet.hairLineWidth,
                                                                    borderBottomWidth: StyleSheet.hairLineWidth,
                                                                    /*width:  this.state.activeEventLeftSeparatorID === parseInt(rowID) ? LISTVIEW_BORDER : 0 ,*/
                                                                    backgroundColor: this.state.activeEventLeftSeparatorID === parseInt(rowID) ? 'hsl(' + getCategoryHue(this.state.meetings[parseInt(rowID)+1])+ ',100%,' +getCategoryLightness(this.state.meetings[parseInt(rowID)+1])+ '%)' : '#fff',
                                                                    marginRight: - LISTVIEW_BLOCKWIDTH,
                                                                    zIndex:10,
                                                                }}>
                                                                {(this.state.meetings[parseInt(rowID)+1] != undefined && this.state.meetings[parseInt(rowID)+1].categories != undefined) ?
                                                                    <Text
                                                                        style={{
                                                                            color:  this.state.activeEventLeftSeparatorID === parseInt(rowID) ?'white' : 'black',
                                                                            fontWeight:  this.state.activeEventLeftSeparatorID === parseInt(rowID) ? 'bold' : 'normal',
                                                                            fontSize: 12,
                                                                            borderColor: '#cccccc',
                                                                            borderWidth: StyleSheet.hairLineWidth,
                                                                            marginLeft: 5,
                                                                        }}
                                                                    numberOfLines={1}
                                                                    >
                                                                    {this.state.meetings[parseInt(rowID)+1].categories.join(" | ")}
                                                                    </Text>
                                                                        : null
                                                                }
                                                                </View>
                                                                    );
                                                    }
                                                    renderRow(event, sectionID, rowID){
                                                        /*console.log("RENDERROW " + this.state.activeEventID);*/
                                                        /*console.log(rowID);*/
                                                        return(
                                                                <View
                                                                onLayout={(e) => {this.listView.props.childSizes[parseInt(rowID)] = e.nativeEvent.layout.height;}}
                                                                style={[
                                                                    {
                                                                        borderColor: '#cccccc',
                                                                        borderWidth: event.title!==undefined ? 1 : 0,
                                                                        width: LISTVIEW_BLOCKWIDTH,
                                                                        padding: 0,
                                                                        marginRight: 10,
                                                                        flex: 1,
                                                                        flexDirection: 'column',
                                                                        justifyContent: 'space-between',
                                                                        alignItems: 'stretch',
                                                                        marginTop: 15,


                                                                    }
                                                                ]}>
                                                                <View
                                                                style={{
                                                                    height: 0,
                                                                    backgroundColor: 'hsl('+getCategoryHue(event)+',' + '100%,'+getCategoryLightness(event)+'%)',
                                                                }}/>
                                                                {event.title!==undefined?
                                                                    <View
                                                                        style={{
                                                                            flex: .1,
                                                                            flexDirection: 'row',
                                                                            justifyContent: 'space-between',
                                                                            paddingRight: 20,
                                                                            paddingLeft: 0,
                                                                        }}>

                                                                    <TouchableHighlight
                                                                        onPress={()=>{Share.share({
                                                                            title: "Event",
                                                                            message: event.url + "\n\n" + moment(event.datetime).format('dddd, MMMM D @ h:mm A') + '\n' + event.address + "\n\n--\n(Discovered with nmrfmo - http://exp.host/@mhoffman/nmrfmo/)",
                                                                            url: "http://facebook.github.io/react-native/",
                                                                            subject: "Share Link" //  for email
                                                                        }); }}
                                                                    style={{}}>
                                                                        <Text style={styles.mini_action_link}><Ionicons size={14} name="md-share" color="#000"/></Text>
                                                                        </TouchableHighlight>

                                                                        <TouchableHighlight
                                                                        onPress={(index)=>Communications.web('https://m.uber.com/ul/?action=setPickup&dropoff[longitude]=' + event.longitude + '&dropoff[latitude]=' + event.latitude +  '&dropoff[formatted_address]=' + event.address.replace(/ /gi, '%20') +'&pickup=my_location&client_id=qnzCX5gbWpvalF4QpJw0EjRfqNbNIgSm')}
                                                                    style={{}}>
                                                                        <Text style={styles.mini_action_link}><Ionicons size={18} name="ios-car" color="#000"/></Text>
                                                                        </TouchableHighlight>


                                                                        <TouchableHighlight
                                                                        onPress={(index)=>Communications.web('https://maps.google.com/maps?daddr=' + encodeURI(event.address.replace(/\s+/gi, '+')) +  '/')}
                                                                    style={{}}>
                                                                        <Text style={styles.mini_action_link}><VectorIcons.MaterialIcons size={18} name="directions" color="#000"/></Text>
                                                                        </TouchableHighlight>

                                                                        <TouchableHighlight
                                                                        onPress={(index)=>Communications.web('https://calendar.google.com/calendar/gp#~calendar:view=e&bm=1?action=TEMPLATE&text=' + encodeURI(event.title.replace(/\s+/gi, '+')) + '&dates=' + moment(event.datetime).format("YYYYMMDD[T]HHmmssz/") + moment(event.datetime).add(1, "hours").format("YYYYMMDD[T]HHmmssz") + '&details=' + encodeURI(event.description.replace(/\s+/gi, '+') + '\n\n' + event.url) + '&location=' + encodeURI(event.address.replace(/\s+/gi, '+')) + '&sf=true&output=xml')}
                                                                    style={{}}>
                                                                        <Text style={styles.mini_action_link}><FontAwesome size={18} name="calendar-plus-o" color="#000"/></Text>
                                                                        </TouchableHighlight>


                                                                        </View>
                                                                        : <View></View>}
                                                                <View
                                                                    style={{
                                                                        flex: 1,
                                                                        paddingLeft: 0,
                                                                        /*borderWidth: 1,*/
                                                                    }}>
                                                                <TouchableHighlight
                                                                    onPress={() => {
                                                                        this.navigate.bind(this, "event_details", {event: {event: event}})();
                                                                        this.listView.scrollTo({x: rowID * LISTVIEW_BLOCKWIDTH + 90, y: 0});
                                                                        ReactNative.InteractionManager.runAfterInteractions(()=>{
                                                                            let newPos = {longitude: event.lon, latitude: event.lat};
                                                                            /*console.log("SCROLL TO");*/
                                                                            /*console.log(newPos);*/
                                                                            /*console.log(event);*/
                                                                            this.map.animateToCoordinate(newPos);
                                                                        });
                                                                    } }
                                                                >
                                                                    <View>
                                                                    {event.image_url===undefined ? null :
                                                                        <Image
                                                                            source={{
                                                                                uri: 'https://s3.amazonaws.com/aws-website-nomorefomo-7sn9f/' + CryptoJS.MD5(event.image_url).toString() + '.png'
                                                                            }}
                                                                        style={{
                                                                            height: BOTTOM_HEIGHT-90,
                                                                            width: LISTVIEW_BLOCKWIDTH -2,
                                                                        }}
                                                                        />
                                                                    }
                                                                <Text
                                                                    numberOfLines={3}
                                                                ellipsizeMode={'tail'}
                                                                >
                                                                    <Text
                                                                    style={{color:'#999999'}}>
                                                                    {event.categories == null ? null :
                                                                        event.categories.map((category, cx)=>{
                                                                            return <Text key={'mklt_' + rowID + '_' + cx} ><CategoryIcon key={'mkl_' + rowID + '_' + cx} size={14} category={category}/></Text>
                                                                        })}
                                                                        {event.title!==undefined ? this.marker_format_title(event) + ' ' : ''}
                                                                        </Text>
                                                                        {event.title}
                                                                        {event.title!==undefined ? <FontAwesome name='chevron-right' color='#000000'/> : ''}
                                                                        </Text>
                                                                            </View>
                                                                            </TouchableHighlight>
                                                                            </View>
                                                                            </View>
                                                                            )
                                                    }


                                                    render() {
                                                        const { region } = this.props;
                                                        let longitude = this.state.longitude;
                                                        let latitude = this.state.latitude;
                                                        let time = new Date().getTime() ;
                                                        let later = time + 1000000;
                                                        const menu = <Menu onItemSelected={this.onMenuItemSelected}
                                                        parent={this}
                                                        whatHues={whatHues}
                                                        />;
                                                        var time_span = 60*60*24*1000;
                                                        var min_time = -1
                                                            if(this.state.meetings!== undefined && this.state.meetings.length > 0 ){
                                                                min_time = new Date(this.state.meetings[0].datetime);
                                                                var max_time = new Date(this.state.meetings[this.state.meetings.length-1].datetime);
                                                                time_span = max_time - min_time;
                                                            }

                                                        let map = (
                                                                <DrawerLayout
                                                                ref={(view) => { this._drawerLayout = view; }}
                                                                style={styles.menu}
                                                                menu={menu}
                                                                drawerWidth={window.width}
                                                                drawerPosition={DrawerLayout.positions.Left}
                                                                drawerLockMode='locked-open'
                                                                renderNavigationView={()=>menu}
                                                                onDrawerClose={()=>{this.getMeetupData()}}
                                                                onDrawerOpen={()=>{this.getCounts()}}
                                                                isOpen={this.state.isOpen}
                                                                onChange={(isOpen) => this.updateMenuState(isOpen)}
                                                                >

                                                                <ReactNative.View style={styles.container}>

                                                                <Exponent.MapView
                                                                ref={(map) => {this.map = map ;}} // Make MapView component available to other methods in this component under this.map
                                                                style={this.state.meetings.length == 0 ? styles.fullmap : styles.map}
                                                                initialRegion={{latitude : latitude,
                                                                    longitude: longitude,
                                                                    latitudeDelta: 0.135,
                                                                    longitudeDelta: 0.1321
                                                                }}
                                                                moveOnMarkerPress={false}
                                                                provider='google'
                                                                onRegionChangeComplete={this._onRegionChangeComplete.bind(this)} // Need to store current location
                                                                showsUserLocation={true}
                                                                followsUserLocation={false} // Very Important to keep it off. Really annoying showstopper otherwise under iOS.
                                                                showsCompass={false}
                                                                zoomEnabled={true}
                                                                rotateEnabled={false}
                                                                showsBuildings={false}
                                                                mapType='standard'
                                                                    showPointsOfInterest={true}
                                                                >

                                                                {this.state.meetings
                                                                    .filter((elem) => {
                                                                        /*console.log("MEETINGS FILTER");*/
                                                                        /*console.log(elem);*/
                                                                        /*console.log("PARENT STATE");*/
                                                                        /*console.log(this.props.parent.state);*/
                                                                        /*console.log('activeEventId');*/
                                                                        /*console.log(parseInt(this.listView.state.activeEventId) )*/

                                                                        if(_.isEmpty(elem)){
                                                                            return false
                                                                        }else if(this.props.parent.state.category === 'All'){
                                                                            return true;
                                                                        }else if(elem.categories !== null && elem.categories.indexOf(this.props.parent.state.category)>-1) {
                                                                            return true;
                                                                        } else {
                                                                            return false;
                                                                        }})
                                                                    .map((result, x) =>
                                                                            <Exponent.MapView.Marker
                                                                            pinColor={'hsl('+getCategoryHue(result)+',' + '100%,'+getCategoryLightness(result)+'%)'}
                                                                            ref={(marker)=>{this.state.markers[x] = marker}}
                                                                            coordinate={{
                                                                                longitude: result.lon + LOCATION_RADIUS * Math.sin(result.row_number/result.count*2*Math.PI),
                                                                                latitude: result.lat + LOCATION_RADIUS * Math.cos(result.row_number/result.count*2*Math.PI)
                                                                            }}
                                                                            calloutOffset={{ x: -15, y: -12  }} // for ios
                                                                            /*calloutAnchor={{x:0.5, y:1.75}} // for android*/
                                                                            style={[
                                                                                {
                                                                                    zIndex: parseInt(x) + 1 === parseInt(this.state.activeEventID) ? 1 : 0,
                                                                                }
                                                                            ]}
                                                                            key={'marker_' + x}
                                                                            onPress={()=>{
                                                                                ReactNative.InteractionManager.runAfterInteractions(()=>{
                                                                                    this.listView.scrollTo({x: (x+1) * LISTVIEW_BLOCKWIDTH  + 90, y: 0});
                                                                                });
                                                                                if(parseInt(x) + 1 === parseInt(this.state.activeEventID)){
                                                                                    this.navigate.bind(this, "event_details", {event: {event: result}})();
                                                                                }
                                                                            }}
                                                                            >
                                                                                <ReactNative.View
                                                                                style={[styles.marker,
                                                                                    {
                                                                                        backgroundColor: 'hsl('+getCategoryHue(result)+',' + this.getSaturation(result.datetime, time_span, min_time) + '%,'+getCategoryLightness(result)+'%)',
                                                                                        borderWidth: parseInt(x) + 1 === parseInt(this.state.activeEventID) ? 2 : 1,
                                                                                        zIndex: parseInt(x) + 1 === parseInt(this.state.activeEventID) ? 10: 1,
                                                                                        borderColor:parseInt(x) + 1 === parseInt(this.state.activeEventID) ? 'white' : 'black',
                                                                                    }]}
                                                                            >
                                                                            {/*<ResultIcons result={result}/>*/}
                                                                            <ReactNative.Text style={[
                                                                            ], {
                                                                                fontSize: parseInt(x) + 1 === parseInt(this.state.activeEventID)? 20 : 12,
                                                                                fontWeight: parseInt(x) + 1 === parseInt(this.state.activeEventID)? 'bold' : 'normal',
                                                                                color: parseInt(x) + 1 === parseInt(this.state.activeEventID)? 'white' : 'black',
                                                                            }}
                                                                            numberOfLines={2}
                                                                            ellipsizeMode={'tail'}
                                                                            >
                                                                            {result.categories == null ? null :
                                                                                result.categories.map((category, cx)=>{
                                                                                    return <CategoryIcon key={'mk_' + x + '_' + cx} size={parseInt(x) + 1 === parseInt(this.state.activeEventID)? 14 : 8} category={category} color='#ffffff'/>
                                                                                })}
                                                                                {this.marker_format_title(result)}</ReactNative.Text>
                                                                                <ReactNative.Text style={[
                                                                                    styles.marker_info,
                                                                                ]}>

                                                                                {this.marker_infotext(result)}</ReactNative.Text>
                                                                                </ReactNative.View>
                                                                                    </Exponent.MapView.Marker>
                                                                                    )}




                                                                </Exponent.MapView>

                                                                {/*
                                                                    <ReactNative.View style={this.state.event.title == "" ? styles.nobottomline : [
                                                                    styles.bottomline,
                                                                    styles.clickable,
                                                                    {
                                                                    borderColor: 'hsl('+getCategoryHue(this.state.event)+',' + '100%,'+getCategoryLightness(this.state.event)+'%)',

                                                                    }
                                                                    ]}>
                                                                    <ReactNative.TouchableHighlight
                                                                    onPress={this.navigate.bind(this, "event_details",
                                                                    {event: this.state})}
                                                                    >
                                                                    <ReactNative.Text style={styles.bottom_message}>
                                                                    {this.state.event.title == null ? " " : this.state.event.title.slice(0, 100)} {this.publisher_text(this.state.event)} <FontAwesome name='chevron-right' color='#000000' size={20}/>
                                                                    </ReactNative.Text>
                                                                    </ReactNative.TouchableHighlight>
                                                                    </ReactNative.View>
                                                                    */}
                                                                <View style={styles.bottomline}>
                                                                { this.state.loadingEvents ?
                                                                    <ReactNative.ActivityIndicator
                                                                        style={{
                                                                            height: 40,
                                                                            width: 40
                                                                        }}
                                                                    />
                                                                        :
                                                                        <UpdatingListView
                                                                        ref={(x) => { this.listView = x; }}
                                                                    dataSource={this.state.dataSource}
                                                                    enableEmptySections={true}
                                                                    horizontal={true}
                                                                    onChangeVisibleRows={this.onChangeVisibleRows.bind(this) }
                                                                    renderRow={this.renderRow.bind(this)}
                                                                    renderSeparator={this.renderSeparator.bind(this)}
                                                                    childSizes={this.childSizes}
                                                                    defaultRowSize={LISTVIEW_BLOCKWIDTH}
                                                                    />
                                                                }
                                                                </View>



                                                                    </ReactNative.View>

                                                                    {(Exponent.Constants.platform === null || Exponent.Constants.platform === undefined ) ? null :
                                                                        <ReactNative.TouchableOpacity
                                                                            style={{
                                                                                position: 'absolute',
                                                                                right: 10,
                                                                                top: 20,
                                                                                height: 40,
                                                                                width: 100,
                                                                                justifyContent: 'center',
                                                                                alignItems: 'flex-end',
                                                                                flex: 1,
                                                                                zIndex: this.state.mapMoved ? 25 : 15,
                                                                            }}
                                                                        onPress={()=>{
                                                                            navigator.geolocation.getCurrentPosition((position) => {
                                                                                /*console.log("NAVIGATOR POSITION");*/
                                                                                /*console.log(position);*/
                                                                                if(position!==null && position!==undefined && position.coords !== null && position.coords!==undefined){
                                                                                    this.setState({longitude: position.coords.longitude, latitude: position.coords.latitude});
                                                                                    this.map.animateToCoordinate(position.coords);
                                                                                }
                                                                            });
                                                                        }}
                                                                        >
                                                                            <VectorIcons.FontAwesome name='crosshairs' size={30}/>
                                                                            </ReactNative.TouchableOpacity>
                                                                    }


                                                                <ReactNative.TouchableOpacity
                                                                    style={{
                                                                        position: 'absolute',
                                                                        top: this.state.mapMoved ? 20 : 0,
                                                                        left: 50,
                                                                        height: this.state.mapMoved ? 40 : 0,
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        flex: 1,
                                                                        zIndex: this.state.mapMoved ? 25 : 15,
                                                                    }}
                                                                onPress={()=>{
                                                                    /*console.log('Refresh button clicked');*/
                                                                    ReactNative.InteractionManager.runAfterInteractions(()=>{
                                                                        this.getMeetupData();
                                                                    });
                                                                    this.setState({
                                                                        mapMoved: false,
                                                                    });
                                                                }}

                                                                >
                                                                    <View>
                                                                    <Text
                                                                    style={{
                                                                        fontSize: 16,
                                                                        fontWeight: 'bold',
                                                                        backgroundColor: this.state.mapMoved ? 'teal' : 'white',
                                                                        borderRadius: this.state.mapMoved ? 3 : 0,
                                                                        borderWidth: this.state.mapMoved ? 1 : 0,
                                                                        paddingLeft:3,
                                                                        paddingRight:3,
                                                                        paddingTop: 3,
                                                                    }}
                                                                ><SimpleLineIcons size={16} name='reload'/> Reload in current region</Text>
                                                                    </View>
                                                                    </ReactNative.TouchableOpacity>


                                                                    <MenuButton style={[styles.menu_button,{marginTop:0, width: 60, height: 60}]} parent={this} onPress={() => this.toggle()}>
                                                                    {this.state.loadingEvents ? <ReactNative.ActivityIndicator
                                                                        style={{
                                                                            height: 20,
                                                                            width: 40,
                                                                        }}
                                                                        color='black'
                                                                            /> :
                                                                            <ReactNative.Image
                                                                            source={require('./assets/menu.png')} style={{width: 32, height: 20}} />
                                                                    }
                                                                </MenuButton>


                                                                    </DrawerLayout>
                                                                    );


                                                                return map
                                                    }

}

class EventDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sharing_visible: true,
        };
    }
    render () {
        /*console.log("DETAIL PROPS");*/
        /*console.log(this.props);*/
        /*console.log('https://calendar.google.com/calendar/gp#~calendar:view=e&bm=1?action=TEMPLATE&text=' + encodeURI(this.props.event.event.title.replace(/\s+/gi, '+')) + '&dates=' + moment(this.props.event.event.datetime).format("YYYYMMDD[T]HHmmssz/") + moment(this.props.event.event.datetime).add(1, "hours").format("YYYYMMDD[T]HHmmssz") + '&details=' + encodeURI(this.props.event.event.description.replace(/\s+/gi, '+')) + '&location=' + encodeURI(this.props.event.event.address.replace(/\s+/gi, '+')) + '&sf=true&output=xml')*/
        var shareOptions = {
            title: "nmrfmo",
            message: "Check this out",
            url: this.props.event.event.url,
            subject: "Let's go here", //  for email
        };

        return (
                <ReactNative.ScrollView
                style={{
                    flex: 1,
                }}
                >
                <ReactNative.View
                style={{
                }}
                >
                <ReactNative.TouchableHighlight
                style={[styles.clickable,
                    {
                        marginTop:30,
                        marginBottom:20,
                        borderColor: 'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + getCategoryLightness(this.props.event.event)+ '%)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                        height: 45,
                    }]}
        onPress={()=>this.props.navigator.pop()}>
            <ReactNative.Text>
            <FontAwesome name='chevron-left' color='#000000'/>
            Back to Map</ReactNative.Text>

            </ReactNative.TouchableHighlight>
            <ReactNative.Text style={[styles.welcome]}>
            {this.props.event.event.title}
        </ReactNative.Text>
        {this.props.event.event.image_url===undefined ? null :
            <Image
                source={{
                    uri: 'https://s3.amazonaws.com/aws-website-nomorefomo-7sn9f/' + CryptoJS.MD5(this.props.event.event.image_url).toString() + '.png'
                }}
            style={{
                width: window.width,
                height: 300,
            }}
            />
        }
        <ReactNative.Text style={styles.p}>
        {moment(this.props.event.event.datetime).format('dddd, MMMM Do, YYYY, h:mm A')}
        </ReactNative.Text>
            <Hr lineColor='#b3b3b3' text='Description' textColor={'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + getCategoryLightness(this.props.event.event)+ '%)'}/>
            <ReactNative.Text style={[styles.p,{
                textAlign: 'justify'
            }]}>
        {this.props.event.event.description == null ? "" :  this.props.event.event.description.slice(0, 400) + ' ...'}
        </ReactNative.Text>
            <ReactNative.Text style={styles.p}>
            {this.props.event.event.cost}
        </ReactNative.Text>
            <Hr lineColor='#b3b3b3' text='Actions' textColor={'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + getCategoryLightness(this.props.event.event)+ '%)'}/>

            <View style={{
                flex: 1,
                flexDirection: 'row'
            }}>

        <ReactNative.TouchableHighlight style={[styles.clickable,
            {
                borderColor: 'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + getCategoryLightness(this.props.event.event)+ '%)',
            }

        ]} onPress={(index)=>Communications.web(this.props.event.event.publisher_url)}>
            <ReactNative.Text style={[styles.action_link]}> Venue: {this.props.event.event.publisher} <FontAwesome name='home' size={18}/></ReactNative.Text>
            </ReactNative.TouchableHighlight>

            <ReactNative.TouchableHighlight style={[styles.clickable,{
                borderColor: 'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + getCategoryLightness(this.props.event.event)+ '%)',
            }]} onPress={(index)=>Communications.web(this.props.event.event.url)} >
        <ReactNative.Text style={styles.action_link}>Event Website <FontAwesome name='external-link' size={18}/></ReactNative.Text>
            </ReactNative.TouchableHighlight>
            </View>


            <View style={{
                flex: 1,
                flexDirection: 'row'
            }}>
        <ReactNative.TouchableHighlight
            onPress={(index)=>Communications.web('http://maps.google.com/maps?layer=c&cbll=' + this.props.event.event.latitude + ',' + this.props.event.event.longitude + '/')}
        style={[styles.clickable, { borderColor: 'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + getCategoryLightness(this.props.event.event)+ '%)'} ]}>
            <ReactNative.Text style={styles.action_link}>Street View <FontAwesome size={18} name="street-view" color="#000"/></ReactNative.Text>
            </ReactNative.TouchableHighlight>

            <ReactNative.TouchableHighlight
            onPress={(index)=>Communications.web('https://maps.google.com/maps?daddr=' + encodeURI(this.props.event.event.address.replace(/\s+/gi, '+')) +  '/')}
        style={[styles.clickable, { borderColor: 'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + getCategoryLightness(this.props.event.event)+ '%)'} ]}>
            <ReactNative.Text style={styles.action_link}>Directions <VectorIcons.MaterialIcons size={18} name="directions" color="#000"/></ReactNative.Text>
            </ReactNative.TouchableHighlight>
            </View>



            <View style={{ flex: 1, flexDirection: 'row' }}>
            <ReactNative.TouchableHighlight
            onPress={(index)=>Communications.web('https://m.uber.com/ul/?action=setPickup&dropoff[longitude]=' + this.props.event.event.longitude + '&dropoff[latitude]=' + this.props.event.event.latitude +  '&dropoff[formatted_address]=' + this.props.event.event.address.replace(/ /gi, '%20') +'&pickup=my_location&client_id=qnzCX5gbWpvalF4QpJw0EjRfqNbNIgSm')}
        style={[styles.clickable, { borderColor: 'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + getCategoryLightness(this.props.event.event)+ '%)'} ]}>
            <ReactNative.Text style={styles.action_link}>Order Uber <Ionicons size={18} name="ios-car" color="#000"/></ReactNative.Text>
            </ReactNative.TouchableHighlight>

            <ReactNative.TouchableHighlight
            onPress={()=>{ReactNative.Share.share({
                title: "Event",
                message: this.props.event.event.url + "\n\n" + moment(this.props.event.event.datetime).format('dddd, MMMM D @ h:mm A') + '\n' + this.props.event.event.address + "\n\n--\n(Discovered with nmrfmo - http://exp.host/@mhoffman/nmrfmo/)",
                url: "http://facebook.github.io/react-native/",
                subject: "Share Link" //  for email
            });
            }}
        style={[styles.clickable, { borderColor: 'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + getCategoryLightness(this.props.event.event)+ '%)'} ]}>
            <ReactNative.Text style={styles.action_link}>Share <Ionicons size={18} name="md-share" color="#000"/></ReactNative.Text>
            </ReactNative.TouchableHighlight>
            </View>



            <ReactNative.TouchableHighlight
            onPress={(index)=>Communications.web('https://calendar.google.com/calendar/gp#~calendar:view=e&bm=1?action=TEMPLATE&text=' + encodeURI(this.props.event.event.title.replace(/\s+/gi, '+')) + '&dates=' + moment(this.props.event.event.datetime).format("YYYYMMDD[T]HHmmssz/") + moment(this.props.event.event.datetime).add(1, "hours").format("YYYYMMDD[T]HHmmssz") + '&details=' + encodeURI(this.props.event.event.description.replace(/\s+/gi, '+') + '\n\n' + this.props.event.event.url) + '&location=' + encodeURI(this.props.event.event.address.replace(/\s+/gi, '+')) + '&sf=true&output=xml')}
        style={[styles.clickable, { borderColor: 'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + getCategoryLightness(this.props.event.event)+ '%)'} ]}>
            <ReactNative.Text style={[styles.action_link,
                {width: window.width}
            ]}>Add to Google Calendar <FontAwesome size={18} name="calendar-plus-o" color="#000"/></ReactNative.Text>
                </ReactNative.TouchableHighlight>

                <Hr lineColor='#b3b3b3' text='Location' textColor={'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' +getCategoryLightness(this.props.event.event)+ '%)'}/>
                <ReactNative.Text style={styles.p}>{this.props.event.event.address}</ReactNative.Text>

                <Hr lineColor='#b3b3b3' text='Categories' textColor={'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' +getCategoryLightness(this.props.event.event)+ '%)'}/>
                <ReactNative.Text style={styles.p}>
                { this.props.event.event.categories==null ?  "" :
                    /*this.props.event.event.categories.join(" | ")*/
                    this.props.event.event.categories.map((category, cx)=>{
                        return <Text key={'mkld_' + this.props.event.event.id + '_' + cx} ><CategoryIcon key={'mkl_' + this.props.event.event.id + '_' + cx} size={14} category={category}/> {category} </Text>
                    })
                }
            </ReactNative.Text>
                <ReactNative.Text style={styles.p}></ReactNative.Text>
                <ReactNative.TouchableHighlight
                style={[styles.clickable,
                    {
                        marginBottom:20,
                        borderColor: 'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' +getCategoryLightness(this.props.event.event)+ '%)',
                        justifyContent: 'center',
                        flex: 1,
                        height: 45,
                    }]}
            onPress={()=>this.props.navigator.pop()}>
                <ReactNative.Text><FontAwesome name='chevron-left' color='#000000'/> Back to Map</ReactNative.Text>

                </ReactNative.TouchableHighlight>

                </ReactNative.View>
                </ReactNative.ScrollView>
                )
    }
}

class Navi extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            category: 'All',
            timeRange: parseInt(moment(moment.now()).format('hh')) < 10 ? 'today': 'tomorrow',
            startTime: 0,
            endTime: 24,
            search: '',
            lastUpdatedAt: 0
        };
    }

    /*Main navigator class, defines routes and everything */
    /*else. All other screens get called from here.*/
    render () {

        return (
                <ReactNative.Navigator initialRoute={{name: 'main'}}
                renderScene={this.renderScene.bind(this)}
                configureScene={(route, routeStack)=>
                    ReactNative.Navigator.SceneConfigs.PushFromRight
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
