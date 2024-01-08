import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

import DataUserModal from "./Modals/ModaldataUser";
import getInfoEmployeId from '../function/getinfoEmployeId'
import { getToken } from "../function/getToken";

API_KEY = '67f712a0383e2f3787223cdcd7405a41'

const IMAGE_WORK = require("../assets/valise.png")

export default function DataAnniversary({ item }) {
    const [dataUserModal, setdataUserModal] = useState(false);
    const [datas, setDatas] = useState();
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
        async function fetchData() {
            await getInfoEmployeId(item.id, setDatas);
        }
        fetchToken();
        fetchData();
    }, []);

    if (datas) {
        var todayDate = new Date();
        var todayDay = todayDate.getDate();
        var todayMonth = todayDate.getMonth();

        var birthDate = new Date(datas.birth_date);
        var dayBirthDate = birthDate.getDate();
        var monthBirthDate = birthDate.getMonth();

        if (todayDay == dayBirthDate && todayMonth == monthBirthDate) {
            return (
                <TouchableOpacity style={styles.container} onPress={() => {setdataUserModal(true)}}>
                    {
                        dataUserModal === true ? (
                            <DataUserModal key={datas.id} changeModalDataUser={(value) => {setdataUserModal(value)}} datas={datas} image={image} dataUserModal={dataUserModal}/>
                        ) : null
                    }
                    <View style={styles.imageContainer}>
                        <Image style={styles.image_user} source={image}/>
                    </View>
                    <View style={styles.container_texte}>
                        {datas && <Text style={styles.textName}>{datas.name} {datas.surname}</Text>}
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <Image style={styles.image_work} source={IMAGE_WORK}/>
                            {datas && <Text style={styles.text}>{datas.work}</Text>}
                        </View>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return null
        }
    } else {
        return null
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    textName: {
        color: 'black',
        fontSize: 20,
    },
    imageContainer: {
        flex: 1,
        marginRight: 10,
    },
    image_user: {
        width: 100,
        height: 100,
        borderRadius: 15,
    },
    image_work: {
        width: 15,
        height: 15,
    },
    container_texte: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
});