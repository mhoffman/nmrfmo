'use strict';

import constants from './constants';

function getCategoryHue(result){
    if(result !== null && result !== undefined){
        if(result.categories !== null && result.categories!==undefined && result.categories.length > 0){
            if(constants.whatHues[result.categories[0]]!==undefined){
                return constants.whatHues[result.categories[0]]
            } else {
                return constants.PRIMARY_HUE;
            }
        } else {
            return constants.PRIMARY_HUE;
        }
    } else {
        /*console.log("Warning: getCategoryHue received undefined result.");*/
        return constants.PRIMARY_HUE
    }
}


function getCategoryLightness(result){
    if(result !== null && result !== undefined){
        if(result.categories !== null && result.categories !== undefined &&  result.categories.length > 0){

            if(constants.whatLightness[result.categories[0]]!==undefined){
                return constants.whatLightness[result.categories[0]]
            } else {
                return constants.PRIMARY_LIGHTNESS
            }
        } else {
            return constants.PRIMARY_LIGHTNESS
        }
    } else {
        /*console.log("Warning: getCategoryHue received undefined result.");*/
        return constants.PRIMARY_HUE
    }
}


module.exports = {
    getCategoryLightness,
    getCategoryHue,
}
