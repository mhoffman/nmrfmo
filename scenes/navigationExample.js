import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableHighlight,
    Navigator,
    Text,
    View
} from 'react-native';


class Main extends Component {
    navigate(routeName) {
        this.props.navigator.push({
            name: routeName
        });
    }
    render() {
        return (
                <View style={styles.container}>
                <Text style={styles.welcome}>
                Main
                </Text>
                <TouchableHighlight onPress={this.navigate.bind(this, "stats")}>
                <Text>TO STATS PAGE</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.navigate.bind(this, "help")}>
                <Text>TO HELP PAGE</Text>
                </TouchableHighlight>
                </View>
               );
    }
}

class Help extends Component {
    render() {
        return (
                <View style={styles.container}>
                <Text style={styles.welcome}>
                Help
                </Text>
                <Text style={styles.p}>
                When you got here, that means you must be pretty helpless. Well this page won't help you either. You can only go back.
                </Text>
                <TouchableHighlight onPress={()=>this.props.navigator.pop()}>
                <Text>BACK</Text>
                </TouchableHighlight>
                </View>
               );
    }
}

class Stats extends Component {
    render() {
        return (
                <View style={styles.container}>
                <Text style={styles.welcome}>
                Stats
                </Text>
                <TouchableHighlight onPress={this.props.navigator.pop}>
                <Text>BACK</Text>
                </TouchableHighlight>
                </View>
               );
    }
}

export default class Navi extends Component {
    render() {
        return (
                <Navigator
                initialRoute={{ name: 'main'}}
                renderScene={this.renderScene.bind(this)}
                configureScene={(route, routeStack) =>
                    /*Navigator.SceneConfigs.FloatFromRight*/
                    /*Navigator.SceneConfigs.FloatFromLeft*/
                    /*Navigator.SceneConfigs.FadeAndroid*/
                    /*Navigator.SceneConfigs.HorizontalSwipeJump*/
                    Navigator.SceneConfigs.PushFromRight
                }
                />
               );
    }

    renderScene(route, navigator) {
        if(route.name == 'main') {
            return <Main navigator={navigator} />
        }
        if(route.name == 'stats') {
            return <Stats navigator={navigator} />
        }
        if(route.name == 'help') {
            return <Help navigator={navigator} />
        }
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop:20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    p: {
        fontSize: 12,
        textAlign: 'left',
        margin: 10,
    },
});


