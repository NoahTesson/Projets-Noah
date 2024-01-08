import React from "react";
import { View, StyleSheet, TouchableOpacity, Pressable, Text } from "react-native";
import Animated,{ FadeInDown, FadeOutDown} from 'react-native-reanimated'
import { Image } from "expo-image";

import getDay from "../../function/getDay"
import getMonthLetter from "../../function/getMonth"

import { BACKGROUND_COLOR_WIDGET, SHADOW_COLOR, MAIN_COLOR } from '../../Variable';

const ImageCroix = require('../../assets/croix-petit.png')

export default function WidgetCalendar(props) {
    var date = new Date().getDate();
    var month = getMonthLetter(new Date().getMonth());
    var day = getDay(new Date().getDay());

    return (
        <Animated.View
            entering={FadeInDown}
            exiting={FadeOutDown}
            style={styles.container}
        >
            <Pressable onPress={() => props.changeModalCalendar(true)}>
            <TouchableOpacity style={styles.button} onPress={() => props.updState()}>
              <Image
                  style={styles.imageCroix}
                  source={ImageCroix}
                  contentFit="cover"
                  transition={1000}
              />
            </TouchableOpacity>
            <View style={styles.dateContainer}>
                <Text style={{fontSize: 20}}>{day}</Text>
                <Text style={{fontSize: 40}}>{date}</Text>
                <Text style={{fontSize: 20}}>{month}</Text>
            </View>
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
    dateContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginBottom: 1000,
    },
    imageCalendar: {
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
