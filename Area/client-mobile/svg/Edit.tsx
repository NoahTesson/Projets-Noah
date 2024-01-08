import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import EditSvg from '../assets/svg/edit.svg';

function EditIcon({ isButton = false, size = 30, color = "#07AD3E", onPress = ()=>{}, style = {} }) {
    return isButton ? (
        <TouchableOpacity onPress={onPress} style={style}>
            <EditSvg width={size} height={size} style={{ fill: color }} />
        </TouchableOpacity>
    ) : (
        <View style={style}>
            <EditSvg width={size} height={size} style={{ fill: color }} />
        </View>
    )
}

export default EditIcon;