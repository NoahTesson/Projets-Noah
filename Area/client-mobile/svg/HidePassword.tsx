import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import HideOeilSVG from '../assets/svg/oeil-croise.svg';

function HideOeilIcon({ isButton = false, size = 30, color = "#c061cb", onPress = ()=>{}, style = {} }) {
    return isButton ? (
        <TouchableOpacity onPress={onPress} style={style}>
            <HideOeilSVG width={size} height={size} style={{ fill: color }} />
        </TouchableOpacity>
    ) : (
        <View style={style}>
            <HideOeilSVG width={size} height={size} style={{ fill: color }} />
        </View>
    )
}
  
export default HideOeilIcon;