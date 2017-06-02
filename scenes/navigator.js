'use strict';

import moment from 'moment-timezone';

import React, { Component } from 'react';
import ReactNative from 'react-native';
import DeprecatedComponents from 'react-native-deprecated-custom-components';

import WebPreview from './web_preview'
import MyMapView from './mapview.js'
import EventDetails from './detailView'

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
        }else if(route.name == 'event_details') {
            return <EventDetails
                navigator={navigator}
            parent={this}
            {...route.passProps}/>
        } else if(route.name == 'web_preview'){
            return <WebPreview
                navigator={navigator}
            parent={this}
            {...route.passProps}
            />
        }
    }
}

module.exports = Navi
