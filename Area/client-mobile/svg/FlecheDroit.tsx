import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import FlecheDroiteSVG from '../assets/svg/fleche_droit.svg';

function FlecheDroiteIcon({ isButton = false, size = 30, color = "#c061cb", onPress = ()=>{}, style = {} }) {
    return isButton ? (
        <TouchableOpacity onPress={onPress} style={style}>
            <FlecheDroiteSVG width={size} height={size} style={{ fill: color }} />
        </TouchableOpacity>
    ) : (
        <View style={style}>
            <FlecheDroiteSVG width={size} height={size} style={{ fill: color }} />
        </View>
    )
}
  
export default FlecheDroiteIcon;