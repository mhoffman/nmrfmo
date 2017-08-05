'use strict';

import React, { Component } from 'react';
import VectorIcons from '@expo/vector-icons';

import constants from './constants';

class CategoryIcon extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        if(this.props.color===undefined){
            var color = 'hsl(' + constants.whatHues[this.props.category] + ',100%,' + constants.whatLightness[this.props.category] + '%)';
        } else {
            var color = this.props.color;
        }

        var size = this.props.size || 18;
        if(this.props.category =='Arts'){ return <VectorIcons.Ionicons name='ios-color-palette' size={size} color={color}/>
        } else if (this.props.category == 'Activism'){ return <VectorIcons.FontAwesome name='hand-rock-o' size={size} color={color}/>
        } else if (this.props.category == 'Books'){ return  <VectorIcons.Entypo name='book' size={size} color={color}/>
        } else if (this.props.category == 'Comedy'){ return <VectorIcons.Octicons name='smiley' size={size} color={color}/>
        } else if (this.props.category == 'Community'){ return <VectorIcons.MaterialIcons name='location-city' size={size} color={color}/>
        } else if (this.props.category == 'Concerts'){ return <VectorIcons.FontAwesome name='hand-peace-o' size={size} color={color}/>
        } else if (this.props.category == 'Dance'){ return <VectorIcons.Entypo name='sound' size={size} color={color}/>
        } else if (this.props.category == 'Educational'){ return  <VectorIcons.Entypo name='blackboard' size={size} color={color}/>
        } else if (this.props.category == 'Festivals'){ return  <VectorIcons.Ionicons name='ios-beer' size={size} color={color}/>
        } else if (this.props.category == 'Food & Drink'){ return <VectorIcons.MaterialIcons name='local-dining' size={size} color={color}/>
        } else if (this.props.category == 'Health & Fitness'){ return <VectorIcons.MaterialIcons name='fitness-center' size={size} color={color}/>
        } else if (this.props.category == 'Kids & Family'){ return <VectorIcons.MaterialIcons name='child-friendly' size={size} color={color}/>
        } else if (this.props.category == 'Meetup'){ return <VectorIcons.FontAwesome name='meetup' size={size} color={color}/>
        } else if (this.props.category == 'Movies'){ return <VectorIcons.MaterialIcons name='local-movies' size={size} color={color}/>
        } else if (this.props.category == 'Museums & Attractions'){ return <VectorIcons.FontAwesome name='building' size={size} color={color}/>
        } else if (this.props.category == 'Music'){ return  <VectorIcons.MaterialIcons name='music-note' size={size} color={color}/>
        } else if (this.props.category == 'Shopping'){ return  <VectorIcons.MaterialIcons name='shopping-basket' size={size} color={color}/>
        } else if (this.props.category == 'Nightlife'){ return <VectorIcons.Ionicons name='ios-cloudy-night' size={size} color={color}/>
        } else if (this.props.category == 'Outdoors'){ return  <VectorIcons.MaterialIcons name='nature-people' size={size} color={color}/>
        } else if (this.props.category == 'Personal'){ return  <VectorIcons.FontAwesome name='heart-o' size={size} color={color}/>
        } else if (this.props.category == 'Religious'){ return <VectorIcons.Entypo name='moon' size={size} color={color}/>
        } else if (this.props.category == 'Theater'){ return <VectorIcons.Entypo name='mask' size={size} color={color}/>
        } else if (this.props.category == 'Sports'){ return  <VectorIcons.Ionicons name='ios-american-football-outline' size={size} color={color}/>
        } else { return <VectorIcons.MaterialIcons name='check-box-outline-blank' size={size}/>
        }
    }
}

module.exports = CategoryIcon 
