import React, { useState, useEffect } from "react";
import { StyleSheet, Pressable} from "react-native";
import { Image } from 'expo-image';

import ModalTrombinosope from '../Modals/ModalTrombi'
import getInfoAllEmploye from '../../function/getinfoAllEmploye'

import { getToken } from "../../function/getToken";

import { SHADOW_COLOR, MAIN_COLOR } from '../../Variable';
import { View } from "react-native-animatable";

API_KEY = '67f712a0383e2f3787223cdcd7405a41'

function ImageUser({ item }) {
    const [token, setToken] = useState();
    const [image, setImage] = useState({
        uri: `https://masurao.fr/api/employees/${item.id}/image`,
        headers: {
            'Content-Type': 'image/png',
            'X-Group-Authorization': API_KEY,
            'Authorization': `Bearer ${token}`,
    }});

    useEffect(() => {
        async function fetchToken() {
            const token_tmp = await getToken();
            setToken(token_tmp)
        }
        fetchToken();
    }, []);
    return (
        <View>
            <Image style={{ height: 100, width: 100, borderRadius: 20 }} source={image}/>
        </View>
    )
}

export default function WidgetTrombinoscope(props) {
    const [infos, setinfos] = useState([]);
    const [work, setWork] = useState([]);
    const [modalTrombi, setmodalTrombi] = useState(false);
    
    useEffect(() => {
        async function fetchData() {
            await getInfoAllEmploye(setinfos);
        }
        fetchData();
    }, []);

    return (
        <Pressable onPress={() => { setmodalTrombi(true) }}  style={styles.pressable}>
            {
                modalTrombi === true ? (
                    <ModalTrombinosope changeModalTrombi={() => { setmodalTrombi(false) }} infos={infos} work={work}/>
                ) : null
            }
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                {
                    infos && infos
                    .filter((item) => item.id <= 3)
                    .map((item) => (<ImageUser key={item.id} item={item}/> ))
                }
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressable: {
        flex: 1,
        width: '90%',
        height: '90%',
        borderRadius: 30,
        backgroundColor: MAIN_COLOR,
        shadowColor: SHADOW_COLOR,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 15,
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'center',
    },
});
