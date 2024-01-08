import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button, Modal } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/Header';
import { LoginScreenProps } from '../types';
import { ThemeContext  }from '../Services/ThemeContext';
import GetTheme from '../Services/GetTheme';

import OeilIcon from '../svg/ShowPassword';
import HideOeilIcon from '../svg/HidePassword';
import { useToast } from "react-native-toast-notifications";
import { Input } from 'react-native-elements';


const LoginScreen: React.FC< LoginScreenProps > = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorLogin, setErrorLogin] = useState(false);
    const [textErrorLogin, setTextErrorLogin] = useState('incorrect password or email');
    const [showpassword, setShowPassword] = useState(false);
    const [displayModal, setDisplayModal] = useState(false);
    const theme = useContext(ThemeContext);
    const [colorTheme, setColorTheme] = useState<{backgroundColor: string;color: string;}>();
    const toast = useToast();
    useEffect(() => {
        if (theme) {
            const tmp = GetTheme(theme?.theme);
            setColorTheme(tmp);
        }
    }, [theme]);

    const RequestApiLogin = async () => {
        AsyncStorage.setItem('email', email);
        if (email === '' || password === '') {
            setTextErrorLogin("Fill in the fields.");
            setErrorLogin(true);
        } else {
            axios.post(`${theme?.urlBack}user/signin`, {
                "email": email,
                "password": password,
            })
                .then(async(response) => {
                    await AsyncStorage.setItem('token', response.data.token);
                    navigation.navigate('MainLayout')
                })
                .catch((err) => {
                    toast.show('Email or password incorrect', {
                        type: 'danger',
                        duration: 1000,
                        offset: 200,
                    });
                });
        }
    }

    return (
        <View style={styles.containerHeader}>
            <Header navigation={navigation} />
            <View style={[styles.container, { backgroundColor: colorTheme?.backgroundColor }]}>
                <View style={{ gap: 40, alignItems: 'center'}}>
                    <View>
                        <Text style={[styles.text, { color: colorTheme?.color }]}>Email</Text>
                        <TextInput
                            onChangeText={setEmail}
                            value={email}
                            style={styles.text_input}
                        />
                    </View>
                    <View>
                        <Text style={[styles.text, { color: colorTheme?.color }]}>Password</Text>
                        <TextInput
                            onChangeText={setPassword}
                            value={password}
                            style={styles.text_input}
                            secureTextEntry={!showpassword}
                        />
                        {
                            showpassword ? (
                                <HideOeilIcon isButton={true} size={23} style={styles.showpassword} color='black' onPress={() => setShowPassword(false)} />
                            ) : (
                                <OeilIcon isButton={true} size={23} style={styles.showpassword} color='black' onPress={() => setShowPassword(true)}/>
                            )
                        }
                    </View>
                <TouchableOpacity
                    style={{ bottom: '10%' }}
                    onPress={() =>
                        setDisplayModal(true)
                    }
                >
                    <Text style={{ color: colorTheme?.color }}>Forgot password ?</Text>
                </TouchableOpacity>
                </View>
                {errorLogin ? <Text style={{ color: 'red', fontSize: 15, height: '8%' }}>{textErrorLogin}</Text> : null}
                <TouchableOpacity
                    style={styles.button}
                    onPress={RequestApiLogin}
                    activeOpacity={0.7}
                >
                    <Text style={styles.text_valider}>Valider</Text>
                </TouchableOpacity>
                {displayModal &&
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={displayModal}
                        style={{width: '100%', height: '50%'}}
                    >
                        <View style={styles.displayModal}>
                            <Input
                                placeholder="Email"
                                onChange={(e) => setEmail(prev => e.nativeEvent.text)}
                                />
                            <Button
                                title="Valider"
                                onPress={() => {
                                    setDisplayModal(false)
                                    axios.post(`${theme?.urlBack}user/resetPassword`, {
                                        "email": email
                                    })
                                    .then((response) => {
                                        toast.show('Email sent', {
                                            type: 'success',
                                            duration: 1000,
                                            offset: 200,
                                        });
                                    })
                                    .catch((error) => {
                                        toast.show("An error occured during email sending", {
                                            type: 'danger',
                                            duration: 1000,
                                            offset: 200,
                                        });
                                    });
                                }
                            }
                            />
                        </View>
                    </Modal>
                }
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
    displayModal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    containerHeader: {
        flex: 1,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        paddingTop: '40%',
    },
    text_input: {
        backgroundColor: '#D9D9D9',
        width: 250,
        height: 45,
        borderRadius: 15,
        padding: 10,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    button: {
        width: 225,
        height: 45,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0066FF',
    },
    text_valider: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    showpassword: {
        position: 'relative',
        left: '56%',
        bottom: '36%',
    },
});

export default LoginScreen;