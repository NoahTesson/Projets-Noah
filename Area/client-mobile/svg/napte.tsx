import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import NapteSVG from '../assets/svg/napte.svg';

function NapteIcon({ isButton = false, size = 30, color = "#c061cb", onPress = () => {console.log("New Area clicked");}, style = {} }) {
    return isButton ? (
        <TouchableOpacity onPress={onPress} style={{flex: 1, alignItems: 'center'}}>
            <NapteSVG width={size} height={size} style={{ fill: color}} />
            <Text style={{color: color, marginTop: 2, fontSize: 13}}>Create Area</Text>
        </TouchableOpacity>
    ) : (
        <View style={{ alignItems: 'center'}}>
            <NapteSVG width={size} height={size} style={{ fill: color}} />
            <Text style={{color: color, marginTop: 2, fontSize: 13}}>Create Area</Text>
        </View>
    )
}
  
export default NapteIcon;