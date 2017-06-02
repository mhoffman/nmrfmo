'use strict';
import Exponent from 'expo';
import React from 'react';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import MapView from './scenes/mapview';
import reducers from './store/reducers'

const store = createStore(reducers, applyMiddleware(thunk))

const ReduxApp = () => (
    <Provider store={store}>
        <MapView />
        </Provider>
)

Exponent.registerRootComponent(ReduxApp);
