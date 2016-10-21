'use strict';
import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
} from 'react-native';

var t = require('tcomb-form-native');
var Form = t.form.Form;

let what = t.enums({
    "All": "All",
    /*"Arts": "Arts",*/
    /*"Business": "Business",*/
    /*"Charity": "Charity",*/
    /*"Comedy": "Comedy",*/
    /*"Community": "Community",*/
    /*"Concerts": "Concerts",*/
    /*"Dance": "Dance",*/
    /*"Educational": "Educational",*/
    /*"Festivals": "Festivals",*/
    /*"Film": "Film",*/
    /*"Food & Drink": "Food & Drink",*/
    /*"Health & Fitness": "Health & Fitness",*/
    /*"Holiday": "Holiday",*/
    /*"Kids & Family": "Kids & Family",*/
    /*"Museums & Attractions": "Museums & Attractions",*/
    /*"Nightlife": "Nightlife",*/
    /*"Other": "Other",*/
    /*"Outdoors": "Outdoors",*/
    /*"Religious": "Religious",*/
    /*"Shopping": "Shopping",*/
}, "Categories");


let When = t.enums({
    now: 'now',
    today: 'today',
    tomorrow: 'tomorrow',
    weekend: 'weekend',
    week: 'week',
    month: 'month',
});


var EventSelection = t.struct({
    what: what,
    when: When,
})

const options = {
    fields: {
        category: {
            nullOption: false,
        },
        what: {
            nullOption: false,
        }
    }
}

const window = Dimensions.get('window');
const uri = 'http://pickaface.net/includes/themes/clean/img/slide2.png';

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: window.width,
        height: window.height,
        backgroundColor: 'white',
        padding: 20,
        zIndex: -10,
    },
    avatarContainer: {
        marginBottom: 20,
        marginTop: 20,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        flex: 1,
    },
    name: {
        position: 'absolute',
        left: 70,
        top: 20,
    },
    item: {
        fontSize: 14,
        fontWeight: '300',
        paddingTop: 5,
    },
});

/*module.exports = class Menu extends Component {*/
export default class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: {
                when: 'now',
                lastUpdatedAt: 0,
                what: 'All',
            },

        }
    };
    onChange(value){

        /*console.log(this.state.timeRange)*/
        /*console.log(value.timeRange)*/
        if(this.state.value.when !== value.when){
            /*console.log(this);*/
            this.setState({value});
            requestAnimationFrame(()=>{
                this.props.parent.props.parent.setState({lastUpdatedAt: 0, timeRange: value.when});
            });
            console.log("ONCHANGE");
            console.log(this);
            console.log("VALUE");
            console.log(value);
            console.log("CHANGED STATE");
            console.log(this.state);
        }
    };

    /*<Form ref="form" type={EventSelection} options={options} onChange={this.onChange.bind(this)} value={this.state.value} />*/
    render() {
        return (
                <ScrollView scrollsToTop={false} style={styles.menu}>
                <View style={styles.avatarContainer}>
                <Image
                style={styles.avatar}
                source={{ uri, }}/>
                <Text style={styles.name}>nmrfmo</Text>
                <Text style={styles.name}>nmrfmo</Text>
                </View>

                <Form ref="form" type={EventSelection} options={options} value={this.state.value} />


                </ScrollView>
               );
    }
};
