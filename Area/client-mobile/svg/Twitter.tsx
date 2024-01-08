import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import TwitterSVG from '../assets/svg/twitter.svg';

function TwitterIcon({ isButton = false, size = 30, color = "#c061cb", onPress = ()=>{}, style = {} }) {
    return isButton ? (
        <TouchableOpacity onPress={onPress} style={style}>
            <TwitterSVG width={size} height={size} style={{ fill: color }} />
        </TouchableOpacity>
    ) : (
        <View style={style}>
            <TwitterSVG width={size} height={size} style={{ fill: color }} />
        </View>
    )
}
  
export default TwitterIcon;