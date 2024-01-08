import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Modal, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from "react-native-toast-notifications";
import { WebView } from 'react-native-webview'
import { Image } from 'expo-image';
import axios from 'axios';

import GetImage from "../functions/getImage";
import CoonectToService from '../components/ConnectToService';

import DeconnecterIcon from '../svg/deconnecter'
import FlecheDroiteIcon from '../svg/FlecheDroit';

import { ProfileScreenProps } from '../types';
import { ThemeContext  }from '../Services/ThemeContext';
import GetTheme, { Theme } from '../Services/GetTheme';

type UserData = {
    name: string;
    surname: string;
    email: string;
}

const ProfileScreen: React.FC< ProfileScreenProps > = ({ navigation }) => {
    const theme = useContext(ThemeContext);
    const toast = useToast();
    const [userData, setUserData] = useState<UserData>();
    const [colorTheme, setColorTheme] = useState<Theme>();
    const [stateServicesMenu, setStateServicesMenu] = useState(false);
    const [stateUpdPassword, setStateUpdPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [stateWebView, setStateWebView] = useState(false)

    useEffect(() => {
        if (theme) {
            const tmp = GetTheme(theme?.theme);
            setColorTheme(tmp);
        }
    }, [theme]);

    useEffect(() => {
        const fetchdata = async () => {
            const token = await AsyncStorage.getItem('token');
            axios.get(`${theme?.urlBack}user/me`, {
                headers: {
                    'X-Authorization-Key': token
                }
            })
                .then((response) => {
                    setUserData(response.data);
                })
                .catch((error) => {
                    console.log(error.message);
                })
        };
        fetchdata();
    }, []);

    const UpdPassword = async () => {
        if (newPassword === '')
            console.log("empty password");
        else {
            const token = AsyncStorage.getItem('token');
            axios.post(`${theme?.urlBack}user/resetPassword/${token}`, {
                "password": newPassword
            })
                .then((response) => {
                    if (response.data.succes === "Password changed") {
                        toast.show('Password changed', {
                            type: 'success',
                            duration: 1000,
                            offset: 200,
                        });
                    }
                })
                .catch((error) => {
                    toast.show(error.message, {
                        type: 'danger',
                        duration: 1000,
                        offset: 200,
                    });
                })
            setStateUpdPassword(false);
        }
    }

    const disconnected = async () => {
        await AsyncStorage.removeItem('token');
        navigation.navigate('Home');
    }

    return (
        <View style={[styles.container, { backgroundColor: colorTheme?.blue }]}>
            <View style={styles.container_header}>
                <GetImage/>
                <View style={{}}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: colorTheme?.backgroundColor }}>{userData?.surname} {userData?.name}</Text>
                    <Text style={{ color: colorTheme?.backgroundColor }}>{userData?.email}</Text>
                </View>
                <DeconnecterIcon isButton={true} size={25} color={colorTheme?.backgroundColor} onPress={disconnected}/>
            </View>
            <Modal
                transparent={true}
                animationType="slide"
                visible={stateUpdPassword}
            >
                <View style={styles.modalContainer}>
                    <View style={[styles.modalContent, { backgroundColor: colorTheme?.backgroundColor, borderColor: colorTheme?.color }]}>
                        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: colorTheme?.color, flex: 1, textAlign: 'center' }}>New Password</Text>
                            <TouchableOpacity
                                onPress={() => setStateUpdPassword(false)}
                            >
                                <Text style={{ fontWeight: 'bold' }}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={[styles.input, { color: colorTheme?.color }]}
                            placeholder="Enter new password"
                            placeholderTextColor={colorTheme?.color}
                            value={newPassword}
                            onChangeText={text => setNewPassword(text)}
                        />
                        <TouchableOpacity onPress={UpdPassword}>
                            <Text style={{ color: colorTheme?.color }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {
                stateServicesMenu ? (
                    <View style={[styles.pageContent, { backgroundColor: colorTheme?.backgroundColor }]}>
                        <CoonectToService setStateMenu={setStateServicesMenu}/>
                    </View>
                ) : (
                    <View style={[styles.pageContent, { backgroundColor: colorTheme?.backgroundColor }]}>
                        <TouchableOpacity
                            onPress={theme?.toggleTheme}
                            style={[styles.button_changeTheme, { backgroundColor: colorTheme?.theme === 'light' ? 'black': 'white' }]}
                        >
                            {
                                colorTheme?.theme === 'light' ? (
                                    <Image  style={styles.image} source={require('../assets/lune.png')}/>
                                ) : (
                                    <Image  style={styles.image} source={require('../assets/soleil.png')}/>
                                )
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button_content}
                            onPress={() => setStateServicesMenu(true)}
                        >
                            <Text style={{ fontWeight: 'bold' }}>Services</Text>
                            <FlecheDroiteIcon size={25} color={colorTheme?.color}/>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button_content}
                            onPress={() => {
                                axios.post(`${theme?.urlBack}user/resetPassword`, {
                                    "email": userData?.email
                                })
                                .then((response) => {
                                    toast.show('Email sent', {
                                        type: 'success',
                                        duration: 1000,
                                        offset: 200,
                                    });
                                })
                                .catch((error) => {
                                    toast.show("Error occured during email sending", {
                                        type: 'danger',
                                        duration: 1000,
                                        offset: 200,
                                    });
                                });
                            }
                            }
                        >
                            <Text style={{ fontWeight: 'bold' }}>Modify password</Text>
                            <FlecheDroiteIcon size={25} color={colorTheme?.color}/>
                        </TouchableOpacity>
                        {
                            stateWebView ? (
                                <Modal
                                    transparent={true}
                                    visible={stateWebView}
                                >
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.webview}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setStateWebView(false);
                                                }}
                                                style={{ backgroundColor: 'white', opacity: 1, padding: 10 }}
                                            >
                                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#3C71DA' }}>Close</Text>
                                            </TouchableOpacity>
                                            <Text style={{ fontSize: 20 }}>about.json</Text>
                                        </View>
                                        <View style={{ flex: 8 }}>
                                            <WebView
                                                source={{ uri: `${theme?.urlBack}about.json` }}
                                            />
                                        </View>
                                    </View>
                                </Modal>
                            ) : null
                        }
                        <TouchableOpacity
                            style={styles.btnLoadAbout}
                            onPress={async () => {
                                setStateWebView(true)
                            }}
                        >
                            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>about.json</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        top: '56%',
        left: '6%'
    },
    pageContent: {
        flex: 2,
        justifyContent: 'center',
        gap: 50,
        paddingTop: '10%',
        alignItems: 'center',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
    },
    footer: {
        width: '100%',
        height: '12%',
        backgroundColor: '#0066FF',
        flexDirection: 'row',
        paddingTop: '4%',
    },
    button_changeTheme: {
        width: 60,
        height: 60,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container_header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1,
    },
    button_content: {
        width: '80%',
        height: '13%',
        borderRadius: 20,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        backgroundColor: '#D9D9D9',
    },
    btnLoadAbout: {
        width: '30%',
        height: '13%',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D9D9D9',
    },
    image: {
        width: 35,
        height: 35,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: 300,
        padding: 20,
        borderWidth: 2,
        borderRadius: 20,
        alignItems: 'center',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ccc',
        padding: 10,
        marginTop: 20,
        marginBottom: 10,
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


export default ProfileScreen;