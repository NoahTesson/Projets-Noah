import React from "react";
import { View, Modal, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

import ClickCounter from '../../function/cps'

const ImageCps = require('../../assets/curseur.png')

import { COLOR_TEXT_BUTTON, MAIN_COLOR } from '../../Variable'

export default function ModalCps(props) {
    return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={props.modalCps}
        onRequestClose={() => props.changeModalCps(false)}
    >
        <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.button} onPress={() => props.changeModalCps(false)}>
                <Image
                  style={styles.imageCps}
                  source={ImageCps}
                  contentFit="cover"
                  transition={1000}
                />
            </TouchableOpacity>
            <ClickCounter/>
            <TouchableOpacity style={styles.buttonEnd} onPress={() => props.changeModalCps(false)}>
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
    imageCps: {
        width: 30,
        height: 30,
        marginBottom: 20
    },
    imageGrid: {
        marginLeft: 66,
        marginTop: "30%",
        position: "absolute",
        width: 300,
        height: 300,
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