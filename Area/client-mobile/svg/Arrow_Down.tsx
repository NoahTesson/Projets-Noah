import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import ArrowDownSVG from '../assets/svg/arrow_Down.svg';

function ArrowDownIcon({ isButton = false, size = 30, color = "#c061cb", onPress = ()=>{}, style = {} }) {
    return isButton ? (
        <TouchableOpacity onPress={onPress} style={style}>
            <ArrowDownSVG width={size} height={size} style={{ fill: color }} />
        </TouchableOpacity>
    ) : (
        <View style={style}>
            <ArrowDownSVG width={size} height={size} style={{ fill: color }} />
        </View>
    )
}
  
export default ArrowDownIcon;