import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import TeamsSVG from '../assets/svg/teams.svg';

function TeamsIcon({ isButton = false, size = 30, color = "#c061cb", onPress = ()=>{}, style = {} }) {
    return isButton ? (
        <TouchableOpacity onPress={onPress} style={style}>
            <TeamsSVG width={size} height={size} style={{ fill: color }} />
        </TouchableOpacity>
    ) : (
        <View style={style}>
            <TeamsSVG width={size} height={size} style={{ fill: color }} />
        </View>
    )
}

export default TeamsIcon;