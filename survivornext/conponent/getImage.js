import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image } from "expo-image";

const IMAGE_PLUS = require("../assets/plus_profile.png");

export default function GetImage(props) {

    useEffect(() => {
        (async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need media library permissions to make this work!');
        }
        })();
    }, []);

        const pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                base64: false,
        });

        if (!result.canceled && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        props.changeProfileImage(selectedAsset.uri);
        }
    };

    return (
        <View style={styles.container}>
            <View>
                {props.profileImage ? (
                    <Image source={{ uri: props.profileImage }} style={styles.image} />
                ) : (
                    <Image source={props.image} style={styles.image} />
                )}
                <TouchableOpacity style={styles.buttonContainer} onPress={pickImage}>
                    <Image source={IMAGE_PLUS} style={{ height: 25, width: 25 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    image: {
        width: 120,
        height: 120,
        marginTop: -50,
        borderRadius: 100,
    },
    buttonContainer: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        borderRadius: 100,
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
    },
    buttonText: {
        fontSize: 10,
        color: 'black',
    },
});
