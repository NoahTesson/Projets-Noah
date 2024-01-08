import React, { useState, useEffect } from "react";
import { Text, View, Modal, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Image } from "expo-image";

const ImageBirthday = require('../../assets/birthday.png');

import { MAIN_COLOR } from '../../Variable'

import getInfoAllEmploye from "../../function/getinfoAllEmploye";
import DataAnniversary from "../dataAnniversary";

export default function ModalAnniversary(props) {
    const [infos, setinfos] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await getInfoAllEmploye(setinfos);
        }
        fetchData();
    }, []);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.modalAnniversary}
            onRequestClose={() => props.changeModalAnniversary(false)}
        >
        <View style={styles.modalContainer}>
            <View style={styles.containerbuttonTop}>
                <TouchableOpacity onPress={() => props.changeModalAnniversary(false)}>
                    <Image
                    style={styles.imageBirthday}
                    source={ImageBirthday}
                    contentFit="cover"
                    transition={1000}
                    />
                </TouchableOpacity>
            </View>
            <View>
                <ScrollView style={styles.scrollView}>
                    {infos && infos.map((item) => (<DataAnniversary key={item.id} item={item}/> ))}
                </ScrollView>
                <TouchableOpacity style={styles.buttonEnd} onPress={() => props.changeModalAnniversary(false)}>
                    <Text style={{color: 'black'}}>Fermer</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        borderRadius: 30,
        marginTop: "28%",
        marginLeft: "3%",
        backgroundColor: 'rgb(255, 255, 255)',
        width: "94%",
        height: "73%",
    },
    containerbuttonTop: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        marginBottom: 0,
    },
    imageBirthday: {
        width: 30,
        height: 30,
        marginTop: 0
    },
    scrollView: {
        width: '100%',
        height: '80%',
        borderRadius: 30,
        marginTop: 25,
        gap: 14,
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
        marginBottom: 10,
        borderRadius: 25,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    imageContainer: {
        flex: 1,
        marginRight: 10,
    },
    image: {
        width: 65,
        height: 65,
        borderRadius: 15,
    },
    texte_data: {
        flex: 2,
    },
})
