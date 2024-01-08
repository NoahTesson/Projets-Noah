import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import CrayonSVG from '../assets/svg/crayon.svg';

function CrayonIcon({ isButton = false, size = 30, color = "#c061cb", onPress = () => {console.log("Accueil clicked");}, style = {} }) {
    return isButton ? (
        <TouchableOpacity onPress={onPress} style={style}>
            <CrayonSVG width={size} height={size} style={{ fill: color }} />
        </TouchableOpacity>
    ) : (
        <View style={style}>
            <CrayonSVG width={size} height={size} style={{ fill: color }} />
        </View>
    )
}
  
export default CrayonIcon;