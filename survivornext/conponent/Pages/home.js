import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated'
import { Image } from "expo-image";

// Widget
import WidgetTrombinoscope from '../Widgets/widgetTrombinoscope';
import getComponentByWidgetKey from '../getComponentByWidgetKey'

// Modals
import ModalProfile from '../Modals/ModalProfile';
import ModalCalendrier from '../Modals/ModalCalendar';
import ModalMap from '../Modals/ModalMap';
import ModalMenuWidget from '../Modals/ModalMenuWidget';
import ModalMorpion from '../Modals/ModalMorpion';
import ModalNews from '../Modals/ModalNews';
import ModalYoutube from '../Modals/ModalYoutube';
import ModalMemory from '../Modals/ModalMemory';
import ModalCoinFlip from '../Modals/ModalCoinFlip';
import ModalBall from '../Modals/ModalBall';
import ModalPower4 from '../Modals/ModalPower4';
import ModalAnniversary from '../Modals/ModalAnniversary';
import ModalCps from '../Modals/ModalCps';

// Image
const ImagePlus = require('../../assets/plus.png');

import { COLOR_TEXT_BUTTON, SIZE_TITLE, SIZE_MEDIUM } from '../../Variable';
import { getToken } from '../../function/getToken';

import NotificationsApp from '../Notifications';
import { useEffect } from 'react';

export default function HomePage(props) {
    const [token, setToken] = useState();
    const [dataImageEmploye, setDataImageEmploye] = useState({
        uri: `https://masurao.fr/api/employees/${props.dataEmploye.id}/image`,
        headers: {
            'Content-Type': 'image/png',
            'X-Group-Authorization': API_KEY,
            'Authorization': `Bearer ${token}`,
    }});

    // display modal
    const [modalCalendar, setModalCalendar] = useState(false);
    const [modalMorpion, setModalMorpion] = useState(false);
    const [modalChat, setModalChat] = useState(false);
    const [modalProfile, setModalProfile] = useState(false);
    const [modalMenuWidget, setModalMenuWidget] = useState(false);
    const [modalMap, setModalMap] = useState(false);
    const [modalNews, setModalNews] = useState(false);
    const [modalYoutube, setModalYoutube] = useState(false);
    const [modalMemory, setModalMemory] = useState(false);
    const [modalCoinFlip, setModalCoinFlip] = useState(false);
    const [modalBall, setModalBall] = useState(false)
    const [modalPower4, setModalPower4] = useState(false);
    const [modalAnniversary, setModalAnniversary] = useState(false);
    const [modalCps, setModalCps] = useState(false);

    // change image profile
    const [profileImage, setProfileImage] = useState(null);

    const [widgetDisplay, setWidgetDisplay] = useState([
    ]);
    const [widgetNotDisplay, setWidgetNotDisplay] = useState([
        'weather',
        'morpion',
        'map',
        'calendar',
        'news',
        'youtube',
        'nasa',
        'anniversary',
        'power4',
        'memory',
        'coinflip',
        'ball',
        'cps'
    ]);

    useEffect(() => {
        async function fetchToken() {
            const tmp_token = await getToken();
            setToken(tmp_token);
        }
        fetchToken();
    })

    const widgetToNotDisplay = (nameWidget) => {
        const arraydisplay = [...widgetDisplay];
        const arraynotdisplay = [...widgetNotDisplay];

        const index = arraydisplay.indexOf(nameWidget);
        if (index !== -1) {
            arraydisplay.splice(index, 1);
            arraynotdisplay.push(nameWidget);
            setWidgetDisplay(arraydisplay);
            setWidgetNotDisplay(arraynotdisplay);
        }
    };

    const widgetToDisplay = (nameWidget) => {
        const arraynotdisplay = [...widgetNotDisplay];
        const arraydisplay = [...widgetDisplay];

        const index = arraynotdisplay.indexOf(nameWidget);
        if (index !== -1) {
            arraynotdisplay.splice(index, 1);
            arraydisplay.push(nameWidget);
            setWidgetNotDisplay(arraynotdisplay);
            setWidgetDisplay(arraydisplay);
        }
    };

    return (
        <Animated.View
            style={styles.container}
            entering={FadeInRight}
            exiting={FadeOutLeft}
        >
            {modalMenuWidget === true ? (<ModalMenuWidget changeModalMenu={(value) => { setModalMenuWidget(value) }} setmenuWidget={setModalMenuWidget} widgetToDisplay={widgetToDisplay} />) : null}
            {modalMorpion === true ? (<ModalMorpion changeModalMorpion={(value) => { setModalMorpion(value) }} modalMorpion={modalMorpion} />) : null}
            {modalCalendar === true ? (<ModalCalendrier changeModalCalendar={(value) => { setModalCalendar(value) }} modalCalendar={modalCalendar} />) : null}
            {modalProfile === true ? (<ModalProfile changeMenuProfile={(value) => { setModalProfile(value) }} menuProfile={modalProfile} changeProfileImage={(value) => { setProfileImage(value) }} profileImage={profileImage} dataEmploye={props.dataEmploye} updNav={props.updNav} dataImageEmploye={dataImageEmploye}/>) : null}
            {modalMap === true ? (<ModalMap changeModalMap={(value) => { setModalMap(value) }} modalMap={modalMap} location={props.localisation} />) : null}
            {modalNews === true ? ( <ModalNews changeModalNews={(value) => {setModalNews(value)}} modalNews={modalNews} location={props.localisation}/> ) : null }
            {modalYoutube === true ? ( <ModalYoutube changeModalYoutube={(value) => {setModalYoutube(value)}} modalYoutube={modalYoutube} location={props.localisation}/> ) : null }
            {modalMemory === true ? ( <ModalMemory changeModalMemory={(value) => {setModalMemory(value)}} modalMemory={modalMemory} location={props.localisation}/> ) : null }
            {modalCoinFlip === true ? ( <ModalCoinFlip changeModalCoinFlip={(value) => {setModalCoinFlip(value)}} modalCoinFlip={modalCoinFlip} location={props.localisation}/> ) : null }
            {modalBall === true ? ( <ModalBall changeModalBall={(value) => {setModalBall(value)}} modalBall={modalBall} location={props.localisation}/> ) : null }
            {modalPower4 === true ? ( <ModalPower4 changeModalPower4={(value) => {setModalPower4(value)}} ModalPower4={ModalPower4} location={props.localisation}/> ) : null }
            {modalAnniversary === true ? ( <ModalAnniversary changeModalAnniversary={(value) => {setModalAnniversary(value)}} modalAnniversary={modalAnniversary}/> ) : null}
            {modalCps === true ? ( <ModalCps changeModalCps={(value) => {setModalCps(value)}} modalCps={modalCps}/> ) : null}
   
            <View style={styles.container_name}>
                <NotificationsApp />
                <Text style={styles.name}>{props.dataEmploye.name}</Text>
            </View>
            <View style={styles.widget_trombi}>
                <WidgetTrombinoscope /> 
            </View>
            <View style={styles.container_widget}>
                <ScrollView
                    contentContainerStyle={styles.container_widget_scrollview}
                    showsVerticalScrollIndicator={false}
                    >
                    {widgetDisplay.map((widgetKey) => {
                        const component = getComponentByWidgetKey(widgetKey, setModalMorpion, setModalCalendar, setModalMap, setModalNews, setModalYoutube, setModalMemory, setModalCoinFlip, setModalBall,setModalPower4, setModalAnniversary, setModalCps, props.dataWeather, props.localisation, widgetToNotDisplay);
                        return component;
                    })}
                </ScrollView>
                <View style={{ position: 'absolute', bottom: 100, left: 20}}>
                    <TouchableOpacity style={[styles.button_bottom, { top: "90%" }]} onPress={() => setModalMenuWidget(true)}>
                        <Image style={styles.imagePlus} source={ImagePlus} contentFit="cover" transition={1000} />
                    </TouchableOpacity>
                </View>
                <View style={{ position: 'absolute', bottom: 50, right: 20}}>
                    <TouchableOpacity style={styles.button_bottom} onPress={() => setModalProfile(true)}>
                        {profileImage ? (<Image source={{ uri: profileImage }} style={styles.imageProfil} />) : <Image source={dataImageEmploye} style={styles.imageProfil} />}
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    imagePlus: {
        width: 25,
        height: 25,
    },
    imageProfil: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    container: {
        flex: 1,
    },
    container_name: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    widget_trombi: {
        flex: 1.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container_widget: {
        flex: 4,
        marginTop: 20,
    },
    container_widget_scrollview: {
        gap: 20,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    name: {
        fontSize: SIZE_TITLE,
        marginLeft: 30,
        marginTop: 30,
    },
    container_button_Bottom: {
        flex: 1,
        paddingTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button_bottom: {
        color: COLOR_TEXT_BUTTON,
        fontSize: SIZE_MEDIUM,
        width: 50,
        height: 50,
        border: 'none',
        borderRadius: 50,
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});