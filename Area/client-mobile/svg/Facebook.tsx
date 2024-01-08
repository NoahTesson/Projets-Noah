import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import FacebookSVG from '../assets/svg/facebook.svg';

function FacebookIcon({ isButton = false, size = 30, color = "#c061cb", onPress = ()=>{}, style = {} }) {
    return isButton ? (
        <TouchableOpacity onPress={onPress} style={style}>
            <FacebookSVG width={size} height={size} style={{ fill: color }} />
        </TouchableOpacity>
    ) : (
        <View style={style}>
            <FacebookSVG width={size} height={size} style={{ fill: color }} />
        </View>
    )
}
  
export default FacebookIcon;