import React from "react";
import { Modal, Text, View, StyleSheet, TouchableOpacity, Pressable, Vibration } from "react-native";
import * as MailComposer from 'expo-mail-composer';
import { Image } from "expo-image";

import { COLOR_TEXT_BUTTON, MAIN_COLOR } from '../../Variable'
import { populateEvents } from "react-native-calendars/src/timeline/Packer";

const ImageCroix = require("../../assets/croix-petit.png")

function DataUserModal(props) {

    const sendMail = (mail) => {
        MailComposer.composeAsync({
            subject: '',
            recipients: [mail],
            body: '',
        })
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.dataUserModal}
            onRequestClose={() => props.changeModalDataUser(false)}
        >
            <Pressable style={styles.buttonWindow} onPress={() => { props.changeModalDataUser(false) }}>
                <View style={styles.containerModal}>
                    <TouchableOpacity onPress={() => props.changeModalDataUser(false)}>
                        <Image
                        style={styles.ImageCroix}
                        source={ImageCroix}
                        contentFit="cover"
                        transition={1000}
                        />
                    </TouchableOpacity>

                    <View style={styles.content}>
                        {props.image && <Image style={styles.image} source={props.image} />}
                        <View>
                            {props.datas && <Text style={styles.textName}>{props.datas.name} {props.datas.surname}</Text>}
                            {props.datas && <Text style={styles.text}>{props.datas.work}</Text>}
                            {props.datas && <Text style={styles.text}>{props.datas.birth_date}</Text>}
                            {props.datas && <Text style={styles.text}>{props.datas.email}</Text>}
                        </View>
                    </View>
                    <TouchableOpacity style={styles.buttonEmail} onPress={() => {sendMail(props.datas.email), Vibration.vibrate()}}>
                            <Text style={{ color: MAIN_COLOR }}>Envoyer un mail</Text>
                    </TouchableOpacity>
                </View>
            </Pressable>
        </Modal>
    )
}

const styles = StyleSheet.create({
    buttonWindow: {
        width: '100%',
        height: '100%',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
    },
    containerModal: {
        display: 'flex',
        alignSelf: 'center',
        width: "90%",
        height: "25%",
        borderRadius: 30,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 30,
    },
    test: {
        flex: 1,
        backgroundColor: 'yellow',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    ImageCroix: {
        width: 30,
        height: 30,
        margin: 10,
        marginBottom: 20,
    },
    textName: {
        color: 'black',
        fontSize: 30,
    },
    text: {
        fontSize: 15,
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 15,
    },
    buttonEmail: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DataUserModal;