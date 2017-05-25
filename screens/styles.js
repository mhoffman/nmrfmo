'use strict';

import ReactNative from 'react-native';
import Exponent from 'expo'
const window = ReactNative.Dimensions.get('window');

import constants from './constants';

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
        borderColor: constants.PRIMARY_COLOR,
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
        bottom: constants.BOTTOM_HEIGHT,
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
        top: window.height - constants.BOTTOM_HEIGHT - Exponent.Constants.statusBarHeight,
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
        backgroundColor: constants.PRIMARY_COLOR,
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
    mini_action_link : {
        /*textAlign: 'center',*/
        paddingVertical: 2,
    },
    action_link : {
        flex: 1,
        flexDirection: 'row',
        textAlign: 'center',
        paddingVertical: 6,
        width: window.width/2. - 10,
        justifyContent: 'center',
        height: 50,
        alignItems: 'center',
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

module.exports = styles
