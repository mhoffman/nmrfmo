'use strict';
import React, { Component } from 'react';
import {
    Alert,
    AlertIOS,
    Animated,
    AppRegistry,
    BackHandler,
    Clipboard,
    Colors,
    Dimensions,
    Image,
    InteractionManager,
    ListView,
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

import UpdatingListView from './vendor/UpdatingListView'
import CryptoJS from 'crypto-js'

import _ from 'lodash'

import DeprecatedComponents from 'react-native-deprecated-custom-components';
import DrawerLayout from 'react-native-drawer-layout';
import Communications from 'react-native-communications';
import SideMenu from 'react-native-side-menu'
import { FontAwesome, Ionicons, MaterialIcons, Foundation, SimpleLineIcons } from '@expo/vector-icons';
import VectorIcons from '@expo/vector-icons'
import { Components, Location, Permissions } from 'expo';

const window = ReactNative.Dimensions.get('window');

import Menu from './Menu';
import EventDetails from './detailView';
/*import CustomCallout from './CustomCallout'*/
import constants from './constants';
import services from './services';
import styles from './styles';
import CategoryIcon from './categoryIcon';

var t = require('tcomb-form-native');
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


import moment from 'moment-timezone';
/*import styles from '../styles/styles';*/


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
                onPress={() =>{
                    this.props.parent._drawerLayout.openDrawer();
                    this.props.parent.toggle();
                }
                }
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
            what: constants.what,
            when: constants.when,
            hour_count: null,
            day_count: null,
            category: 'All',
            event: {title: ''},
            loadingEvents: false,
            venue_lists: {}
        };
        this.childSizes = [];
        // automatically updated every n minutes
        /*setInterval(()=>{this.getMeetupData();}, 1000 * 60 * 10)*/
    }

    async componentWillMount(){
        const venue_lists = await ReactNative.AsyncStorage.getItem('venue_lists');
        if(venue_lists!==null){
            /*this.setState({*/
            /*venue_lists: JSON.parse(venue_lists)*/
            /*});*/
            console.log("RELOADED VENUE_LISTS");
            console.log(JSON.stringify(this.state.venue_lists))
        }

    }
    async componentDidMount(){
        this.getMeetupData();
        let loc_permission = await Exponent.Permissions.askAsync(Exponent.Permissions.LOCATION);
        console.log(loc_permission);

        if(loc_permission.status === 'granted'){
            try {
                /*console.log("Trying to fetch location.")*/
                let position = await Location.getCurrentPositionAsync({});
                /*console.log(position);*/
                this.setState(
                        {longitude: position.coords.longitude, latitude: position.coords.latitude}
                        );
                /*console.log("Fetched location.");*/
                this.map.animateToCoordinate(position.coords);
                this.getMeetupData();
            } catch(e){
                console.log("Could not fetch location.");
                console.log(e);
            }
        } else {
            /*ReactNative.Alert.alert("Too bad. nmrfmo doesn't permanently store your location.");*/
            console.log("Permission was not granted.")
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
                                                                    venue_lists: this.state.venue_lists,
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
                                                                    venue_lists: this.state.venue_lists,
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
                                                                        venue_lists: this.state.venue_lists,
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
                                                                this.listView.scrollTo({x: j * constants.LISTVIEW_BLOCKWIDTH + 90, y: 0});
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
                                                                /*coordinates.push({latitude: this.state.latitude, longitude: this.state.longitude});*/
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
                                                                    width:  constants.LISTVIEW_BLOCKWIDTH,
                                                                    borderColor: '#cccccc',
                                                                    borderWidth: StyleSheet.hairLineWidth,
                                                                    borderBottomWidth: StyleSheet.hairLineWidth,
                                                                    backgroundColor: this.state.activeEventLeftSeparatorID === parseInt(rowID) ? 'hsl(' + services.getCategoryHue(this.state.meetings[parseInt(rowID)+1])+ ',100%,' +services.getCategoryLightness(this.state.meetings[parseInt(rowID)+1])+ '%)' : '#fff',
                                                                    marginRight: - constants.LISTVIEW_BLOCKWIDTH,
                                                                    zIndex:10,
                                                                    shadowColor:(this.state.meetings[parseInt(rowID)+1] != undefined && this.state.meetings[parseInt(rowID)+1].categories != undefined) ?'#000000' :'#ffffff',
                                                                    shadowRadius: 1,
                                                                    shadowOpacity: 1.0,
                                                                    shadowOffset: {
                                                                        width: 1,
                                                                        height: 1
                                                                    }
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
                                                                        backgroundColor: '#ffffff',
                                                                        borderWidth: event.title!==undefined ? 1 : 0,
                                                                        width: constants.LISTVIEW_BLOCKWIDTH,
                                                                        padding: 0,
                                                                        marginRight: 10,
                                                                        flex: 1,
                                                                        flexDirection: 'column',
                                                                        justifyContent: 'space-between',
                                                                        alignItems: 'stretch',
                                                                        marginTop: 15,
                                                                        shadowColor: event.title!==undefined ? '#000000': '#ffffff',
                                                                        shadowRadius: 1,
                                                                        shadowOpacity: 1.0,
                                                                        shadowOffset: {
                                                                            width: 1,
                                                                            height: 1
                                                                        }
                                                                    }
                                                                    ]}>
                                                                        <View
                                                                        style={{
                                                                            height: 0,
                                                                            backgroundColor: 'hsl('+services.getCategoryHue(event)+',' + '100%,'+services.getCategoryLightness(event)+'%)',
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
                                                                            this.listView.scrollTo({x: rowID * constants.LISTVIEW_BLOCKWIDTH + 90, y: 0});
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
                                                                                height: constants.BOTTOM_HEIGHT-90,
                                                                                width: constants.LISTVIEW_BLOCKWIDTH -2,
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
                                                        whatHues={constants.whatHues}
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
                                                                onRegionChangeComplete={this._onRegionChangeComplete.bind(this)} // Need to store current location
                                                                showsUserLocation={true}
                                                                showsMyLocationButton={true}
                                                                pitchEnabled={false}
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
                                                                            pinColor={'hsl('+services.getCategoryHue(result)+',' + '100%,'+services.getCategoryLightness(result)+'%)'}
                                                                            ref={(marker)=>{this.state.markers[x] = marker}}
                                                                            coordinate={{
                                                                                longitude: result.lon + constants.LOCATION_RADIUS * Math.sin(result.row_number/result.count*2*Math.PI),
                                                                                latitude: result.lat + constants.LOCATION_RADIUS * Math.cos(result.row_number/result.count*2*Math.PI)
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
                                                                                    this.listView.scrollTo({x: (x+1) * constants.LISTVIEW_BLOCKWIDTH  + 90, y: 0});
                                                                                });
                                                                                if(parseInt(x) + 1 === parseInt(this.state.activeEventID)){
                                                                                    this.navigate.bind(this, "event_details", {event: {event: result}})();
                                                                                }
                                                                            }}
                                                                            >
                                                                                <ReactNative.View
                                                                                style={[styles.marker,
                                                                                    {
                                                                                        backgroundColor: 'hsl('+services.getCategoryHue(result)+',' + this.getSaturation(result.datetime, time_span, min_time) + '%,'+services.getCategoryLightness(result)+'%)',
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
                                                                                    <Text numberOfLines={1} style={{
                                                                                        fontSize:8,
                                                                                        width: 60,
                                                                                    }}>{result.title == undefined ? '' : result.title}</Text>
                                                                                </Exponent.MapView.Marker>
                                                                                    )}




                                                                </Exponent.MapView>

                                                                {/*
                                                                    <ReactNative.View style={this.state.event.title == "" ? styles.nobottomline : [
                                                                    styles.bottomline,
                                                                    styles.clickable,
                                                                    {
                                                                    borderColor: 'hsl('+services.getCategoryHue(this.state.event)+',' + '100%,'+services.getCategoryLightness(this.state.event)+'%)',

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
                                                                    defaultRowSize={constants.LISTVIEW_BLOCKWIDTH}
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
                                                                        bottom: 20,
                                                                        right: 20,
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        flex: 1,
                                                                        zIndex: this.state.mapMoved ? 25 : 15,
                                                                        shadowColor:'#000000',
                                                                        shadowRadius: 5,
                                                                        shadowOpacity: 1.0,
                                                                        shadowOffset: {
                                                                            width: 3,
                                                                            height: 3
                                                                        }
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
                                                                    <View
                                                                    style={{
                                                                        backgroundColor: 'limegreen',
                                                                        height: 50,
                                                                        width: 50,
                                                                        padding: 5,
                                                                        borderRadius: 25,
                                                                    }}
                                                                    >
                                                                    <SimpleLineIcons size={40} name='reload'
                                                                    />
                                                                    </View>
                                                                    </ReactNative.TouchableOpacity>


                                                                    <MenuButton style={[styles.menu_button,{marginTop:0, width: 60, height: 60}]} parent={this} >
                                                                    {this.state.loadingEvents ? <ReactNative.ActivityIndicator
                                                                        style={{
                                                                            height: 20,
                                                                            width: 40,
                                                                        }}
                                                                        color='black'
                                                                            /> :
                                                                            <ReactNative.Image source={require('./assets/menu.png')}
                                                                        style={{
                                                                            width: 32,
                                                                            height: 32,
                                                                        }} />
                                                                    }
                                                                </MenuButton>


                                                                    </DrawerLayout>
                                                                    );


                                                                return map
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
        this.handleBack = (() => {
            if (this.navigator && this.navigator.getCurrentRoutes().length > 1){
                this.navigator.pop();
                return true; //avoid closing the app
            }

            return false; //close the app
        }).bind(this) ;
    }
    componentDidMount() {
        ReactNative.BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    componentWillUnmount() {
        ReactNative.BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    /*Main navigator class, defines routes and everything */
    /*else. All other screens get called from here.*/
    render () {

        return (
                <DeprecatedComponents.Navigator initialRoute={{name: 'main'}}
                ref={(nav)=>{this.navigator = nav;} }
                renderScene={this.renderScene.bind(this)}
                configureScene={(route, routeStack)=>
                    DeprecatedComponents.Navigator.SceneConfigs.PushFromRight
                } />
               );
    }

    renderScene(route, navigator) {
        if(route.name == 'main') {
            return <MyMapView
                navigator={navigator}
            ref={(x) => {this.mapView = x;}} // Make MapView component available to other methods in this component under this.map
            parent={this}/>
        }
        if(route.name == 'event_details') {
            return <EventDetails
                navigator={navigator}
            parent={this}
            {...route.passProps}/>
        }
    }
}

module.exports = Navi
