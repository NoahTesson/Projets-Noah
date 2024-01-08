import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import EmailSVG from '../assets/svg/email.svg';

function EmailIcon({ isButton = false, size = 30, color = "black", onPress = ()=>{}, style = {} }) {
    return isButton ? (
        <TouchableOpacity onPress={onPress} style={style}>
            <EmailSVG width={size} height={size} style={{ fill: color }} />
        </TouchableOpacity>
    ) : (
        <View style={style}>
            <EmailSVG width={size} height={size} style={{ fill: color }} />
        </View>
    )
}
  
export default EmailIcon;