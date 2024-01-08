import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import CroixSVG from '../assets/svg/croix.svg';

function CroixIcon({ isButton = false, size = 30, color = "#c061cb", onPress = ()=>{}, style = {} }) {
    return isButton ? (
        <TouchableOpacity onPress={onPress} style={style}>
            <CroixSVG width={size} height={size} style={{ fill: color }} />
        </TouchableOpacity>
    ) : (
        <View style={style}>
            <CroixSVG width={size} height={size} style={{ fill: color }} />
        </View>
    )
}

export default CroixIcon;