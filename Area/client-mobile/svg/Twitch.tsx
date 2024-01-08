import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import TwitchSVG from '../assets/svg/twitch.svg';

function TwitchIcon({ isButton = false, size = 30, color = "#c061cb", onPress = ()=>{}, style = {} }) {
    return isButton ? (
        <TouchableOpacity onPress={onPress} style={style}>
            <TwitchSVG width={size} height={size} style={{ fill: color }} />
        </TouchableOpacity>
    ) : (
        <View style={style}>
            <TwitchSVG width={size} height={size} style={{ fill: color }} />
        </View>
    )
}
  
export default TwitchIcon;