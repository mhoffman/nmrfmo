'use strict';

// General imports
import moment from 'moment-timezone';
import CryptoJS from 'crypto-js'


// RN imports
import React, { Component } from 'react';
import ReactNative from 'react-native';
import VectorIcons from '@expo/vector-icons'
import Hr from 'react-native-hr';
import ReadMore from '@expo/react-native-read-more-text';


// Local imports
import styles from './styles';
import services from './services'
import CategoryIcon from './categoryIcon';

const window = ReactNative.Dimensions.get('window');

class EventDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sharing_visible: true,
        };
    }
    _renderTruncatedFooter = (handlePress) => {
        return (
                <ReactNative.Text style={{fontWeight: 'bold', marginTop: 5}} onPress={handlePress}>
                Read more
                </ReactNative.Text>
               );
    }

    _renderRevealedFooter = (handlePress) => {
        return (
                <ReactNative.Text style={{fontWeight: 'bold', marginTop: 5}} onPress={handlePress}>
                Show less
                </ReactNative.Text>
               );
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
                        borderColor: 'hsl(' +services.getCategoryHue(this.props.event.event) + ',100%,' + services.getCategoryLightness(this.props.event.event)+ '%)',
                        justifyContent: 'center',
                        flex: 1,
                        height: 45,
                    }]}
                    onPress={()=>this.props.navigator.pop()}>
                        <ReactNative.Text>
                        <VectorIcons.FontAwesome name='chevron-left' color='#000000'/>
                        Back to Map</ReactNative.Text>

                        </ReactNative.TouchableHighlight>
                        <ReactNative.Text style={[styles.welcome]}>
                        {this.props.event.event.title}
                    </ReactNative.Text>
                    {this.props.event.event.image_url===undefined ? null :
                        <ReactNative.Image
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
                        <Hr lineColor='#b3b3b3' text='Description' textColor={'hsl(' +services.getCategoryHue(this.props.event.event) + ',100%,' + services.getCategoryLightness(this.props.event.event)+ '%)'}/>
                        <ReadMore
                        numberOfLines={3}
                    renderTruncatedFooter={this._renderTruncatedFooter}
                    renderRevealedFooter={this._renderRevealedFooter}
                    onReady={this._handleTextReady}
                    >
                        <ReactNative.Text
                        style={[styles.p,{
                            textAlign: 'justify',
                        }]}
                    >
                    {this.props.event.event.description == null ? "" :  this.props.event.event.description}
                    </ReactNative.Text>

                        </ReadMore>
                        <ReactNative.Text style={styles.p}>
                        {this.props.event.event.cost}
                    </ReactNative.Text>





                        <Hr lineColor='#b3b3b3' text='Remember' textColor={'hsl(' +services.getCategoryHue(this.props.event.event) + ',100%,' + services.getCategoryLightness(this.props.event.event)+ '%)'}/>
                        <ReactNative.View style={{ flex: 1, flexDirection: 'row' }}>
                        <ReactNative.TouchableHighlight
                        onPress={()=>{ReactNative.Share.share({
                            title: "Event",
                            message: this.props.event.event.url + "\n\n" + moment(this.props.event.event.datetime).format('dddd, MMMM D @ h:mm A') + '\n' + this.props.event.event.address + "\n\n--\n(Discovered with nmrfmo - http://exp.host/@mhoffman/nmrfmo/)",
                            url: "http://facebook.github.io/react-native/",
                            subject: "Share Link" //  for email
                        });
                        }}
                    style={[styles.clickable, { borderColor: 'hsl(' +services.getCategoryHue(this.props.event.event) + ',100%,' + services.getCategoryLightness(this.props.event.event)+ '%)'} ]}>
                        <ReactNative.Text style={styles.action_link}>Share <VectorIcons.Ionicons size={18} name="md-share" color="#000"/></ReactNative.Text>
                        </ReactNative.TouchableHighlight>

                        <ReactNative.TouchableHighlight
                        onPress={(index)=>Communications.web('https://calendar.google.com/calendar/gp#~calendar:view=e&bm=1?action=TEMPLATE&text=' + encodeURI(this.props.event.event.title.replace(/\s+/gi, '+')) + '&dates=' + moment(this.props.event.event.datetime).format("YYYYMMDD[T]HHmmssz/") + moment(this.props.event.event.datetime).add(1, "hours").format("YYYYMMDD[T]HHmmssz") + '&details=' + encodeURI(this.props.event.event.description.replace(/\s+/gi, '+') + '\n\n' + this.props.event.event.url) + '&location=' + encodeURI(this.props.event.event.address.replace(/\s+/gi, '+')) + '&sf=true&output=xml')}
                    style={[styles.clickable, { borderColor: 'hsl(' +services.getCategoryHue(this.props.event.event) + ',100%,' + services.getCategoryLightness(this.props.event.event)+ '%)'} ]}>
                        <ReactNative.Text style={[styles.action_link,
                        ]}>Add to Google Calendar <VectorIcons.FontAwesome size={18} name="calendar-plus-o" color="#000"/></ReactNative.Text>
                            </ReactNative.TouchableHighlight>
                            </ReactNative.View>





                            <Hr lineColor='#b3b3b3' text='Getting There' textColor={'hsl(' +services.getCategoryHue(this.props.event.event) + ',100%,' + services.getCategoryLightness(this.props.event.event)+ '%)'}/>

                            <ReactNative.View style={{ flex: 1, flexDirection: 'row' }}>

                            <ReactNative.TouchableHighlight onPress={(index)=>Communications.web('https://maps.google.com/maps?daddr=' + encodeURI( '' + this.props.event.event.lat + ',' + this.props.event.event.lon )  +  '/')}
                    style={[styles.clickable, { borderColor: 'hsl(' +services.getCategoryHue(this.props.event.event) + ',100%,' + services.getCategoryLightness(this.props.event.event)+ '%)'} ]}>
                        <ReactNative.Text style={[styles.action_link, {width: window.width/3. - 10}]}>Directions <VectorIcons.MaterialIcons size={18} name="directions" color="#000"/></ReactNative.Text>
                        </ReactNative.TouchableHighlight>

                        <ReactNative.TouchableHighlight
                        onPress={(index)=>{
                            Communications.web('lyft://ridetype?id=lyft_line&partner=hF0YCfyHmBhZ&destination[longitude]=' + this.props.event.event.lon + '&destination[latitude]=' + this.props.event.event.lat + '&pickup[latitude]=' + this.props.parent.mapView.state.latitude + '&pickup[longitude]=' + this.props.parent.mapView.state.longitude );
                        }}
                    style={[styles.clickable, { borderColor: 'hsl(' +services.getCategoryHue(this.props.event.event) + ',100%,' + services.getCategoryLightness(this.props.event.event)+ '%)'} ]}>
                        <ReactNative.Text style={[styles.action_link, {width: window.width/3. - 10}]}>Lyft <VectorIcons.Ionicons size={18} name="ios-car" color="#000"/></ReactNative.Text>

                        </ReactNative.TouchableHighlight>

                        <ReactNative.TouchableHighlight
                        onPress={(index)=>Communications.web('https://m.uber.com/ul/?action=setPickup&dropoff[longitude]=' + this.props.event.event.longitude + '&dropoff[latitude]=' + this.props.event.event.latitude +  '&dropoff[formatted_address]=' + this.props.event.event.address.replace(/ /gi, '%20') +'&pickup=my_location&client_id=qnzCX5gbWpvalF4QpJw0EjRfqNbNIgSm')}
                    style={[styles.clickable, { borderColor: 'hsl(' +services.getCategoryHue(this.props.event.event) + ',100%,' + services.getCategoryLightness(this.props.event.event)+ '%)'} ]}>
                        <ReactNative.Text style={[styles.action_link, {width: window.width/3. - 10}]}>Uber <VectorIcons.Ionicons size={18} name="ios-car" color="#000"/></ReactNative.Text>
                        </ReactNative.TouchableHighlight>
                        </ReactNative.View>











                        <Hr lineColor='#b3b3b3' text='Further Info' textColor={'hsl(' +services.getCategoryHue(this.props.event.event) + ',100%,' + services.getCategoryLightness(this.props.event.event)+ '%)'}/>

                        <ReactNative.View style={{
                            flex: 1,
                            flexDirection: 'row'
                        }}>

                    <ReactNative.TouchableHighlight style={[styles.clickable,
                        {
                            borderColor: 'hsl(' +services.getCategoryHue(this.props.event.event) + ',100%,' + services.getCategoryLightness(this.props.event.event)+ '%)',
                        }

                    ]} onPress={(index)=>Communications.web(this.props.event.event.publisher_url)}>
                        <ReactNative.Text style={[styles.action_link, {width: window.width/3. - 10}]}> Venue: {this.props.event.event.publisher} <VectorIcons.FontAwesome name='home' size={18}/></ReactNative.Text>
                        </ReactNative.TouchableHighlight>
                        <ReactNative.TouchableHighlight
                        onPress={(index)=>Communications.web('http://maps.google.com/maps?layer=c&cbll=' + this.props.event.event.latitude + ',' + this.props.event.event.longitude + '/')}
                    style={[styles.clickable, { borderColor: 'hsl(' +services.getCategoryHue(this.props.event.event) + ',100%,' + services.getCategoryLightness(this.props.event.event)+ '%)'} ]}>
                        <ReactNative.Text style={[styles.action_link, {width: window.width/3. - 10}]}>Street View <VectorIcons.FontAwesome size={18} name="street-view" color="#000"/></ReactNative.Text>
                        </ReactNative.TouchableHighlight>

                        <ReactNative.TouchableHighlight style={[styles.clickable,{
                            borderColor: 'hsl(' +services.getCategoryHue(this.props.event.event) + ',100%,' + services.getCategoryLightness(this.props.event.event)+ '%)',
                        }]} onPress={(index)=>Communications.web(this.props.event.event.url)} >
                    <ReactNative.Text style={[styles.action_link, {width: window.width/3. - 10}]}>Event Website <VectorIcons.FontAwesome name='external-link' size={18}/></ReactNative.Text>
                        </ReactNative.TouchableHighlight>
                        </ReactNative.View>



                        <Hr lineColor='#b3b3b3' text='Rate' textColor={'hsl(' +services.getCategoryHue(this.props.event.event) + ',100%,' + services.getCategoryLightness(this.props.event.event)+ '%)'}/>
                        <ReactNative.View style={{
                            flex: 1,
                            flexDirection: 'row'
                        }}>

                    <ReactNative.TouchableHighlight style={[styles.clickable,
                        {
                            borderColor: 'hsl(' +services.getCategoryHue(this.props.event.event) + ',100%,' + services.getCategoryLightness(this.props.event.event)+ '%)',
                        }

                    ]} onPress={(index)=>{
                        let vl = this.props.parent.mapView.state.venue_lists;
                        (vl.blocked || (vl.blocked = {}))[this.props.event.event.publisher] = true;
                        this.props.parent.mapView.setState({
                            venue_lists: vl
                        });
                        ReactNative.AsyncStorage.setItem('venue_lists', JSON.stringify(vl));

                    }}>
                    <ReactNative.Text style={[styles.action_link]}>Block Venue <VectorIcons.MaterialIcons name='block' size={18}/></ReactNative.Text>
                        </ReactNative.TouchableHighlight>


                        <ReactNative.TouchableHighlight style={[styles.clickable,
                            {
                                borderColor: 'hsl(' +services.getCategoryHue(this.props.event.event) + ',100%,' + services.getCategoryLightness(this.props.event.event)+ '%)',
                            }

                        ]} onPress={(index)=>{
                            let vl = this.props.parent.mapView.state.venue_lists;
                            (vl.favorites || (vl.favorites = {}))[this.props.event.event.publisher] = true;
                            this.props.parent.mapView.setState({
                                venue_lists: vl
                            });
                            ReactNative.AsyncStorage.setItem('venue_lists', JSON.stringify(vl));
                        }}>
                    <ReactNative.Text style={[styles.action_link]}>Add to Favorites <VectorIcons.SimpleLineIcons name='heart' size={18}/></ReactNative.Text>
                        </ReactNative.TouchableHighlight>
                        </ReactNative.View>




                        <Hr lineColor='#b3b3b3' text='Location' textColor={'hsl(' +services.getCategoryHue(this.props.event.event) + ',100%,' +services.getCategoryLightness(this.props.event.event)+ '%)'}/>
                        <ReactNative.Text style={styles.p}>{this.props.event.event.address}</ReactNative.Text>

                        <Hr lineColor='#b3b3b3' text='Categories' textColor={'hsl(' +services.getCategoryHue(this.props.event.event) + ',100%,' +services.getCategoryLightness(this.props.event.event)+ '%)'}/>
                        <ReactNative.Text style={styles.p}>
                        { this.props.event.event.categories==null ?  "" :
                            /*this.props.event.event.categories.join(" | ")*/
                            this.props.event.event.categories.map((category, cx)=>{
                                return <ReactNative.Text key={'mkld_' + this.props.event.event.id + '_' + cx} ><CategoryIcon key={'mkl_' + this.props.event.event.id + '_' + cx} size={14} category={category}/> {category} </ReactNative.Text>
                            })
                        }
                    </ReactNative.Text>
                        <ReactNative.Text style={styles.p}></ReactNative.Text>
                        <ReactNative.TouchableHighlight
                        style={[styles.clickable,
                            {
                                marginBottom:20,
                                borderColor: 'hsl(' +services.getCategoryHue(this.props.event.event) + ',100%,' +services.getCategoryLightness(this.props.event.event)+ '%)',
                                justifyContent: 'center',
                                flex: 1,
                                height: 45,
                            }]}
                    onPress={()=>this.props.navigator.pop()}>
                        <ReactNative.Text><VectorIcons.FontAwesome name='chevron-left' color='#000000'/> Back to Map</ReactNative.Text>

                        </ReactNative.TouchableHighlight>

                        </ReactNative.View>






                        </ReactNative.ScrollView>
                        )
    }
}

module.exports = EventDetails
