import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import LeftArrowSVG from '../assets/svg/left_arrow.svg';

function LeftArrowIcon({ isButton = false, size = 30, color = "#c061cb", onPress = ()=>{}, style = {} }) {
    return isButton ? (
        <TouchableOpacity onPress={onPress} style={style}>
            <LeftArrowSVG width={size} height={size} style={{ fill: color }} />
        </TouchableOpacity>
    ) : (
        <View style={style}>
            <LeftArrowSVG width={size} height={size} style={{ fill: color }} />
        </View>
    )
}
  
export default LeftArrowIcon;