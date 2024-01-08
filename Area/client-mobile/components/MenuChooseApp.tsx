import React, {useContext, useEffect, useState} from 'react'
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import axios from 'axios';

import { ItemProps, nullData } from './ActionChoosen';

import CroixIcon from '../svg/Croix';
import DiscordIcon from '../svg/Discord';
import FacebookIcon from '../svg/Facebook';
import GithubIcon from '../svg/Github';
import InstaIcon from '../svg/insta';
import SpotifyIcon from '../svg/Spotify';
import TeamsIcon from '../svg/Teams';
import TwitchIcon from '../svg/Twitch';
import TwitterIcon from '../svg/Twitter';
import SheetIcon from '../svg/Sheet';
import EmailIcon from '../svg/email';
import ChessIcon from '../svg/Chess';

import { ThemeContext } from '../Services/ThemeContext';
import WebViewConnect from './WebViewConnect';


type MenuChooseAppProps = {
    dataApi: never [];
    setDisplayAction: React.Dispatch<React.SetStateAction<boolean>>;
    setAppliAction: React.Dispatch<React.SetStateAction<boolean>>;
    setDataAction: React.Dispatch<React.SetStateAction<ItemProps>>;
    type: string;
}

const MenuChooseApp: React.FC< MenuChooseAppProps > = ({ dataApi, setDisplayAction, setAppliAction, setDataAction, type }) => {
    const theme = useContext(ThemeContext);
    const sizeIcon = 60;
    const [displayedApps, setDisplayApps] = useState([])
    const [serviceToConnect, setServiceToConnect] = useState<ItemProps>(nullData);
    const [stateWebView, setStateWebView] = useState(false);
    const ServiceNotLog = ['Email', 'Chess', 'Brawlstar', 'Weather', 'Coingecko', 'Tft', 'Clashroyale', 'Clashofclans', 'Datetime', 'Twitch'];

    const getItem = (item: ItemProps) => {
        setAppliAction(true);
        setDisplayAction(false);
        setDataAction(item)
    }

    const checkIfUserConnected = (item: ItemProps) => {
        dataApi.map((services) => (
            Object.entries(services).map(([key, value]) => {
                if (key.toLowerCase() === item.second_name.toLowerCase()) {
                    if (value === 'No') {
                        showAlert(item);
                    } else {
                        setAppliAction(true);
                        setDisplayAction(false);
                        setDataAction(item)
                    }
                } else if (ServiceNotLog.includes(item.second_name) || ServiceNotLog.includes(item.second_name)) {
                    setAppliAction(true);
                    setDisplayAction(false);
                    setDataAction(item)
                }
            })
        ));
    }

    const showAlert = (item: ItemProps) => {
        Alert.alert(
            'Sign in',
            'To use this service, you need to sign in to it.',
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                        setDataAction(nullData);
                    }
                },
                {
                    text: 'Sign in',
                    onPress: () => {
                        setServiceToConnect(item);
                        setStateWebView(true);
                    },
                },
            ]
        );
    };

    const data: ItemProps[] = [
        {
            name: 'Discord',
            second_name: 'Discord',
            couleur: '#5865F2',
            component: <DiscordIcon size={sizeIcon}/>
        },
        {
            name: 'Twitter',
            second_name: 'Twitter',
            couleur: '#03A9F4',
            component: <TwitterIcon size={sizeIcon}/>
        },
        {
            name: 'Facebook',
            second_name: 'Facebook',
            couleur: '#1877F2',
            component: <FacebookIcon size={sizeIcon}/>
        },
        {
            name: 'Github',
            second_name: 'Github',
            couleur: 'black',
            component: <GithubIcon size={sizeIcon} />
        },
        {
            name: 'Spotify',
            second_name: 'Spotify',
            couleur: '#00D95F',
            component: <SpotifyIcon size={sizeIcon}/>
        },
        {
            name: 'Twitch',
            second_name: 'Twitch',
            couleur: '#9146FF',
            component: <TwitchIcon size={sizeIcon}/>
        },
        {
            name: 'Sheet',
            second_name: 'Google',
            couleur: '#07AD3E',
            component: <SheetIcon size={sizeIcon}/>
        },
        {
            name: 'Email',
            second_name: 'Email',
            couleur: 'black',
            component: <EmailIcon size={sizeIcon} />
        },
        {
            name: 'Chess',
            second_name: 'Chess',
            couleur: '#779954',
            component: <ChessIcon size={sizeIcon}/>
        },
        {
            name: 'Clashofclans',
            second_name: 'Clashofclans',
            couleur: '#B69476',
            component: <Image source={require('../assets/Clash-of-Clans.png')} style={{ height: sizeIcon, width: sizeIcon }}/>
        },
        {
            name: 'Coingecko',
            second_name: 'Coingecko',
            couleur: '#8CC63F',
            component: <Image source={require('../assets/CoinGecko.png')} style={{ height: sizeIcon, width: sizeIcon }}/>
        },
        {
            name: 'Clashroyale',
            second_name: 'Clashroyale',
            couleur: '#D88A3F',
            component: <Image source={require('../assets/clash-royale.png')} style={{ height: sizeIcon, width: sizeIcon }}/>
        },
        {
            name: 'Weather',
            second_name: 'Weather',
            couleur: '#F9D448',
            component: <Image source={require('../assets/weather.png')} style={{ height: sizeIcon, width: sizeIcon, borderRadius: 100 }}/>
        },
        {
            name: 'Linkedin',
            second_name: 'Linkedin',
            couleur: '#007EBB',
            component: <Image source={require('../assets/LinkedIn.png')} style={{ height: sizeIcon, width: sizeIcon }}/>,
        },
        {
            name: 'Tft',
            second_name: 'Tft',
            couleur: '#F0C957',
            component: <Image source={require('../assets/tft.png')} style={{ height: sizeIcon, width: sizeIcon }}/>,
        },
        {
            name: 'Trello',
            second_name: 'Trello',
            couleur: '#518FE1',
            component: <Image source={require('../assets/trello.png')} style={{ height: sizeIcon, width: sizeIcon }}/>,
        },
        {
            name: 'Brawlstar',
            second_name: 'Brawlstar',
            couleur: '#FFBE20',
            component: <Image source={require('../assets/Brawlstar.png')} style={{ height: sizeIcon, width: sizeIcon, borderRadius: 100  }}/>,
        },
        {
            name: 'Datetime',
            second_name: 'Datetime',
            couleur: 'black',
            component: <Image source={require('../assets/datetime.png')} style={{ height: sizeIcon, width: sizeIcon, borderRadius: 100  }}/>,
        }
    ];

    useEffect(() => {
        const fetchdata = async () => {
            const token = await AsyncStorage.getItem('token');
            axios.post(`${theme?.urlBack}areas/getServices`, {
                "type": type,
            }, {
                headers: {
                    "X-Authorization-Key": token
                }
            })
                .then(response =>{
                    const newData = response.data.map((serviceName: string) => {
                        const matchingData = data.find(item => item.name === serviceName);
                        return matchingData || null;
                    });
                    setDisplayApps(newData);
                })
                .catch((error) => {
                    console.log("Error araes/getServies: ", error.message);
                })
        }
        fetchdata();
    }, []);

    return (
        <Animated.View
            entering={FadeInDown}
            exiting={FadeOutDown}
            style={styles.container}
        >
            {stateWebView && <WebViewConnect item={serviceToConnect} setStateWebView={setStateWebView} getItem={getItem}/>}
            <CroixIcon isButton={true} size={40} color='black' onPress={() => setDisplayAction(false)} style={{ zIndex: 1 ,position: 'absolute' ,left: '87%', top: '5%' }}/>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                horizontal
                showsHorizontalScrollIndicator={false}
            > 
                {displayedApps.map((item: ItemProps, index) => (
                    <View key={index} style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={() => {
                                checkIfUserConnected(item)
                            }}
                        >
                            {item.component}
                        </TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>{item.name}</Text>
                    </View>
                ))}
            </ScrollView>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        top: '70%',
        height: 160,
        width: '100%',
        borderTopLeftRadius: 25,
        borderTopLeftRight: 25,
        position: 'absolute',
        alignSelf: 'flex-end',
        backgroundColor: "#D9D9D9",
    },
    scrollView: {
        paddingTop: '8%',
        gap: 20,
        paddingLeft: '5%',
        paddingRight: '5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {

    },
});

export default MenuChooseApp;