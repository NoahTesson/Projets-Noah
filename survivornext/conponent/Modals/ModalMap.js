import React from "react";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { Image } from "expo-image";

const ImageCroix = require('../../assets/croix-petit.png')

export default function ModalMap(props) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.modalMap}
            onRequestClose={() => props.changeModalMap(false)}
        >
            {props.location ? (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: props.location.coords.latitude,
                        longitude: props.location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                }}
                >
                {props.location.coords && (
                    <Marker
                    coordinate={{
                        latitude: props.location.coords.latitude,
                        longitude: props.location.coords.longitude,
                    }}
                    title="Ma position"
                    description="C'est ma position actuelle"
                    />
                )}
                </MapView>
            ) : (
                <Text>Loading...</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={() => {props.changeModalMap(false)}}>
                <Image
                    style={styles.imageCroix}
                    source={ImageCroix}
                    contentFit="cover"
                    transition={1000}
            />
            </TouchableOpacity>
        </Modal>
    );
}

const styles = StyleSheet.create({
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
    map: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
    },
    button: {
        position: 'absolute',
        marginTop: 50,
        marginLeft: 20,
      },
    imageCroix: {
        width: 40,
        height: 40,
    },
})