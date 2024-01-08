import React from 'react';
import { View, StyleSheet } from 'react-native';
import PieceReactionSVG from '../assets/svg/pieces_reaction2.svg'

function PieceReactionIcon({ width = 30, height = 30, color = "#c061cb", style = {} }) {
    return (
        <View style={[style, styles.container]}>
            <PieceReactionSVG width={width} height={height} style={{ fill: color }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
});

export default PieceReactionIcon;