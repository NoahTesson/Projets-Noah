import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview'
import { Image } from 'expo-image';
import axios from 'axios';

import { ThemeContext  }from '../Services/ThemeContext';
import GetTheme from '../Services/GetTheme';

import DiscordIcon from '../svg/Discord';
import FacebookIcon from '../svg/Facebook';
import GithubIcon from '../svg/Github';
import SpotifyIcon from '../svg/Spotify';
import TeamsIcon from '../svg/Teams';
import TwitchIcon from '../svg/Twitch';
import TwitterIcon from '../svg/Twitter';
import GoogleIcon from '../svg/Google';
import LeftArrowIcon from '../svg/left_arrow'

type dataProps = {
    name:string,
    couleur: string,
    outline?:string,
    component_image: React.JSX.Element,
}

type ConnectToServiceProps = {
    setStateMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConnectToService: React.FC< ConnectToServiceProps > = ({ setStateMenu }) => {
    const theme = useContext(ThemeContext);
    const [colorTheme, setColorTheme] = useState<{backgroundColor: string;color: string;}>();
    const [dataApi, setDataAPI] = useState([]);
    const [currentService, setCurrentService] = useState('');
    const [stateWebView, setStateWebView] = useState(false);
    const [email, setEmail] = useState<string | null>('');
    const sizeIcon = 50;

    useEffect(() => {
        if (theme) {
            const tmp = GetTheme(theme?.theme);
            setColorTheme(tmp);
        }
    }, [theme]);

    useEffect(() => {
        const fetchdata = async () => {
            const token = await AsyncStorage.getItem('token');
            axios.get(`${theme?.urlBack}api/getStatus`, {
                headers: {
                    "X-Authorization-Key": token
                }
            })
                .then((response) => {
                    setDataAPI(response.data.status)
                })
                .catch((error) => {
                    console.log("Error: api/getStatus: ", error.message);
                })
        };    
        fetchdata();
    }, []);

    const data: dataProps[] = [
        {
            name: 'discord',
            couleur: '#5865F2',
            component_image: <DiscordIcon size={sizeIcon}/>,
        },
        {
            name: 'twitter',
            couleur: '#03A9F4',
            component_image: <TwitterIcon size={sizeIcon}/>,
        },
        {
            name: 'facebook',
            couleur: '#1877F2',
            component_image: <FacebookIcon size={sizeIcon}/>,
        },
        {
            name: 'teams',
            couleur: '#2B389D',
            component_image: <TeamsIcon size={sizeIcon}/>,
        },
        {
            name: 'github',
            couleur: 'black',
            component_image: <GithubIcon size={sizeIcon}/>,
        },
        {
            name: 'spotify',
            couleur: '#00D95F',
            component_image: <SpotifyIcon size={sizeIcon}/>,
        },
        {
            name: 'twitch',
            couleur: '#9146FF',
            component_image: <TwitchIcon size={sizeIcon}/>,
        },
        {
            name: 'google',
            couleur: 'blue',
            component_image: <GoogleIcon size={sizeIcon}/>,
        },
        {
            name: 'linkedin',
            couleur: '#007EBB',
            component_image: <Image source={require('../assets/LinkedIn.png')} style={{ height: sizeIcon, width: sizeIcon }}/>,
        },
        {
            name: 'trello',
            couleur: '#518FE1',
            component_image: <Image source={require('../assets/trello.png')} style={{ height: sizeIcon, width: sizeIcon }}/>,
        },
    ];

    const getToken = async (url: string, current_service: string) => {
        const tokenServies = url.split('token=')[1];
        const token = await AsyncStorage.getItem('token');
        axios.post(`${theme?.urlBack}api/${current_service}/setToken`, {
            "token": tokenServies
        }, {
            headers: {
                "X-Authorization-Key": token
            }
        })
            .catch((err) => {})
    }

    const getEmail = async () => {
        const thisEmail = await AsyncStorage.getItem('email');
        setEmail(thisEmail);
    }

    useEffect(() => {
        getEmail();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: colorTheme?.backgroundColor }]}>
            <View style={[styles.header, { backgroundColor: colorTheme?.backgroundColor }]}>
                <LeftArrowIcon isButton={true} size={25} color={colorTheme?.color} onPress={() => setStateMenu(false)}/>
                <Text style={{ color: colorTheme?.color, fontWeight: 'bold', fontSize: 25 }}>Services</Text>
            </View>
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
                                        setCurrentService('');
                                        setStateWebView(false);
                                    }}
                                    style={{ backgroundColor: 'white', opacity: 1, padding: 10 }}
                                >
                                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#3C71DA' }}>Cancel</Text>
                                </TouchableOpacity>
                                <Text style={{ fontSize: 20 }}>{currentService}.com</Text>
                            </View>
                            <View style={{ flex: 8 }}>
                                <WebView
                                    onNavigationStateChange={(navState) => {
                                        console.log(navState.url);
                                        if (navState.url.includes(`localhost:8081/?token=`) || navState.url.includes(`localhost:8081/#token=`)) {
                                            getToken(navState.url, currentService);
                                            setCurrentService('');
                                            const new_tab = dataApi.filter(item => !(currentService in item));
            
                                            dataApi.map((services) => {
                                                Object.entries(services).map(([key, value]) => {
                                                    if (key === currentService) {
                                                        const newItem = {[currentService]: 'Yes'};
                                                        const tab = [...new_tab, newItem];
                                                        setDataAPI(tab);
                                                    }
                                                })
                                            })
                                            setStateWebView(false);
                                        }
                                    }}
                                    source={{ uri: `${theme?.urlBack}api/${currentService}/login_profile?email=${email}`}}
                                    userAgent="Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36"
                                />
                            </View>
                        </View>
                    </Modal>
                ) : null
            }
            <ScrollView
                contentContainerStyle={styles.scrollview}
            >
                {
                    dataApi.map((services) => (
                        Object.entries(services).map(([key, value]) => (
                            data
                            .filter((item) => item.name === key)
                            .map((item: dataProps, index) => (
                                <TouchableOpacity
                                    key={index}
                                    disabled={value === 'Yes' ? true : false}
                                    style={[value === 'No' ? styles.containerServices : styles.containerServicesDisabled, { backgroundColor: item.couleur},  item.outline !== undefined ? { borderWidth: 1, borderColor: item.outline } : null]}
                                    onPress={() => {
                                        setCurrentService(key)
                                        setStateWebView(true);
                                    }}
                                >
                                    <View style={[styles.back_logo, { borderColor: item.couleur }]}>
                                        {item.component_image}
                                    </View>
                                    <Text style={styles.text_services}>{value === 'Yes' ? 'Connected' : 'Sign in'}</Text>
                                </TouchableOpacity>
                            ))
                        ))
                    ))
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'red',
    },
    header: {
        gap: 65,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 30,
        marginBottom: 40,
    },
    containerServices: {
        width: '80%',
        height: 60,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerServicesDisabled: {
        width: '80%',
        height: 60,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        opacity: 0.6,
    },
    scrollview: {
        gap: 15,
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

export default ConnectToService;