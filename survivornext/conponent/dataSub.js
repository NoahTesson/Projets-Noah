import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

import DataUserModal from "./Modals/ModaldataUser";

export default function DataSub(props) {
    const [dataUserModal, setdataUserModal] = useState(false);

    return (
        <TouchableOpacity style={styles.container} onPress={() => {setdataUserModal(true)}}>
            {
                dataUserModal === true ? (
                    <DataUserModal key={props.item.id} changeModalDataUser={(value) => {setdataUserModal(value)}} item={props.item} work={props.item.work} birthday={props.item.birth_date} dataUserModal={dataUserModal}/>
                ) : null
            }
            <View style={styles.imageContainer}>
                {props.item.image && <Image style={styles.image} source={props.item.image} />}
            </View>
            <View style={styles.texte_data}>
                <Text>{props.item.name} {props.item.surname}</Text>
                <Text >{props.item.work}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    imageContainer: {
        flex: 1,
        marginRight: 10,
    },
    image: {
        width: 65,
        height: 65,
        borderRadius: 15,
    },
    texte_data: {
        flex: 2,
    },
});
