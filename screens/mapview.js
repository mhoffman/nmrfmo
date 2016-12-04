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

import constants from './constants';
import Hr from 'react-native-hr';

import DrawerLayout from 'react-native-drawer-layout'
import Communications from 'react-native-communications';
import SideMenu from 'react-native-side-menu'
import { FontAwesome, Ionicons, MaterialIcons, Foundation } from '@exponent/vector-icons';
import { Components, Location, Permissions } from 'exponent';

/*import MapView from 'react-native-maps';*/
/*using exponent component*/
const MapView = Components.MapView;

const LOCATION_RADIUS = 5e-5

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
                <TouchableOpacity
                /*onPress={this.handlePress.bind(this)}*/
                onPress={() => this.props.parent._drawerLayout.openDrawer()}
                style={this.props.style}>
                <Text>{this.props.children}</Text>
                </TouchableOpacity>
               );
    }
}

class ResultIcons extends Component{
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
        navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.setState({longitude: position['coords']['longitude'],
                        latitude: position['coords']['latitude']})
                });
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

    getSaturation(datetime, time_span=-1, min_time=-1){
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
                showsCompass={false}
                zoomEnabled={true}
                rotateEnabled={false}
                showsBuildings={false}
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
                                    { backgroundColor: 'hsl('+getCategoryHue(result)+',' + this.getSaturation(result.datetime, time_span, min_time) + '%,'+constants.PRIMARY_LIGHTNESS+'%)',
                                        borderColor: 'hsl('+getCategoryHue(result)+',' + '100%,'+constants.PRIMARY_LIGHTNESS+'%)',
                                        borderWidth: 1,
                                    }]}
                            >
                            {/*<ResultIcons result={result}/>*/}
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
                        <MyButton style={[styles.menu_button,{marginTop:0}]} parent={this} onPress={() => this.toggle()}>
                        <Image
                        source={require('./assets/menu.png')} style={{width: 32, height: 32}} />
                        </MyButton>


                        </DrawerLayout>
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
                <ScrollView
                style={{ flex: 1 }}
                >
                <View >
                <TouchableHighlight
                style={[styles.clickable,
                    styles.action_link,
                    {
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
                            <Text style={styles.action_link}> Venue: {this.props.event.event.publisher} <FontAwesome name='home' size={18}/></Text>
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
                            onPress={()=>{Share.share({
                                title: "Event",
                                message: this.props.event.event.url + "\n\n" + moment(this.props.event.event.datetime).format('dddd, MMMM D @ h:mm A') + '\n' + this.props.event.event.address, //+ "(Found on nmrfmo - http://exp.host/@mjhoffmann/nmrfmo/)",
                                url: "http://facebook.github.io/react-native/",
                                subject: "Share Link" //  for email
                            });
                            }}
                        style={[styles.clickable, { borderColor: 'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + constants.PRIMARY_LIGHTNESS+ '%)'} ]}>
                            <Text style={styles.action_link}>Share <Ionicons size={18} name="md-share" color="#000"/></Text>
                            </TouchableHighlight>


                            <TouchableHighlight
                            onPress={(index)=>Communications.web('https://calendar.google.com/calendar/gp#~calendar:view=e&bm=1?action=TEMPLATE&text=' + encodeURI(this.props.event.event.title.replace(/\s+/gi, '+')) + '&dates=' + moment(this.props.event.event.datetime).format("YYYYMMDD[T]HHmmssz/") + moment(this.props.event.event.datetime).add(1, "hours").format("YYYYMMDD[T]HHmmssz") + '&details=' + encodeURI(this.props.event.event.description.replace(/\s+/gi, '+')) + '&location=' + encodeURI(this.props.event.event.address.replace(/\s+/gi, '+')) + '&sf=true&output=xml')}
                        style={[styles.clickable, { borderColor: 'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + constants.PRIMARY_LIGHTNESS+ '%)'} ]}>
                            <Text style={styles.action_link}>Copy to Google Calendar <FontAwesome size={18} name="calendar-plus-o" color="#000"/></Text>
                            </TouchableHighlight>

                            <Hr lineColor='#b3b3b3' text='Location' textColor={'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + constants.PRIMARY_LIGHTNESS+ '%)'}/>
                            <Text style={styles.p}>{this.props.event.event.address}</Text>

                            <Hr lineColor='#b3b3b3' text='Categories' textColor={'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + constants.PRIMARY_LIGHTNESS+ '%)'}/>
                            <Text style={styles.p}>
                            { this.props.event.event.categories==null ?  "" : this.props.event.event.categories.join(" | ") }
                        </Text>
                            <Text style={styles.p}></Text>
                            <TouchableHighlight
                            style={[styles.clickable,
                                styles.action_link,
                                {
                                    marginBottom:20,
                                    borderColor: 'hsl(' +getCategoryHue(this.props.event.event) + ',100%,' + constants.PRIMARY_LIGHTNESS+ '%)',
                                }]}
                        onPress={()=>this.props.navigator.pop()}>
                            <Text><FontAwesome name='chevron-left' color='#000000'/> BACK</Text>

                            </TouchableHighlight>

                            </View>
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
