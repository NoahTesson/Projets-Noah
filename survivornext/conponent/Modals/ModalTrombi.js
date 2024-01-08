import React, { useState } from "react";
import { View, Modal, TouchableOpacity, StyleSheet, ScrollView, TextInput } from "react-native";
import { Image } from "expo-image";

const ImageCroix = require('../../assets/croix-petit.png');

import DataUser from "../dataUser";
import ModalFilter from "./ModalFilter";

export default function ModalTrombinosope(props) {
    const [researchTab, setResearchTab] = useState(null);
    const [research, setresearch] = useState(null);
    
    const handleButtonPress = () => {
        const trimmedResearch = research.trim();

        if (trimmedResearch !== "") {
            const tab = trimmedResearch.split(',');
            setResearchTab(tab);
        } else {
            setResearchTab(null);
        }
    };

    const parseResearch = (item) => {
        if (researchTab !== null) {
            for (const word of researchTab) {
                const parts = word.split(' ');
                const newParts = parts.filter((chaine) => chaine !== "");
                if (newParts.length === 2) {
                    if (newParts[0] === item.name && newParts[1] === item.surname) {
                        return true;
                    }
                } else if (newParts.length === 1) {
                    if (newParts[0] === item.name || newParts[0] === item.surname) {
                        return true;
                    }
                }
            }
        } else {
            return true;
        }
        return false;
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.modalMorpion}
            onRequestClose={() => props.changeModalTrombi(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.containerbuttonTop}>
                    <TouchableOpacity onPress={() => props.changeModalTrombi(false)}>
                        <Image
                        style={styles.imageCroix}
                        source={ImageCroix}
                        contentFit="cover"
                        transition={1000}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.searchSection}>
                    <Image
                        source={require('../../assets/chercher.png')}
                        style={{ width: 20, height: 20, margin: 10 }}
                        />
                    <TextInput
                        onChangeText={setresearch}
                        value={research}
                        style={styles.research}
                        placeholder="rechercher"
                        placeholderTextColor="grey"
                        onSubmitEditing={handleButtonPress}
                        returnKeyType="search"
                    />
                </View>
                <View style={styles.containerTrombi}>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.containerUser}>
                            {
                                props.infos && props.infos
                                    .filter((item) => parseResearch(item) === true)
                                    .map((item) => (<DataUser key={item.id} item={item} state={true}/> ))
                            }
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#ADB2D3',
        paddingHorizontal: 15,
    },
    containerbuttonTop: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        marginTop: "15%",
    },
    containerTrombi: {
        flex: 11,
    },
    imageFiltre: {
        width: 25,
        height: 25,
        marginTop: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    imageCroix: {
        width: 30,
        height: 30,
        margin: 10,
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        borderRadius: 20,
    },
    image: {
        width: 90,
        height: 90,
        borderColor: "black",
        borderWidth: 3,
        borderRadius: 15,
    },
    scrollView: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
        marginTop: 25,
        gap: 14,
    },
    containerUser: {
        width: '100%',
        borderRadius: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 25,
    },
    research: {
        flex: 1,
        fontSize: 15,
    },
    searchSection: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
    },
})