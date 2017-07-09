import React, { Component } from 'react';
import ReactNative from 'react-native';
import VectorIcons from '@expo/vector-icons'
import Exponent from 'expo'

class WebPreview extends React.Component {
    constructor(props){
        super(props);
        console.log("In Web Preview ...")
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
            <ReactNative.View
            style={{
                flex: 1,
                    flexDirection: 'column',
                    marginTop: Exponent.Constants.statusBarHeight,
            }}
            >
            <ReactNative.View
            style={{
                flex: 1,
                    flexDirection: 'row',
                    height: 20,
                    backgroundColor: 'tomato'
            }}
            >
            <ReactNative.TouchableHighlight
            onPress={()=>this.props.navigator.pop()}
            >
            <VectorIcons.FontAwesome name='chevron-left' size={24} color='white'
            style={{
                margin: 15,
            }}
            />
            </ReactNative.TouchableHighlight>
            <ReactNative.View
            style={{
                flexDirection: 'column'
            }}>
            <ReactNative.Text
            style={{
                    color: 'white'
            }}
            numberOfLines={1}
            ellipsizeMode={'tail'}
            >
            {this.props.title}
            </ReactNative.Text>
            <ReactNative.Text
            style={{
                    color: 'white'
            }}
            numberOfLines={1}
            ellipsizeMode={'tail'}
            >
            {this.props.url}
            </ReactNative.Text>
            </ReactNative.View>
            </ReactNative.View>
            <ReactNative.View
            style={{
                flex: 10
            }}>
            <ReactNative.WebView
            source={{uri: this.props.url}}
            style={{
                height: 300
            }}
            />
            </ReactNative.View>
            </ReactNative.View>
        );
    }

}

module.exports = WebPreview
