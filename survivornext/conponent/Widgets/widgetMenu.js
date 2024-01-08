import React from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';
import { Image } from "expo-image";

const ImageMeteo = require('../../assets/nuage.png')
const ImageMorpion = require('../../assets/morpion.png')
const ImageCalendar = require('../../assets/calendar.png')
const ImageMap = require('../../assets/carte.png')
const ImageNews = require('../../assets/nouvelles.png')
const ImageNavigator = require('../../assets/navigateur.png')
const ImageNasa = require('../../assets/saturne.png')
const ImageMemory = require('../../assets/memoire.png')
const ImageCoinFlip = require('../../assets/tirage.png')
const ImageBall = require('../../assets/basketball.png')
const ImagePower4 = require('../../assets/power4.png')
const ImageBirthday = require('../../assets/anniv.png')
const ImageCps = require('../../assets/curseur.png')

export default function WidgetMenu(props) {
    return (
        <View style={styles.container}>
            <Pressable 
                style={styles.AddWidget} 
                onPress={() => {
                    props.widgetToDisplay('weather')
                    props.setmenuWidget(false)
                }}>
                <View style={styles.container_image}>
                    <Image
                        style={styles.image}
                        source={ImageMeteo}
                        contentFit="cover"
                        transition={1000}
                    />
                </View>
                <Text style={styles.text}>Météo</Text>
            </Pressable>
            <Pressable 
                style={styles.AddWidget} 
                onPress={() => {
                    props.widgetToDisplay('morpion')
                    props.setmenuWidget(false)
                }}>
                <View style={styles.container_image}>
                    <Image
                        style={styles.image}
                        source={ImageMorpion}
                        contentFit="cover"
                        transition={1000}
                    />
                </View>
                <Text style={styles.text}>Morpion</Text>
            </Pressable>
            <Pressable 
                style={styles.AddWidget} 
                onPress={() => {
                    props.widgetToDisplay('power4')
                    props.setmenuWidget(false)
                }}>
                <View style={styles.container_image}>
                    <Image
                        style={styles.image}
                        source={ImagePower4}
                        contentFit="cover"
                        transition={1000}
                    />
                </View>
                <Text style={styles.text}>Puissance 4</Text>
            </Pressable>
            <Pressable 
                style={styles.AddWidget} 
                onPress={() => {
                    props.widgetToDisplay('calendar')
                    props.setmenuWidget(false)
                }}>
                <View style={styles.container_image}>
                    <Image
                        style={styles.image}
                        source={ImageCalendar}
                        contentFit="cover"
                        transition={1000}
                    />
                </View>
                <Text style={styles.text}>Calendrier</Text>
            </Pressable>
            <Pressable 
                style={styles.AddWidget} 
                onPress={() => {
                    props.widgetToDisplay('map')
                    props.setmenuWidget(false)
                }}>
                <View style={styles.container_image}>
                    <Image
                        style={styles.image}
                        source={ImageMap}
                        contentFit="cover"
                        transition={1000}
                    />
                </View>
                <Text style={styles.text}>Map</Text>
            </Pressable>
            <Pressable 
                style={styles.AddWidget} 
                onPress={() => {
                    props.widgetToDisplay('news')
                    props.setmenuWidget(false)
                }}>
                <View style={styles.container_image}>
                    <Image
                        style={styles.image}
                        source={ImageNews}
                        contentFit="cover"
                        transition={1000}
                    />
                </View>
                <Text style={styles.text}>News</Text>
            </Pressable>
            <Pressable
                style={styles.AddWidget} 
                onPress={() => {
                    props.widgetToDisplay('youtube')
                    props.setmenuWidget(false)
            }}>
                <View style={styles.container_image}>
                    <Image
                        style={styles.image}
                        source={ImageNavigator}
                        contentFit="cover"
                        transition={1000}
                    />
                </View>
                <Text style={styles.text}>Navigateur</Text>
            </Pressable>
            <Pressable
                style={styles.AddWidget} 
                onPress={() => {
                    props.widgetToDisplay('nasa')
                    props.setmenuWidget(false)
            }}>
                <View style={styles.container_image}>            
                    <Image
                        style={styles.image}
                        source={ImageNasa}
                        contentFit="cover"
                        transition={1000}
                    />
                </View>
                <Text style={styles.text}>Nasa</Text>
            </Pressable>
            <Pressable
                style={styles.AddWidget} 
                onPress={() => {
                    props.widgetToDisplay('memory')
                    props.setmenuWidget(false)
            }}>
                <View style={styles.container_image}>            
                    <Image
                        style={styles.image}
                        source={ImageMemory}
                        contentFit="cover"
                        transition={1000}
                    />
                </View>
                <Text style={styles.text}>Memory</Text>
            </Pressable>
            <Pressable
                style={styles.AddWidget} 
                onPress={() => {
                    props.widgetToDisplay('coinflip')
                    props.setmenuWidget(false)
            }}>
                <View style={styles.container_image}>            
                    <Image
                        style={styles.image}
                        source={ImageCoinFlip}
                        contentFit="cover"
                        transition={1000}
                    />
                </View>
                <Text style={styles.text}>CoinFlip</Text>
            </Pressable>
            <Pressable
                style={styles.AddWidget} 
                onPress={() => {
                    props.widgetToDisplay('ball')
                    props.setmenuWidget(false)
            }}>
                <View style={styles.container_image}>            
                    <Image
                        style={styles.image}
                        source={ImageBall}
                        contentFit="cover"
                        transition={1000}
                    />
                </View>
                <Text style={styles.text}>Ball</Text>
            </Pressable>
            <Pressable
                style={styles.AddWidget} 
                onPress={() => {
                    props.widgetToDisplay('anniversary')
                    props.setmenuWidget(false)
            }}>
                <View style={styles.container_image}>
                    <Image
                        style={styles.image}
                        source={ImageBirthday}
                        contentFit="cover"
                        transition={1000}
                    />
                </View>
                <Text style={styles.text}>Anniversaire</Text>
            </Pressable>
            <Pressable
                style={styles.AddWidget} 
                onPress={() => {
                    props.widgetToDisplay('cps')
                    props.setmenuWidget(false)
            }}>
                <View style={styles.container_image}>
                    <Image
                        style={styles.image}
                        source={ImageCps}
                        contentFit="cover"
                        transition={1000}
                    />
                </View>
                <Text style={styles.text}>Cps</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        gap: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    AddWidget: {
        gap: 20,
        height: 55,
        borderRadius: '20',
        alignItems: 'center',
        flexDirection: 'row',
    },
    image: {
        width: 40,
        height: 40,
        position: 'relative',
    },
    text: {
        fontSize: 30,
        color: 'white',
    },
    container_image: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.5)',
        height: '100%',
        width: '20%',
        borderRadius: 20,
    },
});