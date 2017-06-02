'use strict';
import React, { Component } from 'react';
import ReactNative from 'react-native';

class WebPreview extends React.Component {
    constructor(props){
        super(props);
        this.handleBack = (() => {
            if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1){
                this.props.navigator.pop();
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

    render(){
        return (
                <ReactNative.WebView
                source={{uri: this.props.url}}
                />
               );
    }

}

module.exports = WebPreview
