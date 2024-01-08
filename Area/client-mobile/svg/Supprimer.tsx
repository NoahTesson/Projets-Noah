import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import SupprimerSvg from '../assets/svg/supprimer.svg';

function SupprimerIcon({ isButton = false, size = 30, color = "#07AD3E", onPress = ()=>{}, style = {} }) {
    return isButton ? (
        <TouchableOpacity onPress={onPress} style={style}>
            <SupprimerSvg width={size} height={size} style={{ fill: color }} />
        </TouchableOpacity>
    ) : (
        <View style={style}>
            <SupprimerSvg width={size} height={size} style={{ fill: color }} />
        </View>
    )
}

export default SupprimerIcon;