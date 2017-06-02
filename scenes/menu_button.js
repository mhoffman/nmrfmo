'use strict';
import React, { Component } from 'react';
import ReactNative from 'react-native';

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

module.exports = MenuButton
