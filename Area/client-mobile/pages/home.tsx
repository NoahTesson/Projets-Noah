import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Modal } from 'react-native';
import { WebView } from 'react-native-webview'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';

import { HomeScreenProps } from '../types';
import ComponentSigninWith from '../components/ComponentSigninWith';
import { ThemeContext  }from '../Services/ThemeContext';
import GetTheme from '../Services/GetTheme';
import DiscordIcon from '../svg/Discord';
import GoogleIcon from '../svg/Google';
import GithubIcon from '../svg/Github';
import * as WebBrowser from 'expo-web-browser';
import { useToast } from "react-native-toast-notifications";

type OrComponentProps = {};

const ComponentOr: React.FC<OrComponentProps> = () => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
            <View style={{ backgroundColor: 'black', width: 110, height: 2 }}/>
            <Text style={{ fontWeight: 'bold' }}>Or</Text>
            <View style={{ backgroundColor: 'black', width: 110, height: 2 }}/>
        </View>
    )
}

const HomeScreen: React.FC< HomeScreenProps > = ({ navigation }) => {
    const theme = useContext(ThemeContext);
    const [colorTheme, setColorTheme] = useState<{backgroundColor: string;color: string;}>();
    const [isvisibleGithub, setIsvisibleGithub] = useState(false);
    const [isvisibleDiscord, setIsvisibleDiscord] = useState(false);
    const [isvisibleGoogle, setIsvisibleGoogle] = useState(false);
    const toast = useToast();

    const getToken = async(url: string) => {
        const token = url.split('token=')[1];
        await AsyncStorage.setItem('token', token);
    }

    useEffect(() => {
        if (theme) {
            const tmp = GetTheme(theme?.theme);
            setColorTheme(tmp);
        }
    }, [theme]);

    return (
        <View style={[styles.container, { backgroundColor: colorTheme?.backgroundColor }]}>
            <View style={styles.container_logo}>
                <Image source={require('../assets/logo_blue.png')} style={styles.logo_blue}/>
            </View>
            <View style={styles.container_connect_with}>
                <TouchableOpacity
                    style={[styles.containerServices, { backgroundColor: 'blue'}]}
                    onPress={() => {
                        setIsvisibleGoogle(true);
                    }}
                >
                    <View style={[styles.back_logo, { borderColor: 'blue' }]}>
                        <GoogleIcon size={40}/>
                    </View>
                    <Text style={styles.text_services}>Connect</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.containerServices, { backgroundColor: 'black'}]}
                    onPress={() => {
                        setIsvisibleGithub(true);
                    }}
                >
                    <View style={[styles.back_logo, { borderColor: 'black' }]}>
                        <GithubIcon size={45}/>
                    </View>
                    <Text style={styles.text_services}>Connect</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.containerServices, { backgroundColor: '#5865F2'}]}
                    onPress={() => {
                        setIsvisibleDiscord(true);
                    }}
                >
                    <View style={[styles.back_logo, { borderColor: '#5865F2' }]}>
                        <DiscordIcon size={50}/>
                    </View>
                    <Text style={styles.text_services}>Connect</Text>
                </TouchableOpacity>
                <Modal
                    transparent={true}
                    visible={isvisibleGithub}
                >
                    <View style={{ flex: 1 }}>
                        <View style={styles.webview}>
                            <TouchableOpacity
                                onPress={() => {
                                    setIsvisibleGithub(false);
                                }}
                                style={{ backgroundColor: 'white', opacity: 1, padding: 10 }}
                            >
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#3C71DA' }}>Close</Text>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20 }}>Github.com</Text>
                        </View>
                        <View style={{ flex: 8 }}>
                            <WebView
                                onNavigationStateChange={(navState) => {
                                    if (navState.url.includes(`http://localhost:8081/?token=`)) {
                                        getToken(navState.url);
                                        setIsvisibleGithub(false)
                                        navigation.navigate('MainLayout')
                                        toast.show('Connected via Github', {
                                            type: 'success',
                                            duration: 1000,
                                            offset: 200,
                                        });
                                    }
                                }}
                                source={{ uri: `${theme?.urlBack}api/github/login` }}
                            />
                        </View>
                    </View>
                </Modal>
                <Modal
                    transparent={true}
                    visible={isvisibleDiscord}
                >
                    <View style={{ flex: 1 }}>
                        <View style={styles.webview}>
                            <TouchableOpacity
                                onPress={() => {
                                    setIsvisibleDiscord(false);
                                }}
                                style={{ backgroundColor: 'white', opacity: 1, padding: 10 }}
                            >
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#3C71DA' }}>Close</Text>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20 }}>Discord.com</Text>
                        </View>
                        <View style={{ flex: 8 }}>
                            <WebView
                                onNavigationStateChange={(navState) => {
                                    if (navState.url.includes(`http://localhost:8081/?token=`)) {
                                        getToken(navState.url);
                                        setIsvisibleDiscord(false)
                                        navigation.navigate('MainLayout')
                                        toast.show('Connected via Discord', {
                                            type: 'success',
                                            duration: 1000,
                                            offset: 200,
                                        });
                                    }
                                }}
                                source={{ uri: `${theme?.urlBack}api/discord/login` }}
                            />
                        </View>
                    </View>
                </Modal>

                <Modal
                    transparent={true}
                    visible={isvisibleGoogle}
                >
                    <View style={{ flex: 1 }}>
                        <View style={styles.webview}>
                            <TouchableOpacity
                                onPress={() => {
                                    setIsvisibleGoogle(false);
                                }}
                                style={{ backgroundColor: 'white', opacity: 1, padding: 10 }}
                            >
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#3C71DA' }}>Close</Text>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20 }}>Google.com</Text>
                        </View>
                        <View style={{ flex: 8 }}>
                            <WebView
                                onNavigationStateChange={(navState) => {
                                    if (navState.url.includes(`http://localhost:8081/?token=`)) {
                                        getToken(navState.url);
                                        setIsvisibleGoogle(false)
                                        navigation.navigate('MainLayout')
                                        toast.show('Connected via Google', {
                                            type: 'success',
                                            duration: 1000,
                                            offset: 200,
                                        });
                                    }
                                }}
                                userAgent="Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36"
                                source={{ uri: `${theme?.urlBack}api/google/login` }}
                            />
                        </View>
                    </View>
                </Modal>

            </View>
            <ComponentOr />
            <View style={styles.container_button}>
                <TouchableOpacity style={[styles.button_sinscrire, styles.shadow, { backgroundColor: theme?.theme === "light" ? "black" : "white" }]} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={[styles.text_sinscrire, { color: theme?.theme === "light" ? "white" : "black" }]}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button_se_connecter, styles.shadow]} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.text_se_connecter}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerServices: {
        width: '70%',
        height: '20%',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    back_logo: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%',
        height: '99%',
        borderWidth: 1,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: 'white',
    },
    text_services: {
        marginLeft: '10%',
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
    },
    container_logo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo_blue: {
        height: 120,
        width: 270,
    },
    container_button: {
        flex: 1,
        gap: 20,
        marginBottom: "10%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_sinscrire: {
        width: 225,
        height: 45,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text_sinscrire: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    button_se_connecter: {
        width: 225,
        height: 45,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0066FF',
    },
    text_se_connecter: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    container_connect_with: {
        flex: 1,
        gap: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    shadow: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    webview: { 
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: 'white',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});


export default HomeScreen;