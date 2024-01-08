import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, } from 'react-native';
import Animated,{ FadeInRight, FadeOutLeft } from 'react-native-reanimated'

import { post_options_post } from '../../function/post_options';
import{ save }from '../../function/secureStore_save'
import { BACKGROUND_COLOR, MAIN_COLOR, COLOR_TEXT_BUTTON, SIZE_TITLE, SIZE_MEDIUM } from '../../Variable';

TOKEN_ACCESS='67f712a0383e2f3787223cdcd7405a41'

export default function LoginPage(props) {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [wrong, setWrong] = useState(false);
    const [textWrong, setTextWrong] = useState('');
    const body = { body: JSON.stringify({ email: email, password: password })};

    const sendData = async () => {
        await fetch(`https://masurao.fr/api/employees/login`, post_options_post(body, 'application/json'))
            .then(async (respone) => {
                const tmp_data = await respone.json();
                return tmp_data
            })
            .then((response) => {
                if (!response.access_token) {
                    setWrong(true);
                    setTextWrong("Email ou mot de passe incorrect.")
                } else {
                    save(response.access_token);
                    props.updNav("Home");
                }
            })
            .catch((error) => {
                setWrong(true);
                setTextWrong("Le serveur ne répond pas, réessayer ultérieurement.")
            })
    }

    return (
        <Animated.View
            entering={FadeInRight}
            exiting={FadeOutLeft}
            style={styles.container}
        >
            <Text style={styles.title}>Trombinoscope</Text>
            <View style={{ marginTop: 100, gap: 40, alignItems: 'center'}}>
                <TextInput
                    onChangeText={setEmail}
                    value={email}
                    style={styles.email}
                    placeholder="Email"
                    placeholderTextColor="black"
                />
                <TextInput
                    onChangeText={setPassword}
                    value={password}
                    style={styles.password}
                    secureTextEntry={true}
                    placeholder="Password"
                    placeholderTextColor="black"
                />
                <Text style={{ marginTop: -30, color: "white" }}>Mot de passe oublié</Text>
            </View>
            {wrong ? <Text style={{ color: 'red', fontSize: 15, marginTop: 15 }}>{textWrong}</Text> : null}
            <TouchableOpacity
                style={styles.button}
                onPress={sendData}
                activeOpacity={0.7}
            >
                <Text style={styles.text_valider}>Valider</Text>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        paddingTop: '40%',
        backgroundColor: BACKGROUND_COLOR,
    },
    email: {
        backgroundColor: '#D9D9D9',
        width: 250,
        height: 50,
        borderRadius: 20,
        padding: 10,
    },
    password: {
        backgroundColor: '#D9D9D9',
        width: 250,
        height: 50,
        borderRadius: 20,
        padding: 10,
    },
    title: {
        fontSize: SIZE_TITLE,
        color: 'black',
    },
    button: {
        width: 150,
        height: 50,
        borderRadius: 50,
        marginTop: '10%',
        backgroundColor: MAIN_COLOR,
    },
    text_valider: {
        color: COLOR_TEXT_BUTTON,
        fontSize: SIZE_MEDIUM,
        textAlign: 'center',
        lineHeight: 50,
    },
    indicateur: {
        flex: 1,
        justifyContent: 'center',
    },
});
