import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import GithubSVG from '../assets/svg/github.svg';

function GithubIcon({ isButton = false, size = 30, color = "#c061cb", onPress = ()=>{}, style = {} }) {
    return isButton ? (
        <TouchableOpacity onPress={onPress} style={style}>
            <GithubSVG width={size} height={size} style={{ fill: color }} />
        </TouchableOpacity>
    ) : (
        <View style={style}>
            <GithubSVG width={size} height={size} style={{ fill: color }} />
        </View>
    )
}
  
export default GithubIcon;