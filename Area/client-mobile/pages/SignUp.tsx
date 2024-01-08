import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from "react-native-toast-notifications";

import Header from '../components/Header';
import { SignUpScreenProps } from '../types';
import { ThemeContext  }from '../Services/ThemeContext';
import GetTheme from '../Services/GetTheme';

import OeilIcon from '../svg/ShowPassword';
import HideOeilIcon from '../svg/HidePassword';

const SignUpScreen: React.FC< SignUpScreenProps > = ({ navigation }) => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorAccount, setErrorAccount] = useState(false)
    const [showpassword, setShowPassword] = useState(false);
    const tabStyleInput = [styles.text_input, styles.shadow];
    const tabStyleErrorInput = [styles.text_input, styles.text_input_error, styles.shadow];
    const theme = useContext(ThemeContext);
    const [colorTheme, setColorTheme] = useState<{backgroundColor: string;color: string;}>();
    const toast = useToast();

    useEffect(() => {
        if (theme) {
            const tmp = GetTheme(theme?.theme);
            setColorTheme(tmp);
        }
    }, [theme]);

    const GetDataUser = async () => {
        await AsyncStorage.setItem('email', email);
        if (nom === '' || prenom === '' || email === '' || password === '')
            setErrorAccount(true);
        else {
            axios.post(`${theme?.urlBack}user/signup`, {
                "name": nom,
                "surname": prenom,
                "email": email,
                "password": password,
            })
            .then(async(response) => {
                console.log(response.data);
                await AsyncStorage.setItem('token', response.data.token);
                navigation.navigate('MainLayout');
            })
            .catch((error) => {
                toast.show('' + error.message, {
                    type: 'warning',
                    duration: 1000,
                    offset: 200,
                });
            });
        }
    }

    return (
        <View style={styles.containerSignIn}>
            <Header navigation={navigation}/>
            <View style={[styles.container, { backgroundColor: colorTheme?.backgroundColor }]}>
                <View style={{ gap: 20 }}>
                    <View>
                        <Text style={[styles.text, styles.shadow, { color: colorTheme?.color }]}>Name</Text>
                        <TextInput
                            onChangeText={setNom}
                            value={nom}
                            style={errorAccount ? tabStyleErrorInput : tabStyleInput}
                            />
                    </View>
                    <View>
                        <Text style={[styles.text, styles.shadow, { color: colorTheme?.color }]}>Surname</Text>
                        <TextInput
                            onChangeText={setPrenom}
                            value={prenom}
                            style={errorAccount ? tabStyleErrorInput : tabStyleInput}
                            />
                    </View>
                    <View>
                        <Text style={[styles.text, styles.shadow, { color: colorTheme?.color }]}>Email</Text>
                        <TextInput
                            onChangeText={setEmail}
                            value={email}
                            style={errorAccount ? tabStyleErrorInput : tabStyleInput}
                            />
                    </View>
                    <View>
                        <Text style={[styles.text, styles.shadow, { color: colorTheme?.color }]} >Password</Text>
                        <TextInput
                            onChangeText={setPassword}
                            value={password}
                            style={errorAccount ? tabStyleErrorInput : tabStyleInput}
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
                </View>
                {errorAccount && <Text style={[{ color: 'red', fontSize: 15 }, styles.shadow]}>Please fill in all fields</Text>}
                <TouchableOpacity
                    style={[styles.button_Create_account, styles.shadow]}
                    onPress={GetDataUser}
                    activeOpacity={0.7}
                    >
                    <Text style={styles.text_valider}>Create account</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerSignIn: {
        flex: 1,
    },
    container: {
        flex: 1,
        gap: 50,
        paddingTop: '20%',
        alignItems: 'center',
    },
    button_Create_account: {
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
    text: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    text_input: {
        backgroundColor: '#D9D9D9',
        width: 250,
        height: 45,
        borderRadius: 15,
        padding: 10,
    },
    text_input_error: {
        borderWidth: 2,
        borderBottomColor: '#E31A1A',
        borderLeftColor: '#D9D9D9',
        borderRightColor: '#D9D9D9',
        borderTopColor: '#D9D9D9',
    },
    shadow: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    showpassword: {
        position: 'relative',
        left: '87%',
        bottom: '36%',
    },
});

export default SignUpScreen;