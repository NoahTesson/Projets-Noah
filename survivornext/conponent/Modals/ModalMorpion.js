import React from "react";
import { View, Modal, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

import TicTacToe from "../../function/morpion";
import { COLOR_TEXT_BUTTON, MAIN_COLOR } from '../../Variable'

const ImageMorpion = require('../../assets/morpion.png')

export default function ModalMorpion(props) {
    return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={props.modalMorpion}
        onRequestClose={() => props.changeModalMorpion(false)}
    >
        <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.button} onPress={() => props.changeModalMorpion(false)}>
                <Image
                  style={styles.imageMorpion}
                  source={ImageMorpion}
                  contentFit="cover"
                  transition={1000}
                />
            </TouchableOpacity>
            <TicTacToe/>
            <TouchableOpacity style={styles.buttonEnd} onPress={() => props.changeModalMorpion(false)}>
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
    imageMorpion: {
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