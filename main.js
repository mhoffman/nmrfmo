'use strict';
import Exponent from 'expo';
import 'expo';
import MapView from './screens/mapview';
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

class SView extends Component {
    render(){
    return(
            <View>
            <Text style={{marginTop: 40, textAlign: 'center'}}>Nothing there.</Text>
            </View>
            )
    }
}


Exponent.registerRootComponent(MapView);
/*Exponent.registerRootComponent(SView);*/
