import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker';

type GetImageProps = {}

const GetImage: React.FC<GetImageProps> = () => {
    const [profileImage, setProfileImage] = useState<string>();

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
            setProfileImage(selectedAsset.uri);
        }
    };

    return (
        <View style={styles.container}>
            <View>
                {profileImage ? (
                    <Image source={{ uri: profileImage }} style={styles.image} />
                ) : (
                    <Image source={require('../assets/utilisateur.png')} style={styles.image} />
                )}
                <TouchableOpacity style={styles.buttonContainer} onPress={pickImage}>
                    <Image source={require('../assets/plus_profile.png')} style={{ height: 15, width: 15 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    image: {
        width: 85,
        height: 85,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'white',
    },
    buttonContainer: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        borderRadius: 100,
        height: 25,
        width: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
    },
});

export default GetImage;
