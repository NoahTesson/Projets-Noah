import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import UserSVG from '../assets/svg/user.svg';

function UserIcon({ isButton = false, size = 30, color = "#c061cb", onPress = () => {console.log("User clicked");}, style = {} }) {
    return isButton ? (
        <TouchableOpacity onPress={onPress} style={{flex: 1, alignItems: 'center'}}>
            <UserSVG width={size} height={size} style={{ fill: color}} />
            <Text style={{color: color, marginTop: 2, fontSize: 13}}>Profile</Text>
        </TouchableOpacity>
    ) : (
        <View style={{ alignItems: 'center'}}>
            <UserSVG width={size} height={size} style={{ fill: color}} />
            <Text style={{color: color, marginTop: 2, fontSize: 13}}>Profile</Text>
        </View>
    )
}
  
export default UserIcon;