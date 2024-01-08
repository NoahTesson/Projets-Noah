import React, { useState } from "react";
import { View, Modal, StyleSheet, PanResponder, Text, Image, TouchableOpacity, Pressable } from "react-native";

import ConnectFour from "../../function/power4";

import { COLOR_TEXT_BUTTON, MAIN_COLOR } from '../../Variable'

const ImagePower4 = require('../../assets/power4.png')

export default function ModalPower4(props) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.modalPower4}
            onRequestClose={() => props.changeModalPower4(false)}
        >
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.button} onPress={() => props.changeModalPower4(false)}>
                    <Image
                        style={styles.imagePower4}
                        source={ImagePower4}
                        contentFit="cover"
                        transition={1000}
                    />
                </TouchableOpacity>
                <ConnectFour />
                <TouchableOpacity style={styles.buttonEnd} onPress={() => props.changeModalPower4(false)}>
                    <Text style={{ color: COLOR_TEXT_BUTTON }}>Fermer</Text>
                </TouchableOpacity>

            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        borderRadius: 25,
        marginTop: "28%",
        marginLeft: "0%",
        backgroundColor: 'rgb(255, 255, 255)',
        width: "100%",
        height: "81%",
    },
    imagePower4: {
        width: 30,
        height: 30,
        marginBottom: 20
    },
    imageGrid: {
        marginLeft: 66,
        marginTop: "30%",
        position: "absolute",
        width: 200,
        height: 200,
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
        color: 'grey',
        fontSize: 20,
        width: 200,
        height: 50,
        border: 'none',
        backgroundColor: MAIN_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '25%',
        marginBottom: 10,
        borderRadius: 25,
    }
})