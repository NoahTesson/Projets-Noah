import React, { useState } from "react";
import { View, Modal, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { Image } from 'expo-image'

import { BACKGROUND_COLOR, MAIN_COLOR, COLOR_TEXT_BUTTON, SIZE_MEDIUM } from '../../Variable';
import GetImage from "../getImage";
import DataSub from "../dataSub";
import ModalAddNews from '../Modals/ModalAddNews'

const IMAGE_ANNIV = require("../../assets/anniv.png")
const IMAGE_WORK = require("../../assets/valise.png")
const IMAGE_NEWS = require("../../assets/nouvelles.png")
const IMAGE_SE_DECONNECTER = require("../../assets/se_deconnecter.png");

export default function ModalProfile(props) {
    const [modalAddNews, setModalAddNews] = useState(false);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.menuProfile}
            onRequestClose={() => props.changeMenuProfile(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.containerdata}>
                    <TouchableOpacity 
                        style={{ position: 'absolute', top: 80, right: 20}}
                        onPress={() =>  props.updNav("Login")}
                    >
                        <Image source={IMAGE_SE_DECONNECTER} style={{ height: 27.5, width: 27.5 }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, marginTop: "30%" }}>
                        <GetImage changeProfileImage={props.changeProfileImage} profileImage={props.profileImage} image={props.dataImageEmploye}/>
                    </View>
                    <View style={styles.containerNameEmail}>
                        <Text style={{ fontWeight: 'bold', fontSize: 35 }}>{props.dataEmploye.name} {props.dataEmploye.surname}</Text>
                        <Text style={{ fontSize: 15, color: "black" }}>{props.dataEmploye.email}</Text>
                    </View>

                    <View style={styles.containerWorkFaceIdDate}>
                        <View style={styles.containerBirthday}>
                            <Image source={IMAGE_ANNIV} style={{ height: 25, width: 25 }} />
                            <Text style={{ fontWeight: 'bold', fontSize: 15, color: "black" }}>{props.dataEmploye.birth_date}</Text>
                        </View>
                        <View style={styles.containerBirthday}>
                            <Image source={IMAGE_WORK} style={{ height: 25, width: 25 }} />
                            <Text style={{ fontWeight: 'bold', fontSize: 15, color: "black", textAlign: 'center' }}>{props.dataEmploye.work}</Text>
                        </View>
                        {
                            props.dataEmploye.work === 'CEO' ? (
                                <TouchableOpacity
                                    style={styles.containerBirthday}
                                    onPress={() => setModalAddNews(true)}   
                                >
                                    <Image source={IMAGE_NEWS} style={{ height: 25, width: 25 }} />
                                    <Text style={{ fontWeight: 'bold', fontSize: 15, color: "black", textAlign: 'center' }}>Publier une news</Text>
                                </TouchableOpacity>
                            ) : (
                                <View style={styles.containerBirthday}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15, color: "black", textAlign: 'center' }}>Uniquement pour CEO</Text>
                                </View>
                            )
                        }
                    </View>
                    {modalAddNews && <ModalAddNews changeModalAddNews={(value) => setModalAddNews(value)}/> }
                    <View style={styles.containerScrollFlex}>
                        <View style={styles.containerScroll}>
                            {props.dataEmploye.subordinates && props.dataEmploye.subordinates > 0 ? (
                                <View>
                                    <Text style={styles.text_subordonnées}>Subordonées</Text>
                                    <ScrollView>
                                        <View>
                                            {props.dataEmploye.subordinates.map((item) => (
                                                <DataSub key={item.id} item={item} />
                                                ))}
                                        </View>
                                    </ScrollView>
                                </View>
                            ) : (
                                <View>
                                    <Text style={styles.subText}>Aucun subordonées.</Text>
                                </View>
                            )}
                        </View>
                    </View>
                    <View style={styles.containerButtonBottom}>
                        <TouchableOpacity style={styles.buttonClose} onPress={() => props.changeMenuProfile(false)}>
                            <Text style={styles.text_buttonClose}>Fermer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        borderRadius: 5,
        width: "100%",
        height: "100%",
        backgroundColor: BACKGROUND_COLOR,
    },
    text_subordonnées: {
        fontWeight: 'bold',
        fontSize: SIZE_MEDIUM,
        textAlign: 'center',
    },
    containerButtonBottom: {
        gap: 20,
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    ButtonAddNews: {
        backgroundColor: "#F2F2F2",
        fontSize: SIZE_MEDIUM,
        width: 200,
        height: 50,
        border: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
    text_ButtonAddNews: {
        color: COLOR_TEXT_BUTTON,
    },
    buttonDisconnect: {
        backgroundColor: "#F2F2F2",
        fontSize: SIZE_MEDIUM,
        width: 200,
        height: 50,
        border: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
    text_buttonDisconnect: {
        color: COLOR_TEXT_BUTTON,
    },
    buttonClose: {
        backgroundColor: MAIN_COLOR,
        fontSize: SIZE_MEDIUM,
        width: 200,
        height: 50,
        border: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
    text_buttonClose: {
        color: COLOR_TEXT_BUTTON,
    },
    containerNameEmail: {
        flex: 1,
        gap: 10,
        width: '100%',
        alignItems: 'center',
    },
    containerWorkFaceIdDate: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 1.3,
        flexDirection: 'row',
        width: '100%',
    },
    containerBirthday: {
        width: "30%",
        height: "100%",
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: "#F2F2F2",
    },
    containerScrollFlex: {
        flex: 3,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerScroll: {
        width: '95%',
        height: '80%',
        borderRadius: '25',
        backgroundColor: "#F2F2F2",
    },
    containerdata: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    subText: {
        fontSize: SIZE_MEDIUM,
        textAlign: "center",
        fontWeight: "bold",
    },
});
