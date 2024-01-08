import React, { useState } from "react";
import { View, Modal, StyleSheet, Text, TouchableOpacity, TextInput, Pressable } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from "expo-image";

const ImageCroix = require('../../assets/croix-petit.png');

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyAZqEU3w7ooLSb2orNbqQy3jXcAaC7VXyk",
    authDomain: "databasetrombi-3f499.firebaseapp.com",
    projectId: "databasetrombi-3f499",
    storageBucket: "databasetrombi-3f499.appspot.com",
    messagingSenderId: "248539128989",
    appId: "1:248539128989:web:f1626524a5f5109547a074",
    databaseURL: "https://databasetrombi-3f499-default-rtdb.europe-west1.firebasedatabase.app"
};

initializeApp(firebaseConfig);

const db = getDatabase();

export default function ModalAddNews(props) {
    const [titleNews, setTitleNews] = useState(null);
    const [bodyNews, setBodyNews] = useState(null);

    const storeHighScore = (title, body) => {
        if (title && body) {
            set(ref(db, title), {
                title: title,
                body: body,
                state: false,
            });
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={() => props.changeModalAddNews(false)}
        >
            <Pressable style={styles.buttonWindow} onPress={() => { props.changeModalAddNews(false) }}>
                <LinearGradient colors={['#A9A9A9', '#A9A9A9', '#A9A9A9']} style={styles.linearGradient}>
                    <View style={styles.containerModal}>
                        <TouchableOpacity onPress={() => props.changeModalAddNews(false)}>
                            <Image
                                style={styles.ImageCroix}
                                source={ImageCroix}
                                contentFit="cover"
                                transition={1000}
                            />
                        </TouchableOpacity>
                        <View style={styles.content}>
                            <TextInput
                                onChangeText={setTitleNews}
                                value={titleNews}
                                style={styles.textNews}
                                placeholder="Titre ..."
                                placeholderTextColor="black"
                            />
                            <TextInput
                                onChangeText={setBodyNews}
                                value={bodyNews}
                                style={styles.textNews}
                                placeholder="Votre texte ici ..."
                                placeholderTextColor="black"
                            />
                            <TouchableOpacity 
                                style={styles.buttonEnd}
                                onPress={() => storeHighScore(titleNews, bodyNews)}
                                activeOpacity={0.7}
                            >
                                <LinearGradient
                                    colors={['#8D4C9F', '#8A3B98', '#3A196A']}
                                    style={[styles.buttonEnd, { borderRadius: 50 }]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <Text style={styles.text_buttonEnd}>Publier</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </Pressable>
        </Modal>
    );
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
        marginBottom: '10%',
    },
    content: {
        alignItems: 'center',
        gap: 20,
    },
    ImageCroix: {
        width: 30,
        height: 30,
        margin: 10,
        marginBottom: 20,
    },
    buttonSend: {
        color: 'grey',
        fontSize: 20,
        width: 200,
        height: 50,
        border: 'none',
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
    textNews: {
        backgroundColor: '#D9D9D9',
        width: 250,
        height: 50,
        borderRadius: 20,
        padding: 10,
    },
    linearGradient: {
        marginRight: 10,
        marginLeft: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        borderRadius: 20,
    },
    buttonEnd: {
        color: 'grey',
        fontSize: 20,
        width: 200,
        height: 50,
        border: 'none',
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
    text_buttonEnd: {
        color: 'white',
        paddingTop: 17,
    },
});