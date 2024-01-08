import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { ItemProps } from '../components/ActionChoosen';
import EditArea from './EditArea';

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

type AreaObj = {
    service_action: string;
    service_reaction: string;
    action: string;
    reaction: string;
    titre: string;
    id: string;
}

type ModalEditAreaProps = {
    item: AreaObj;
    setStateWebView: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalEditArea: React.FC<ModalEditAreaProps> = ({ item, setStateWebView }) => {
    const sizeIcon = 60;

    const data: { [key: string]: ItemProps } = {
        "Insta": {
            name: 'Insta',
            second_name: 'Insta',
            couleur: '#FE543F',
            component: <InstaIcon size={sizeIcon}/>
        },
        "Discord": {
            name: 'Discord',
            second_name: 'Discord',
            couleur: '#5865F2',
            component: <DiscordIcon size={sizeIcon}/>
        },
        "Twitter": {
            name: 'Twitter',
            second_name: 'Twitter',
            couleur: '#03A9F4',
            component: <TwitterIcon size={sizeIcon}/>
        },
        "Facebook": {
            name: 'Facebook',
            second_name: 'Facebook',
            couleur: '#1877F2',
            component: <FacebookIcon size={sizeIcon}/>
        },
        "Teams": {
            name: 'Teams',
            second_name: 'Teams',
            couleur: '#2B389D',
            component: <TeamsIcon size={sizeIcon}/>
        },
        "Github": {
            name: 'Github',
            second_name: 'Github',
            couleur: 'black',
            component: <GithubIcon size={sizeIcon} />
        },
        "Spotify": {
            name: 'Spotify',
            second_name: 'Spotify',
            couleur: '#00D95F',
            component: <SpotifyIcon size={sizeIcon}/>
        },
        "Twitch": {
            name: 'Twitch',
            second_name: 'Twitch',
            couleur: '#9146FF',
            component: <TwitchIcon size={sizeIcon}/>
        },
        "Sheet": {
            name: 'Sheet',
            second_name: 'Google',
            couleur: '#07AD3E',
            component: <SheetIcon size={sizeIcon}/>
        },
        "Email": {
            name: 'Email',
            second_name: 'Email',
            couleur: 'black',
            component: <EmailIcon size={sizeIcon} />
        },
        "Chess": {
            name: 'Chess',
            second_name: 'Chess',
            couleur: '#779954',
            component: <ChessIcon size={sizeIcon}/>
        },    
    }

    return (
        <Modal
            transparent={true}
            animationType='fade'
        >
            <View style={{ flex: 1 }}>
                <View style={styles.webview}>
                    <TouchableOpacity
                        onPress={() => {
                            setStateWebView(false);
                        }}
                        style={{ backgroundColor: 'white', opacity: 1, padding: 10 }}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#3C71DA' }}>Annuler</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 8, backgroundColor: 'white' }}>
                    <EditArea id={item.id} name={item.titre} item_action={data[item.service_reaction]} item_reaction={data[item.service_action]} setStateWebView={setStateWebView}/>
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

export default ModalEditArea;