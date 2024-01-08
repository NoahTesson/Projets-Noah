import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import AccueilSVG from '../assets/svg/accueil.svg';

function AccueilIcon({ isButton = false, size = 30, color = "#c061cb", onPress = () => {console.log("Accueil clicked");}, style = {} }) {
    return isButton ? (
        <TouchableOpacity onPress={onPress} style={{flex: 1, alignItems: 'center'}}>
            <AccueilSVG width={size} height={size} style={{ fill: color }} />
            <Text style={{color: color, marginTop: 2, fontSize: 13}}>Home</Text>
        </TouchableOpacity>
    ) : (
        <View style={{ alignItems: 'center'}}>
            <AccueilSVG width={size} height={size} style={{ fill: color }} />
            <Text style={{color: color, marginTop: 2, fontSize: 13}}>Home</Text>
        </View>
    )
}
  
export default AccueilIcon;