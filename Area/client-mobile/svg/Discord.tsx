import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import DiscordSVG from '../assets/svg/discord.svg';

function DiscordIcon({ isButton = false, size = 30, color = "#c061cb", onPress = ()=>{}, style = {} }) {
    return isButton ? (
        <TouchableOpacity onPress={onPress} style={style}>
            <DiscordSVG width={size} height={size} style={{ fill: color }} />
        </TouchableOpacity>
    ) : (
        <View style={style}>
            <DiscordSVG width={size} height={size} style={{ fill: color }} />
        </View>
    )
}
  
export default DiscordIcon;