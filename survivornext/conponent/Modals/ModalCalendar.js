import React from "react";
import { View, Modal, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Calendar } from 'react-native-calendars';
import { Image } from "expo-image";

const ImageCalendar = require('../../assets/calendar.png')

import { COLOR_TEXT_BUTTON, MAIN_COLOR } from '../../Variable'

export default function Calendrier(props) {
    return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={props.modalChat}
        onRequestClose={() => props.changeModalCalendar(false)}
    >
        <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.button} onPress={() => props.changeModalCalendar(false)}>
                <Image
                  style={styles.imageCalendar}
                  source={ImageCalendar}
                  contentFit="cover"
                  transition={1000}
                />
            </TouchableOpacity>
            <Calendar
                style={{marginTop: 20}}
                current={'2023-09-01'}
                minDate={'2021-09-01'}
                maxDate={'2025-09-30'}
                monthFormat={'yyyy MM'}
            />
            <TouchableOpacity style={styles.buttonEnd} onPress={() => props.changeModalCalendar(false)}>
                <Text style={{color: COLOR_TEXT_BUTTON}}>Fermer</Text>
            </TouchableOpacity>
        </View>
    </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        borderRadius: 25,
        marginTop: "28%",
        marginLeft: "3%",
        backgroundColor: 'rgb(255, 255, 255)',
        width: "94%",
        height: "73%",
    },
    imageCalendar: {
        width: 30,
        height: 30,
        marginBottom: 20
    },
    button: {
        color: 'grey',
        fontSize: 20,
        width: 50,
        height: 50,
        border: 'none',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 30,
        marginTop: 20
    },
    buttonEnd: {
        fontSize: 20,
        width: 200,
        height: 50,
        border: 'none',
        backgroundColor: MAIN_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '25%',
        marginTop: 80,
        borderRadius: 25,
    }
})