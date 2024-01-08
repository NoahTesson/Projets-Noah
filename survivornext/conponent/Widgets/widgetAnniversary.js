import React from "react";
import { StyleSheet, Image, TouchableOpacity, Pressable } from "react-native";
import Animated,{ FadeInDown, FadeOutDown} from 'react-native-reanimated'

const ImageCroix = require('../../assets/croix-petit.png')
const ImageBirthday = require('../../assets/birthday.png')

export default function WidgetAnniversary(props) {
    return (
        <Animated.View
            entering={FadeInDown}
            exiting={FadeOutDown}
            style={styles.container}
        >
            <Pressable onPress={() => props.changeModalAnniversary(true)}>
                <TouchableOpacity style={styles.button} onPress={() => props.updState()}>
                    <Image
                        style={styles.imageCroix}
                        source={ImageCroix}
                        contentFit="cover"
                        transition={1000}
                    />
                </TouchableOpacity>
                <Image
                    style={styles.imageBirthday}
                    source={ImageBirthday}
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
        backgroundColor: '#D9D9D9',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    imageCroix: {
        width: 30,
        height: 30,
    },
    imageBirthday: {
        width: 80,
        height: 80,
        marginLeft: 45,
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
