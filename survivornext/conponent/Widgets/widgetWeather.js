import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Animated,{ FadeInDown, FadeOutDown} from 'react-native-reanimated'
import { Image } from "expo-image";

import getColorWeather from '../../function/getColorWeather'

import { SIZE_MEDIUM, SHADOW_COLOR } from '../../Variable';

const ImageCroix = require('../../assets/croix-petit.png')
const ImageLoc = require('../../assets/localisateur.png')
const ImageMeteo = require('../../assets/nuage.png')

export default function WidgetWeather(props) {
    return (
        <Animated.View
          entering={FadeInDown}
          exiting={FadeOutDown}
          style={{width: 170, height: 158, borderRadius: 30, backgroundColor: getColorWeather(props.data), shadowColor: SHADOW_COLOR, shadowOffset: {width: -2, height: 4}, shadowOpacity: 0.2, shadowRadius: 3,}}
        >
            <TouchableOpacity style={styles.button} onPress={() => {props.updState()}}>
              <Image
                  style={styles.imageCroix}
                  source={ImageCroix}
                  contentFit="cover"
                  transition={1000}
              />
            </TouchableOpacity>
            {
              props.data && props.data.main ? (
                <View>
                  <View style={styles.locContainer}>
                    <Text style={{marginTop: 8, paddingRight: 5, marginLeft: 5}}>{props.data.name}</Text>
                    <Image
                          style={styles.imageLoc}
                          source={ImageLoc}
                          contentFit="cover"
                          transition={1000}
                          />
                  </View>
                  <View style={styles.locContainer}>
                    <Text style={{marginLeft: 5, fontSize: 50}}>{Math.trunc(props.data.main.temp)}°</Text>
                    <Image
                          style={styles.imageMeteo}
                          source={ImageMeteo}
                          contentFit="cover"
                          transition={1000}
                          />
                  </View>
                </View>
              ) : null
            }
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    button: {
        color: SIZE_MEDIUM,
        fontSize: 20,
        width: 50,
        height: 50,
        border: 'none',
        borderRadius: 50,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 30,
    },
    locContainer: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
    },
    imageCroix: {
        width: 30,
        height: 30,
    },
    imageLoc: {
      width: 30,
      height: 30,
      position: 'relative',
    },
    imageMeteo: {
      marginLeft: 10,
      width: 64,
      height: 64,
      position: 'relative',
    },
});
