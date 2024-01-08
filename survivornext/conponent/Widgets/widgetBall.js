import React from "react";
import { StyleSheet, TouchableOpacity, Pressable } from "react-native";
import Animated,{ FadeInDown, FadeOutDown} from 'react-native-reanimated'
import { Image } from "expo-image";

import { BACKGROUND_COLOR_WIDGET, SHADOW_COLOR } from '../../Variable';

const ImageBall = require('../../assets/basketball.png')
const ImageCroix = require('../../assets/croix-petit.png')

export default function WidgetBall(props) {

    return (
        <Animated.View
            entering={FadeInDown}
            exiting={FadeOutDown}
            style={styles.container}
        >
            <Pressable onPress={() => props.changeModalBall(true)}>
            <TouchableOpacity style={styles.button} onPress={() => props.updState()}>
              <Image
                  style={styles.imageCroix}
                  source={ImageCroix}
                  contentFit="cover"
                  transition={1000}
              />
            </TouchableOpacity>
            <Image
                    style={styles.imageBall}
                    source={ImageBall}
                    contentFit="cover"
                    transition={1000}
            />
            </Pressable>
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
    imageBall: {
        width: 80,
        height: 80,
        marginLeft: 45,
    },
    imageCroix: {
        width: 30,
        height: 30,
    },
    button: {
        color: 'grey',
        fontSize: 20,
        width: 50,
        height: 50,
        border: 'none',
        borderRadius: 50,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 30,
    },
});
