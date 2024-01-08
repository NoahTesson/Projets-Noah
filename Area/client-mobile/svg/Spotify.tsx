import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import SpotifySVG from '../assets/svg/spotify.svg';

function SpotifyIcon({ isButton = false, size = 30, color = "#c061cb", onPress = ()=>{}, style = {} }) {
    return isButton ? (
        <TouchableOpacity onPress={onPress} style={style}>
            <SpotifySVG width={size} height={size} style={{ fill: color }} />
        </TouchableOpacity>
    ) : (
        <View style={style}>
            <SpotifySVG width={size} height={size} style={{ fill: color }} />
        </View>
    )
}
  
export default SpotifyIcon;