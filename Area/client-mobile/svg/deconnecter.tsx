import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import DeconnecterSVG from '../assets/svg/deconnecter.svg';

function DeconnecterIcon({ isButton = false, size = 30, color = "#c061cb", onPress = () => {console.log("Accueil clicked");}, style = {} }) {
    return isButton ? (
        <TouchableOpacity onPress={onPress} style={{ alignItems: 'center'}}>
            <DeconnecterSVG width={size} height={size} style={{ fill: color }} />
        </TouchableOpacity>
    ) : (
        <View style={{ alignItems: 'center'}}>
            <DeconnecterSVG width={size} height={size} style={{ fill: color }} />
        </View>
    )
}
  
export default DeconnecterIcon;