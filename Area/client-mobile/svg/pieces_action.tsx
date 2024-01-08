import React from 'react';
import { View, StyleSheet } from 'react-native';
import PieceActionSVG from '../assets/svg/pieces_action2.svg'

function PieceActionIcon({ width = 30, height = 30, color = "#c061cb", style = {} }) {
    return (
        <View style={[style, styles.container]}>
            <PieceActionSVG width={width} height={height} style={{ fill: color }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
});

export default PieceActionIcon;