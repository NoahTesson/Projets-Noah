import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Platform, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalDropdown from 'react-native-modal-dropdown';

import PieceReactionIcon from "../svg/pieces_reaction";
import MoinsIcon from "../svg/moins";
import axios from "axios";
import { ThemeContext } from '../Services/ThemeContext';

export type ItemProps = {
    name: string,
    couleur: string,
    component: React.JSX.Element | null;
}

type ItemPropsDB = {
    action: string;
    id: string;
}

export const nullData: ItemProps = {
    name: "",
    couleur: "",
    component: null
}

type ReactionChoosenProps = {
    item: ItemProps;
    setMenuChooseApp: React.Dispatch<React.SetStateAction<boolean>>;
    setActionChoosen: React.Dispatch<React.SetStateAction<string>>;
}

const ReactionChoosen: React.FC< ReactionChoosenProps > = ({ item, setMenuChooseApp, setActionChoosen }) => {
    const { width, height } = Dimensions.get('window');
    const theme = useContext(ThemeContext);
    const [data, setData] = useState<ItemPropsDB[]>([]);
    
    useEffect(() => {
        const fetchdata = async () => {
            setData([]);
            const token = await AsyncStorage.getItem('token');
            axios.post(`${theme?.urlBack}areas/getServicesActions`, {
                "name": item.name,
                "type": "Action",
            }, {
                headers: {
                    "X-Authorization-Key": token
                }
            })
                .then((res) => {
                    setData(res.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        fetchdata();
    }, [item]);

    return (
        <View style={[styles.containter, { bottom:  (11.4 / 100) * height} ]}>
            <PieceReactionIcon width={(82.5 / 100) * width} height={(30.4 / 100) * height} color={item?.couleur} />
            <View style={styles.container_ModifLogo}>
                <View style={styles.container_logo}>
                    {item.component}
                </View>
                <TouchableOpacity
                    style={styles.container_edit}
                    onPress={() => {
                        setActionChoosen('');
                        setMenuChooseApp(true);
                    }}
                >
                    <MoinsIcon size={20} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.container_add_action}>
                {
                    data.length > 0 ? (
                        <ModalDropdown
                            defaultIndex={0}
                            initialScrollIndex={0}
                            options={data.map((item: ItemPropsDB) => (
                                item.action
                            ))}
                            onSelect={(index: number) => {
                                if (index >= 0 && index < data.length) {
                                    setActionChoosen(data[index].id);
                                }
                            }}
                            defaultValue={'Select action...'}
                            textStyle={item.name === 'Github' || item.name === 'Email' || item.name === 'Datetime' ? { color: 'white'} : { color: 'black' }}
                        />
                    ) : null
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container_ModifLogo: {
        position: 'absolute',
        top: 90,
    },
    container_logo: {
        width: 75,
        height: 75,
        borderRadius: 100,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    container_edit: {
        position: 'absolute',
        left: 45,
        top: 50,
        borderRadius: 100,
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
    },
    container_add_action: {
        top: 200,
        position: 'absolute',
    },
    container_picker: {
        right: 170,
        width: 200,
        height: 50,
    }
});

export default ReactionChoosen;