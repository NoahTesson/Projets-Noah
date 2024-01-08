import React from "react";
import { StyleSheet, TouchableOpacity, Pressable, Text } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import Animated,{ FadeInDown, FadeOutDown} from 'react-native-reanimated'
import { Image } from "expo-image";

import { BACKGROUND_COLOR_WIDGET, SHADOW_COLOR } from '../../Variable';

const ImageCroix = require('../../assets/croix-petit.png')

function WidgetMap(props) {

    return (
        <Animated.View
            entering={FadeInDown}
            exiting={FadeOutDown}
            style={styles.container}
        >
            <Pressable onPress={() => props.changeModalMap(true)}>
                {props.location.coords ? (
                    <MapView
                        style={styles.map}
                        scrollEnabled={false}
                        zoomEnabled={false}
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
                <TouchableOpacity style={styles.button} onPress={() => {props.updState()}}>
                    <Image
                        style={styles.imageCroix}
                        source={ImageCroix}
                        contentFit="cover"
                        transition={1000}
                        />
                </TouchableOpacity>
            </Pressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 170,
        height: 158,
        borderRadius: 30,
        backgroundColor: BACKGROUND_COLOR_WIDGET,
        shadowColor: SHADOW_COLOR,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    map: {
      width: '100%',
      height: '100%',
      borderRadius: 30,
    },
    button: {
        position: 'absolute',
        margin: 10,
      },
    imageCroix: {
        width: 30,
        height: 30,
    },
});

export default WidgetMap;