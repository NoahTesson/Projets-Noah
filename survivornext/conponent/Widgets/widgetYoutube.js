import React from "react";
import { View, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { Image } from "expo-image";

import { BACKGROUND_COLOR_WIDGET, SIZE_MEDIUM, SHADOW_COLOR } from '../../Variable';

const ImageYoutube = require('../../assets/navigateur.png')
const ImageCroix = require('../../assets/croix-petit.png')

export default function WidgetYoutube(props) {
    return (
        <View style={styles.container}>
            <Pressable onPress={() => props.changeModalYoutube(true)}>
            <TouchableOpacity style={styles.button} onPress={() => props.updState()}>
              <Image
                  style={styles.imageCroix}
                  source={ImageCroix}
                  contentFit="cover"
                  transition={1000}
              />
            </TouchableOpacity>
            <Image
                    style={styles.imageYoutube}
                    source={ImageYoutube}
                    contentFit="cover"
                    transition={1000}
            />
            </Pressable>
        </View>
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
    imageYoutube: {
        width: 80,
        height: 80,
        marginLeft: 45,
    },
    imageCroix: {
        width: 30,
        height: 30,
    },
    button: {
        fontSize: SIZE_MEDIUM,
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
