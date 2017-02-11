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
import Exponent from 'exponent'

import constants from './constants';
import Hr from 'react-native-hr';
import UpdatingListView from './vendor/UpdatingListView'

import DrawerLayout from 'react-native-drawer-layout'
import Communications from 'react-native-communications';
import SideMenu from 'react-native-side-menu'
import { FontAwesome, Ionicons, MaterialIcons, Foundation, SimpleLineIcons } from '@exponent/vector-icons';
import { Components, Location, Permissions } from 'exponent';

const window = ReactNative.Dimensions.get('window');
const BOTTOM_HEIGHT = 120;
const PRIMARY_COLOR = constants.PRIMARY_COLOR;
const LOCATION_RADIUS = 5e-5
const LISTVIEW_BORDER = 5
const LISTVIEW_BLOCKWIDTH  = window.width/3.

import Menu from './Menu'
import CustomCallout from './CustomCallout'

var t = require('tcomb-form-native');
let what = t.enums({
    "All": "All",
    "Activism": "Activism",
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
    "Arts": 315,
    "Charity": 0,
    "Community": 80,
    "Concerts": 238,
    "Dance": 120,
    "Educational": 206,
    "Festivals": 160,
    "Film": 205,
    "Health & Fitness": 120,
    "Fitness": 120,
    "Kids & Family": 330,
    "Museums & Attractions": 280,
    "Nightlife": 279,
    "Sports": 59,
    "Theater": 320,
    "Outdoors": 340,
}

const whatLightness = {
    "Arts": 50,
    "Charity": 50,
    "Community": 50,
    "Concerts": 50,
    "Dance": 50,
    "Educational": 50,
    "Festivals": 50,
    "Film": 50,
    "Health & Fitness": 60,
    "Fitness": 60,
    "Kids & Family": 45,
    "Museums & Attractions": 50,
    "Nightlife": 50,
    "Sports": 35,
    "Theater": 50,
    "Outdoors": 50,
}

let when = t.enums({
    today: 'today',
    tomorrow: 'tomorrow',
    days_2: moment(moment.now()).add(2, "days").format("dddd"),
    days_3: moment(moment.now()).add(3, "days").format("dddd"),
    days_4: moment(moment.now()).add(4, "days").format("dddd"),
    days_5: moment(moment.now()).add(5, "days").format("dddd"),
    days_6: moment(moment.now()).add(6, "days").format("dddd"),
});



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
        console.log("Warning: getCategoryHue received undefined result.");
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
        console.log("Warning: getCategoryHue received undefined result.");
        return constants.PRIMARY_HUE
    }
}




var EventSelection = t.struct({
    what: what,
    when: when
})

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
    action_link : {
        /*textAlign: 'center',*/
        paddingVertical: 6,
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
                <ReactNative.Text>{this.props.children}</ReactNative.Text>
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
            event: {title: ''},
        };
        this.childSizes = [];
        this.getMeetupData();
        // automatically updated every n minutes
        setInterval(()=>{this.getMeetupData();}, 1000 * 60 * 10)
    }

    async componentDidMount(){
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
            ReactNative.Alert.alert("Too bad. nmrfmo doesn't permanently store your location.");
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
                url = 'https://nomorefomo.herokuapp.com/events/' + this.props.parent.state.timeRange + '?' + encodeURIComponent(JSON.stringify(this.state.mapRegion));
            }else{
                url = 'https://nomorefomo.herokuapp.com/search?q=' + encodeURI(this.props.parent.state.search) + '&' + encodeURIComponent(JSON.stringify(this.state.mapRegion));
            }

            /*console.log("MARKER URL");*/
            /*console.log(this.props.parent.state.timeRange);*/
            /*console.log(this.props.parent.state.search);*/
            /*console.log(url);*/


            fetch('https://nomorefomo.herokuapp.com/query',{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body : JSON.stringify({
                        q: this.props.parent.state.search,
                        timeRange: this.props.parent.state.timeRange,
                        mapRegion: this.state.mapRegion,
                        deviceId: Exponent.Constants.deviceId,
                    }),
                    }).then((response) => response.json())
            .then((response) =>{
                console.log('POST RESPONSE')
                    console.log(response);
                this.setState({
                    meetings: response,
                    dataSource: this.state.dataSource.cloneWithRows(response),
                    lastUpdatedAt: Date.now(),
                });
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
            this.getMeetupData();
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
        console.log("Map moved");
        console.log(region)

    }

    onScroll(event){
        if(event!==null && event!==undefined){
            /*event.persist();*/
            console.log("Scrolling");
            console.log(event);
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
            /*console.log(activeEventSeparatorID);*/
            const activeEvent = this.state.meetings[activeEventID];
            if(activeEvent!==null && activeEvent!==undefined){
                /*console.log(activeEvent);*/
                const coords = {longitude: activeEvent.lon, latitude: activeEvent.lat};
                /*console.log(coords);*/
                /*this.map.animateToCoordinate(coords, 200);*/
            }
        }


    }

    renderSeparator(sectionID, rowID, adjacentRowHighlight){
        /*console.log("RENDER SEPARATOR " + rowID + '/' + this.state.activeEventLeftSeparatorID);*/
        return (
                <View
                key={rowID}
                style={{
                    height: 10,
                    width:  LISTVIEW_BLOCKWIDTH,
                    borderBottomColor: '#bbb',
                    borderBottomWidth: StyleSheet.hairLineWidth,
                    /*width:  this.state.activeEventLeftSeparatorID === parseInt(rowID) ? LISTVIEW_BORDER : 0 ,*/
                    backgroundColor: this.state.activeEventLeftSeparatorID === parseInt(rowID) ? 'hsl(' + getCategoryHue(this.state.meetings[parseInt(rowID)+1])+ ',100%,' +getCategoryLightness(this.state.meetings[parseInt(rowID)+1])+ '%)' : '#fff',
                    marginRight: - LISTVIEW_BLOCKWIDTH,
                    zIndex:10,
                }}>
                </View>
               );
    }
    renderRow(event, sectionID, rowID){
        console.log("RENDERROW " + this.state.activeEventID);
        console.log(rowID);
        return(
                <View
                onLayout={(e) => {this.listView.props.childSizes[parseInt(rowID)] = e.nativeEvent.layout.height;}}
                style={[
                    {
                        borderColor: 'hsl('+getCategoryHue(event)+',' + '100%,'+getCategoryLightness(event)+'%)',
                        width: LISTVIEW_BLOCKWIDTH,
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
                <View
                    style={{
                        flex: .25,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingRight: 20,
                        paddingLeft: 5,
                        /*borderWidth: 1,*/

                    }}>

                <TouchableHighlight
                    onPress={()=>{Share.share({
                        title: "Event",
                        message: event.url + "\n\n" + moment(event.datetime).format('dddd, MMMM D @ h:mm A') + '\n' + event.address + "\n\n--\n(Discovered with nmrfmo - http://exp.host/@mhoffman/nmrfmo/)",
                        url: "http://facebook.github.io/react-native/",
                        subject: "Share Link" //  for email
                    }); }}
                style={{}}>
                    <Text style={styles.action_link}><Ionicons size={14} name="md-share" color="#000"/></Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                    onPress={(index)=>Communications.web('https://m.uber.com/ul/?action=setPickup&dropoff[longitude]=' + event.longitude + '&dropoff[latitude]=' + event.latitude +  '&dropoff[formatted_address]=' + event.address.replace(/ /gi, '%20') +'&pickup=my_location&client_id=qnzCX5gbWpvalF4QpJw0EjRfqNbNIgSm')}
                style={{}}>
                    <Text style={styles.action_link}><Ionicons size={18} name="ios-car" color="#000"/></Text>
                    </TouchableHighlight>


                    <TouchableHighlight
                    onPress={(index)=>Communications.web('http://maps.google.com/maps?layer=c&cbll=' + event.latitude + ',' + event.longitude + '/')}
                style={{}}>
                    <Text style={{}}><FontAwesome size={18} name="street-view" color="#000"/></Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                    onPress={(index)=>Communications.web('https://calendar.google.com/calendar/gp#~calendar:view=e&bm=1?action=TEMPLATE&text=' + encodeURI(event.title.replace(/\s+/gi, '+')) + '&dates=' + moment(event.datetime).format("YYYYMMDD[T]HHmmssz/") + moment(event.datetime).add(1, "hours").format("YYYYMMDD[T]HHmmssz") + '&details=' + encodeURI(event.description.replace(/\s+/gi, '+')) + '&location=' + encodeURI(event.address.replace(/\s+/gi, '+')) + '&sf=true&output=xml')}
                style={{}}>
                    <Text style={{}}><FontAwesome size={18} name="calendar-plus-o" color="#000"/></Text>
                    </TouchableHighlight>


                    </View>
                    <View
                    style={{
                        flex: 1,
                        paddingLeft: 2,
                        /*borderWidth: 1,*/
                    }}>
                <TouchableHighlight
                    onPress={this.navigate.bind(this, "event_details",
                            {event: {event: event}})}
                >
                    <Text
                    numberOfLines={4}
                ellipsizeMode={'tail'}
                >
                    <Text
                    style={{color:'#cccccc'}}>
                    {this.marker_format_title(event) + ' '}
                </Text>
                {event.title}
                </Text>
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
        EventSelection={EventSelection}
        what={what}
        when={when}
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
                drawerWidth={320}
                drawerPosition={DrawerLayout.positions.Left}
                renderNavigationView={()=>menu}
                isOpen={this.state.isOpen}
                onChange={(isOpen) => this.updateMenuState(isOpen)}
                >

                <ReactNative.View style={styles.container}>

                <ReactNative.TouchableOpacity
                style={{
                    position: 'absolute',
                    top: 50,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    zIndex: this.state.mapMoved ? 25 : -15,
                }}
        onPress={()=>{
            console.log('Refresh button clicked');
            this.getMeetupData();
            this.setState({
                mapMoved: false,
            });
        }}

        >
            <View
            style={{
                marginLeft: window.width/2. - 100,
                zIndex: this.state.mapMoved ? 25 : -15,
            }}
        >
            <Text
            style={{
                fontSize: 16,
                fontWeight: 'bold',
                backgroundColor: 'darkseagreen',
                borderRadius: 3,
                borderWidth: 1,
                borderColor:'black',
                paddingLeft:3,
                paddingRight:3,
                zIndex: this.state.mapMoved ? 25 : -15,
            }}
        ><SimpleLineIcons size={16} name='reload'/> Reload in current region</Text>
            </View>
            </ReactNative.TouchableOpacity>

            <Exponent.Components.MapView
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

                if(this.props.parent.state.category === 'All'){
                    return true;
                }else if(elem.categories !== null && elem.categories.indexOf(this.props.parent.state.category)>-1) {
                    return true;
                } else {
                    return false;
                }})
            .map((result, x) =>
                    <Exponent.Components.MapView.Marker
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
                            zIndex: parseInt(x) === parseInt(this.state.activeEventID) ? 1 : 0,
                        }
                    ]}
                    key={'marker_' + x}
                    onPress={()=>{
                        ReactNative.InteractionManager.runAfterInteractions(()=>{
                            this.listView.scrollTo({x: x * LISTVIEW_BLOCKWIDTH  - 5, y: 0});
                        });
                    }}

                    >
                        <ReactNative.View
                        style={[styles.marker,
                            {
                                backgroundColor: 'hsl('+getCategoryHue(result)+',' + this.getSaturation(result.datetime, time_span, min_time) + '%,'+getCategoryLightness(result)+'%)',
                                borderColor: 'hsl('+getCategoryHue(result)+',' + '100%,'+getCategoryLightness(result)+'%)',
                                borderWidth: parseInt(x) === parseInt(this.state.activeEventID) ? 3: 1,
                                zIndex:parseInt(x) === parseInt(this.state.activeEventID) ? 10: 1,
                            }]}
                    >
                    {/*<ResultIcons result={result}/>*/}
                    <ReactNative.Text style={{
                        fontSize: parseInt(x) === parseInt(this.state.activeEventID)? 16 : 14,
                        fontWeight: parseInt(x) === parseInt(this.state.activeEventID)? 'bold' : 'normal',
                        color: parseInt(x) === parseInt(this.state.activeEventID)? 'white' : 'black',
                    }}
                    numberOfLines={2}
                    ellipsizeMode={'tail'}
                    >{this.marker_format_title(result)}</ReactNative.Text>
                        <ReactNative.Text style={[
                            styles.marker_info,
                        ]}>{this.marker_infotext(result)}</ReactNative.Text>
                            </ReactNative.View>
                            </Exponent.Components.MapView.Marker>
                            )}




        </Exponent.Components.MapView>

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
        {/*END OF LISTVIEW*/}
        </View>



            </ReactNative.View>
            <MenuButton style={[styles.menu_button,{marginTop:0, width: 100, height: 100}]} parent={this} onPress={() => this.toggle()}>
            <ReactNative.Image
            source={require('./assets/menu.png')} style={{width: 32, height: 32}} />
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
                    styles.action_link,
                    {
                        marginTop:30,
                        marginBottom:20,
                        borderColor: 'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + getCategoryLightness(this.props.event.event)+ '%)',
                    }]}
                    onPress={()=>this.props.navigator.pop()}>
                    <ReactNative.Text><FontAwesome name='chevron-left' color='#000000'/> Back to Map</ReactNative.Text>

                    </ReactNative.TouchableHighlight>
                    <ReactNative.Text style={[styles.welcome]}>
                    {this.props.event.event.title}
                    </ReactNative.Text>
                        <ReactNative.Text style={styles.p}>
                        {moment(this.props.event.event.datetime).format('dddd, MMMM Do, YYYY, h:mm A')}
                    </ReactNative.Text>
                        <Hr lineColor='#b3b3b3' text='Description' textColor={'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + getCategoryLightness(this.props.event.event)+ '%)'}/>
                        <ReactNative.Text style={styles.p}>
                        {this.props.event.event.description == null ? "" :  this.props.event.event.description.slice(0, 400) + ' ...'}
                    </ReactNative.Text>
                        <ReactNative.Text style={styles.p}>
                        {this.props.event.event.cost}
                    </ReactNative.Text>
                        <Hr lineColor='#b3b3b3' text='Actions' textColor={'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + getCategoryLightness(this.props.event.event)+ '%)'}/>
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


                            <ReactNative.TouchableHighlight
                            onPress={(index)=>Communications.web('http://maps.google.com/maps?layer=c&cbll=' + this.props.event.event.latitude + ',' + this.props.event.event.longitude + '/')}
                        style={[styles.clickable, { borderColor: 'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + getCategoryLightness(this.props.event.event)+ '%)'} ]}>
                            <ReactNative.Text style={styles.action_link}>Street View <FontAwesome size={18} name="street-view" color="#000"/></ReactNative.Text>
                            </ReactNative.TouchableHighlight>

                            <ReactNative.TouchableHighlight
                            onPress={(index)=>Communications.web('https://maps.google.com/maps?daddr=' + encodeURI(this.props.event.event.address.replace(/\s+/gi, '+')) +  '/')}
                        style={[styles.clickable, { borderColor: 'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + getCategoryLightness(this.props.event.event)+ '%)'} ]}>
                            <ReactNative.Text style={styles.action_link}>Directions <Ionicons size={18} name="md-map" color="#000"/></ReactNative.Text>
                            </ReactNative.TouchableHighlight>

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


                            <ReactNative.TouchableHighlight
                            onPress={(index)=>Communications.web('https://calendar.google.com/calendar/gp#~calendar:view=e&bm=1?action=TEMPLATE&text=' + encodeURI(this.props.event.event.title.replace(/\s+/gi, '+')) + '&dates=' + moment(this.props.event.event.datetime).format("YYYYMMDD[T]HHmmssz/") + moment(this.props.event.event.datetime).add(1, "hours").format("YYYYMMDD[T]HHmmssz") + '&details=' + encodeURI(this.props.event.event.description.replace(/\s+/gi, '+')) + '&location=' + encodeURI(this.props.event.event.address.replace(/\s+/gi, '+')) + '&sf=true&output=xml')}
                        style={[styles.clickable, { borderColor: 'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + getCategoryLightness(this.props.event.event)+ '%)'} ]}>
                            <ReactNative.Text style={styles.action_link}>Copy to Google Calendar <FontAwesome size={18} name="calendar-plus-o" color="#000"/></ReactNative.Text>
                            </ReactNative.TouchableHighlight>

                            <Hr lineColor='#b3b3b3' text='Location' textColor={'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' +getCategoryLightness(this.props.event.event)+ '%)'}/>
                            <ReactNative.Text style={styles.p}>{this.props.event.event.address}</ReactNative.Text>

                            <Hr lineColor='#b3b3b3' text='Categories' textColor={'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' +getCategoryLightness(this.props.event.event)+ '%)'}/>
                            <ReactNative.Text style={styles.p}>
                            { this.props.event.event.categories==null ?  "" : this.props.event.event.categories.join(" | ") }
                        </ReactNative.Text>
                            <ReactNative.Text style={styles.p}></ReactNative.Text>
                            <ReactNative.TouchableHighlight
                            style={[styles.clickable,
                                styles.action_link,
                                {
                                    marginBottom:20,
                                    borderColor: 'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' +getCategoryLightness(this.props.event.event)+ '%)',
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
