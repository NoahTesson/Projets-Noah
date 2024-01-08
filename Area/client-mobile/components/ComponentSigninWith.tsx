import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, Modal, Button, View, TextInput } from 'react-native';
import { WebView } from 'react-native-webview'
import { Image } from 'expo-image';
import * as WebBrowser from 'expo-web-browser';

import { SigninWithComponentProps } from '../types';
import { ThemeContext  }from '../Services/ThemeContext';
import GetTheme from '../Services/GetTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ComponentSigninWith: React.FC<SigninWithComponentProps> = ({ name, navigation }) => {
    const theme = useContext(ThemeContext);
    const [colorTheme, setColorTheme] = useState<{backgroundColor: string;color: string;}>();
    const [isvisibleGithub, setIsvisibleGithub] = useState(false);
    const [isvisibleGoogle, setIsvisibleGoogle] = useState(false);
    const [isvisibleTwitter, setIsvisibleTwitter] = useState(false);

    useEffect(() => {
        if (theme) {
            const tmp = GetTheme(theme?.theme);
            setColorTheme(tmp);
        }
    }, [theme]);

    const twitterConfig = {
        authUrl: 'https://twitter.com/i/oauth2/authorize',
        returnUrl: 'AreaApp://Main',
        clientId: 'T1lweTc0Z0h5UGpCWVQzeUFMenY6MTpjaQ',
        scope: 'tweet.read+tweet.write+offline.access+users.read',
        response_type: 'code',
        state: 'state',
        code_challenge: "challenge",
        code_challenge_method: 'plain'
    };

    const handleGoogleAuth = async () => {
        const redirectUrl = await WebBrowser.openAuthSessionAsync(
            `${theme?.urlBack}api/google/login`,
            'AreaApp://Main'
        );
        console.log(redirectUrl);
    }

    const getToken = async(url: string) => {
        const token = url.split('token=')[1];
        console.log("tok ===", token);
        await AsyncStorage.setItem('token', token);
        // navigation.navigate('MainLayout')
    }

    if (name === "Google") {
        return (
            <TouchableOpacity style={[styles.containerSigninWith, styles.shadow]} onPress={handleGoogleAuth}>
                <Image source={require('../assets/google.png')} style={styles.images_connexion}/>
                <Text style={styles.text_signinWith}>Sign in with {name}</Text>
            </TouchableOpacity>
        )
    } else if (name === "Github") {
        return (
            <TouchableOpacity style={[styles.containerSigninWith, styles.shadow]} onPress={() => setIsvisibleGithub(true)}>
                <Modal
                    visible={isvisibleGithub}
                >
                    <WebView
                        onNavigationStateChange={(navState) => {
                            if (navState.url.includes(`http://localhost:8081/?token=`)) {
                                getToken(navState.url);
                                setIsvisibleGithub(false)
                            }
                        }}
                        source={{ uri: `${theme?.urlBack}api/github/login` }}
                    />
                </Modal>
                <Image source={require('../assets/github.png')} style={styles.images_connexion}/>
                <Text style={styles.text_signinWith}>Sign in with {name}</Text>
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity style={[styles.containerSigninWith, styles.shadow]} onPress={() => setIsvisibleTwitter(true)}>
                <Modal
                    visible={isvisibleTwitter}
                >
                    <>
                        <WebView
                            onNavigationStateChange={(navState) => {
                                if (navState.url.includes(`http://localhost:8081/?token=`)) {
                                    getToken(navState.url);
                                    setIsvisibleTwitter(false)
                                }
                            }}
                            source={{ uri: `${theme?.urlBack}api/discord/login` }}
                        />
                    </>
                </Modal>
                <Image source={require('../assets/discord.png')} style={styles.images_connexion}/>
                <Text style={styles.text_signinWith}>Sign in with {name}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    images_connexion: {
        width: 40,
        height: 40,
    },
    containerSigninWith: {
        padding: 20,
        gap: 10,
        width: 282,
        height: 55,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
    },
    text_signinWith: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    shadow: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});

export default ComponentSigninWith;