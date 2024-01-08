import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import ChessSVG from '../assets/svg/chess.svg';

function ChessIcon({ isButton = false, size = 30, color = "#779954", onPress = ()=>{}, style = {} }) {
    return isButton ? (
        <TouchableOpacity onPress={onPress} style={style}>
            <ChessSVG width={size} height={size} style={{ fill: color }} />
        </TouchableOpacity>
    ) : (
        <View style={style}>
            <ChessSVG width={size} height={size} style={{ fill: color }} />
        </View>
    )
}

export default ChessIcon;