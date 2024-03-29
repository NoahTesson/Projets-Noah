import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import OeilSVG from '../assets/svg/oeil.svg';

function OeilIcon({ isButton = false, size = 30, color = "#c061cb", onPress = ()=>{}, style = {} }) {
    return isButton ? (
        <TouchableOpacity onPress={onPress} style={style}>
            <OeilSVG width={size} height={size} style={{ fill: color }} />
        </TouchableOpacity>
    ) : (
        <View style={style}>
            <OeilSVG width={size} height={size} style={{ fill: color }} />
        </View>
    )
}
  
export default OeilIcon;