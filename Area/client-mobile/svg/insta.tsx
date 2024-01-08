import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import InstaSVG from '../assets/svg/insta.svg';

function InstaIcon({ isButton = false, size = 30, color = "#c061cb", onPress = ()=>{}, style = {} }) {
    return isButton ? (
        <TouchableOpacity onPress={onPress} style={style}>
            <InstaSVG width={size} height={size} style={{ fill: color }} />
        </TouchableOpacity>
    ) : (
        <View style={style}>
            <InstaSVG width={size} height={size} style={{ fill: color }} />
        </View>
    )
}
  
export default InstaIcon;