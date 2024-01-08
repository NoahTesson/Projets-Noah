import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import GoogleSvg from '../assets/svg/Google.svg';

function SheetIcon({ isButton = false, size = 30, color = "#07AD3E", onPress = ()=>{}, style = {} }) {
    return isButton ? (
        <TouchableOpacity onPress={onPress} style={style}>
            <GoogleSvg width={size} height={size} style={{ fill: color }} />
        </TouchableOpacity>
    ) : (
        <View style={style}>
            <GoogleSvg width={size} height={size} style={{ fill: color }} />
        </View>
    )
}

export default SheetIcon;