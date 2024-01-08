import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated,{ FadeInDown, FadeOutDown} from 'react-native-reanimated'
import { Image } from "expo-image";

import SpaceImage from '../../function/getNasaImage'

import { BACKGROUND_COLOR_WIDGET, SHADOW_COLOR } from '../../Variable';

const ImageCroix = require('../../assets/wcross.png')

export default function WidgetNasa(props) {

    return (
        <Animated.View
            entering={FadeInDown}
            exiting={FadeOutDown}
            style={styles.container}
        >
            <SpaceImage/>
            <TouchableOpacity style={styles.button} onPress={() => props.updState()}>
              <Image
                  style={styles.imageCroix}
                  source={ImageCroix}
                  contentFit="cover"
                  transition={1000}
              />
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 170,
        height: 158,
        borderRadius: 30,
        backgroundColor: BACKGROUND_COLOR_WIDGET,
        shadowColor: SHADOW_COLOR,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    imageCroix: {
        width: 20,
        height: 20,
    },
    button: {
        position: 'absolute',
        margin: 10,
    },
});
