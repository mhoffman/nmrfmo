'use strict';
import Exponent from 'expo';
import React, { Component } from 'react';
import ReactNative from 'react-native';

import { AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { logger } from 'redux-logger';
import thunk from 'redux-thunk'

import Navigator from './scenes/navigator';
import reducers from './store/reducers'

/*const store = createStore(reducers,*/
/*undefined,*/
/*compose(*/
/*applyMiddleware(thunk),*/
/*autoRehydrate()*/
/*)*/
/*)*/

/*const store = compose(autoRehydrate())(createStore)(reducers)*/
/*const store = compose(autoRehydrate())(createStore)(reducers, applyMiddleware(logger), applyMiddleware(thunk))*/
const store = compose(autoRehydrate())(createStore)(reducers, applyMiddleware(logger))
if (typeof self === 'object'){
    persistStore(store, {storage: AsyncStorage}, () => {
        console.log('restored')
    })
}

class ReduxApp extends Component{
    constructor(props){
        super(props);
        this.state = {
            rehydrated: false
        }
    }
    componentWillMount(){
        persistStore(store, {storage: AsyncStorage}, () =>{
            this.setState({rehydrated: true})
            console.log('restored')

        })
    }
    render(){
        if(!this.state.rehydrated){
            return <ReactNative.Text>Loading ...</ReactNative.Text>
        }else{
            return (
                <Provider store={store}>
                <Navigator />
                </Provider>
            )
        }
    }
}
export default ReduxApp
