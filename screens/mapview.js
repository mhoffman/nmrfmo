'use strict';
import React, { Component } from 'react';
import {
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

import constants from './constants'

import MapView from 'react-native-maps';
import Communications from 'react-native-communications';
import SideMenu from 'react-native-side-menu'
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import Menu from './Menu'

/*console.log("IMPORTED MENU")*/
/*console.log(Menu);*/


import queryString from 'query-string';
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
        borderWidth: 2,
        borderRadius: 2,
        borderColor: PRIMARY_COLOR,
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
        top: window.height - BOTTOM_HEIGHT - 23,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        zIndex:0,
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

class Button extends Component {
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

            let url = 'https://nomorefomo.herokuapp.com/events/' + this.props.parent.state.timeRange;
            /*console.log("MARKER URL");*/
            /*console.log(this.props.parent.state.timeRange);*/
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
                    /*console.log(response);*/
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

    /*componentDidUpdate(prevProps, prevState){*/
    /*console.log("ComponentDidUpdate");*/
    /*console.log(this.state);*/
    /*console.log(prevState);*/
    /*this.getMeetupData();*/
    /*}*/

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

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.setState({longitude: position['coords']['longitude'],
                        latitude: position['coords']['latitude']})
                })
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
        const menu = <Menu onItemSelected={this.onMenuItemSelected} parent={this}/>;

        let map = (
                <SideMenu
                style={styles.menu}
                menu={menu}
                isOpen={this.state.isOpen}
                onChange={(isOpen) => this.updateMenuState(isOpen)}
                >


                <View style={styles.container}>
                <Button style={styles.menu_button} onPress={() => this.toggle()}>
                <Image
                source={require('./assets/menu.png')} style={{width: 32, height: 32}} />
                </Button>
                <MapView
                provider='google'
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
                                longitude: result.lon,
                                latitude: result.lat
                            }}
                            onPress={()=>{
                                InteractionManager.runAfterInteractions(()=>{
                                    this.setState({event: {
                                        title: result.title,
                                        url: result.url,
                                        address: result.address,
                                        description: result.description,
                                        publisher: result.publisher,
                                        cost: result.cost,
                                        publisher_url: result.publisher_url,
                                        datetime: result.datetime
                                    },
                                        event_title: result.title});

                                });
                            }}

                            >
                                <View
                                style={[styles.marker, {backgroundColor: 'hsl('+constants.SECONDARY_HUE+',' + (100) + '%,'+constants.PRIMARY_LIGHTNESS+'%)'}]}
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
                                longitude: result.lon,
                                latitude: result.lat
                            }}
                            onPress={()=>{
                                InteractionManager.runAfterInteractions(()=>{
                                    this.setState({event: {
                                        title: result.title,
                                        url: result.url,
                                        address: result.address,
                                        description: result.description,
                                        publisher: result.publisher,
                                        cost: result.cost,
                                        publisher_url: result.publisher_url,
                                        datetime: result.datetime
                                    },
                                        event_title: result.title});

                                });
                            }}

                            >
                                <View
                                style={[styles.marker, {backgroundColor: 'hsl('+constants.PRIMARY_HUE+',' + (100 - (new Date(result.datetime).getTime() - new Date().getTime())/1000/60/60*10) + '%,'+constants.PRIMARY_LIGHTNESS+'%)'}]}
                            >
                                <Text style={{color: 'white'}}>{this.marker_format_title(result)}</Text>
                                <Text style={styles.marker_info}>{this.marker_infotext(result)}</Text>
                                </View>
                                </MapView.Marker>

                                )}




                </MapView>
                    <View style={this.state.event.title == "" ? styles.nobottomline : [styles.bottomline, styles.clickable]}>
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
    }
    render () {
        /*console.log("DETAIL PROPS");*/
        /*console.log(this.props);*/
        return (
                <View style={styles.topContainer}>
                <Text style={styles.welcome}>
                {this.props.event.event.title}
                </Text>
                <Text style={styles.p}>
                {moment(this.props.event.event.datetime).format('dddd, MMMM Do, YYYY, h:mm A')}
                </Text>
                <Text style={styles.p}>
                {this.props.event.event.description == null ? "" :  this.props.event.event.description.slice(0, 200)}
                </Text>
                <Text style={styles.p}>
                {this.props.event.event.cost}
                </Text>
                <Text style={styles.p}>
                {this.props.event.event.address}
                </Text>
                <TouchableHighlight
                style={styles.clickable}
                onPress={(index)=>Communications.web(this.props.event.event.url)}
                >
                    <Text>
                    website <FontAwesome name='external-link'/>
                    </Text>
                    </TouchableHighlight><TouchableHighlight style={styles.clickable} onPress={(index)=>Communications.web(this.props.event.event.publisher_url)}>
                    <Text>
                    Credit: {this.props.event.event.publisher} <FontAwesome name='external-link'/>
                    </Text>
                    </TouchableHighlight>
                    <Text style={styles.p}></Text>
                    <TouchableHighlight
                    style={styles.clickable}
        onPress={()=>this.props.navigator.pop()}>
            <Text><FontAwesome name='chevron-left' color='#000000'/> BACK</Text>

            </TouchableHighlight>
            </View>
            )
    }
}

export default class Navi extends Component {
    constructor(props){
        super(props);
        this.state = {
            category: 'All',
            timeRange: 'now',
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
