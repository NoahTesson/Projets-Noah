import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-toast-notifications';
import { Image } from 'expo-image';
import axios from 'axios';

import { ThemeContext  }from '../Services/ThemeContext';
import PieceActionIcon from '../svg/pieces_action';
import PieceReactionIcon from '../svg/pieces_reaction';

import CroixIcon from '../svg/Croix';
import DiscordIcon from '../svg/Discord';
import TwitterIcon from '../svg/Twitter';
import SheetIcon from '../svg/Sheet';
import GithubIcon from '../svg/Github';
import SpotifyIcon from '../svg/Spotify';
import EmailIcon from '../svg/email';
import ChessIcon from '../svg/Chess';
import TwitchIcon from '../svg/Twitch';

import ModalEditArea from './ModalEditArea';

type AreaObj = {
    service_action: string;
    service_reaction: string;
    action: string;
    reaction: string;
    titre: string;
    id: string;
}

type AreaToDisplayProps = {
    id: string;
    service_action: string;
    service_reaction: string;
    action: string;
    reaction: string;
    titre: string;
    getArea: () => Promise<void>;
}

const AreaToDisplay: React.FC<AreaToDisplayProps> = ({ id, service_action, service_reaction, action, reaction, titre, getArea }) => {
    const theme = useContext(ThemeContext);
    const toast = useToast();
    const sizeImage = 30;
    const [stateToast, setStateToast] = useState(true);
    const [stateWebView, setStateWebView] = useState(false);
    const [onPressStyle, setOnPressStyle] = useState(false);
    const item: AreaObj = {
        service_action: service_action,
        service_reaction: service_reaction,
        action: action,
        reaction: reaction,
        titre: titre,
        id: id,
    }

    
    const data: { [key: string]: { couleur: string, logo: React.JSX.Element } } = {
        'Sheet': {
            couleur: '#1DA362',
            logo: <SheetIcon size={sizeImage}/>
        },
        'Twitter': {
            couleur: '#03A9F4',
            logo: <TwitterIcon size={sizeImage}/>
        },
        'Discord': {
            couleur: '#5865F2',
            logo: <DiscordIcon size={sizeImage}/>
        },
        'Github': {
            couleur: 'black',
            logo: <GithubIcon size={sizeImage}/>,

        },
        'Spotify': {
            couleur: '#00D95F',
            logo: <SpotifyIcon size={sizeImage}/>,
        },
        'Email': {
            couleur: 'black',
            logo: <EmailIcon size={sizeImage}/>,
        },
        'Chess': {
            couleur: '#779954',
            logo: <ChessIcon size={sizeImage}/>,
        },
        'Clashofclans': {
            couleur: '#B69476',
            logo: <Image source={require('../assets/Clash-of-Clans.png')} style={{ height: sizeImage, width: sizeImage }}/>,
        },
        'Coingecko': {
            couleur: '#8CC63F',
            logo: <Image source={require('../assets/CoinGecko.png')} style={{ height: sizeImage, width: sizeImage }}/>
        },
        'Clashroyale': {
            couleur: '#D88A3F',
            logo: <Image source={require('../assets/clash-royale.png')} style={{ height: sizeImage, width: sizeImage }}/>
        },
        'Weather': {
            couleur: '#F9D448',
            logo: <Image source={require('../assets/weather.png')} style={{ height: sizeImage, width: sizeImage, borderRadius: 100 }}/>
        },
        'Linkedin': {
            couleur: '#007EBB',
            logo: <Image source={require('../assets/LinkedIn.png')} style={{ height: sizeImage, width: sizeImage }}/>,
        },
        'Tft': {
            couleur: '#F0C957',
            logo: <Image source={require('../assets/tft.png')} style={{ height: sizeImage, width: sizeImage }}/>,
        },
        'Trello': {
            couleur: '#518FE1',
            logo: <Image source={require('../assets/trello.png')} style={{ height: sizeImage, width: sizeImage }}/>,
        },
        'Brawlstar': {
            couleur: '#FFBE20',
            logo: <Image source={require('../assets/Brawlstar.png')} style={{ height: sizeImage, width: sizeImage, borderRadius: 100  }}/>,
        },
        'DateTime': {
            couleur: 'black',
            logo: <Image source={require('../assets/datetime.png')} style={{ height: sizeImage, width: sizeImage, borderRadius: 100  }}/>,
        },
        'Twitch': {
            couleur: '#9146FF',
            logo: <TwitchIcon size={30}/>
        },
    };

    const delArea = async () => {
        const token = await AsyncStorage.getItem('token');
        axios.delete(`${theme?.urlBack}areas/${id}`, {
            headers: {
                "X-Authorization-Key": token
            }
        })
            .then((response) => {
                if (response.data.status === 'Successfully Deleted') {
                    getArea();
                    toast.show('Area deleted', {
                        type: 'success',
                        duration: 1000,
                        offset: 200,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                toast.show('Error, please try again', {
                    type: 'danger',
                    duration: 1000,
                    offset: 200,
                });
            })
    }

    return (
        <Pressable
            onPress={() => {
                if (stateToast) {
                    toast.show('Stay pressed to modify', {
                        type: 'Warning',
                        duration: 1000,
                        offset: 300,
                    });
                    setStateToast(false);
                    setTimeout(() => {
                        setStateToast(true);
                    }, 2000);
                }
            }}
            onLongPress={() => {
                setStateWebView(true);
            }}
            onPressIn={() => {
                setOnPressStyle(true);
            }}
            onPressOut={() => {
                setOnPressStyle(false);
            }}
            style={[styles.container, onPressStyle ? styles.onPress : null ]}
        >
            {stateWebView && <ModalEditArea item={item} setStateWebView={setStateWebView}/>}
            <Text style={styles.text}>{titre}</Text>
            <PieceActionIcon width={250} height={199} color={data[service_reaction]?.couleur} />
            <CroixIcon isButton={true} size={35} style={styles.delArea} onPress={delArea} color='#732322'/>
            <View style={styles.container_logo_action}>
                {data[service_reaction]?.logo}
            </View>
            <Text style={[styles.text_action, { color: service_reaction === 'Github' || service_reaction === 'Email' || service_reaction === 'DateTime' ? 'white' : 'black' }]}>{reaction}</Text>

            <PieceReactionIcon width={250} height={199} color={data[service_action]?.couleur} style={styles.pieceReaction}/>
            <View style={styles.container_logo_reaction}>
                {data[service_action]?.logo}
            </View>
            <Text style={[styles.text_reaction, { color: service_action === 'Github' || service_action === 'Email' || service_action === 'DateTime' ? 'white' : 'black' }]}>{action}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 380,
        alignItems: 'center',
    },
    pieceReaction: {
        top: -58.85,
        left: -0.5,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    container_logo_action: {
        position: 'absolute',
        top: 50,
        width: 55,
        height: 55,
        borderRadius: 100,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    container_logo_reaction: {
        position: 'absolute',
        top: 230,
        width: 55,
        height: 55,
        borderRadius: 100,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    text_action: {
        position: 'absolute',
        fontSize: 15,
        top: 130,
        fontWeight: 'bold',
    },
    text_reaction: {
        position: 'absolute',
        fontSize: 15,
        top: 305,
        fontWeight: 'bold',
    },
    shadow: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    delArea: {
        position: 'absolute',
        top: 50,
        right: 70,
        zIndex: 1,
    },
    editArea: {
        position: 'absolute',
        top: 50,
        left: 70,
        zIndex: 1,
    },
    onPress: {
        opacity: 0.5
    }
});

export default AreaToDisplay;
