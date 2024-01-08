import React, { useState, useContext, useEffect } from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { WebView } from 'react-native-webview'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { ThemeContext  }from '../Services/ThemeContext';
import { ItemProps, nullData } from "./ActionChoosen";

type WebViewConnectProps = {
    item: ItemProps;
    setStateWebView: React.Dispatch<React.SetStateAction<boolean>>;
    getItem: (item: ItemProps) => void;
}

const WebViewConnect: React.FC<WebViewConnectProps> = ({ item, setStateWebView, getItem }) => {
    const theme = useContext(ThemeContext);
    const [email, setEmail] = useState<string | null>('');

    const getToken = async(url: string, current_service: string) => {
        console.log(url);
        const tokenServies = url.split('token=')[1];
        const token = await AsyncStorage.getItem('token');
        console.log("tok ===", tokenServies);
        axios.post(`${theme?.urlBack}api/${current_service}/setToken`, {
            "token": tokenServies
        }, {
            headers: {
                "X-Authorization-Key": token
            }
        })
            .catch((err) => {})
    }

    useEffect(() => {
        const fetchdata = async () =>{
            const thisemail = await AsyncStorage.getItem('email');
            setEmail(thisemail);
        };
        fetchdata()
    }, []);

    return (
        <Modal
        >
            <View style={{ flex: 1 }}>
                <View style={styles.webview}>
                    <TouchableOpacity
                        onPress={() => {
                            setStateWebView(false);
                        }}
                        style={{ backgroundColor: 'white', opacity: 1, padding: 10 }}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#3C71DA' }}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20 }}>{item.second_name.toLowerCase()}.com</Text>
                </View>
                <View style={{ flex: 8 }}>
                    <WebView
                        onNavigationStateChange={(navState) => {
                            if (navState.url.includes(`localhost:8081/?token=`) || navState.url.includes(`localhost:8081/#token=`)) {
                                getToken(navState.url, item.second_name.toLocaleLowerCase());
                                getItem(item)
                                setStateWebView(false);
                            }
                        }}
                        source={{ uri: `${theme?.urlBack}api/${item.second_name.toLowerCase()}/login_profile?email=${email}`}}
                        userAgent="Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36"
                    />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
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

export default WebViewConnect;