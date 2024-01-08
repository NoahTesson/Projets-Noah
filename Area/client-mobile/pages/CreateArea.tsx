import React, { useState, useContext, useEffect, useMemo, useCallback } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native'

import ComponentNameArea from '../components/ComponentNameArea';
import ComponentAddApp from '../components/ComponentAddApp';

import MenuChooseApp from '../components/MenuChooseApp';
import ActionChoosen, { ItemProps, nullData } from '../components/ActionChoosen';
import ReactionChoosen from '../components/ReactionChoosen';
import { ThemeContext  }from '../Services/ThemeContext';
import GetTheme from '../Services/GetTheme';
import ModalCreateArea from '../components/ModalCreateArea'
import { CreateAreaScreenProps } from '../types';
import SupprimerIcon from '../svg/Supprimer';

const CreateAreaScreen: React.FC< CreateAreaScreenProps > = ({ navigation }) => {
    const theme = useContext(ThemeContext);
    const [colorTheme, setColorTheme] = useState<{backgroundColor: string; color: string; colorButton: string}>();
    const toast = useToast();
    const [nameArea, setNameArea] = useState('');
    const [dataApi, setDataAPI] = useState([]);

    const [stateMenuChooseAppAction, setStateMenuChooseAppAction] = useState(false);
    const [stateMenuChooseAppReaction, setStateMenuChooseAppReaction] = useState(false);

    const [stateAppliActionChoosen, setStateAppliActionChoosen] = useState(false);
    const [dataAppliActionChoosen, setDataAppliActionChoosen] = useState<ItemProps>(nullData);
    const [actionChoosen, setActionChoosen] = useState('');
    const [modalVisibleAction, setModalVisibleAction] = useState(false);
    const [actionToken, setActionToken] = useState('');

    const [stateAppliReactionChoosen, setStateAppliReactionChoosen] = useState(false);
    const [dataAppliReactionChoosen, setDataAppliReactionChoosen] = useState<ItemProps>(nullData);
    const [reactionChoosen, setReactionChoosen] = useState('');
    const [modalVisibleReaction, setModalVisibleReaction] = useState(false);
    const [reactionToken, setReactionToken] = useState('');

    useEffect(() => {
        if (actionChoosen !== '' && actionChoosen !== 'null') {
            if (dataAppliActionChoosen.name !== 'Linkedin' && dataAppliActionChoosen.name !== 'Trello')
                setModalVisibleAction(true);
            else
                setActionToken('null');
        }
    }, [actionChoosen])

    useEffect(() => {
        if (reactionChoosen !== '' && reactionChoosen !== 'null') {
            if (dataAppliReactionChoosen.name !== 'Linkedin' && dataAppliActionChoosen.name !== 'Trello')
                setModalVisibleReaction(true);
            else
                setReactionToken('null');
        }
    }, [reactionChoosen])
    
    const stateBtnArea = useMemo(() => {
        if (actionToken !== '' && reactionToken !== '' && nameArea !== '') {
            return false;
        } else
            return true;
    }, [actionToken, reactionToken]);

    useEffect(() => {
        if (theme) {
            const tmp = GetTheme(theme?.theme);
            setColorTheme(tmp);
        }
    }, [theme]);

    useFocusEffect(
        useCallback(() => {
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
        }, [])
    );

    return (
        <View style={[styles.containerArea, { backgroundColor: colorTheme?.backgroundColor }]}>
            <ComponentNameArea nameArea={nameArea} setNameArea={setNameArea}/>
            <View style={styles.container}>
                {
                    !stateAppliActionChoosen && actionChoosen === '' && nameArea !== '' ? (
                        <ComponentAddApp setMenuChooseApp={setStateMenuChooseAppAction} colorTheme={colorTheme}/>
                    ) : null
                }
                {stateMenuChooseAppAction && <MenuChooseApp dataApi={dataApi} setDisplayAction={setStateMenuChooseAppAction} setAppliAction={setStateAppliActionChoosen} setDataAction={setDataAppliActionChoosen} type={"Reaction"}/>}
                {stateAppliActionChoosen && <ActionChoosen item={dataAppliActionChoosen} setMenuChooseApp={setStateMenuChooseAppAction} setActionChoosen={setActionChoosen}/>}

                {
                    !stateAppliReactionChoosen && actionChoosen !== 'null' && actionChoosen !== '' && actionToken !== '' ? (
                        <ComponentAddApp setMenuChooseApp={setStateMenuChooseAppReaction} colorTheme={colorTheme}/>
                    ) : null
                }
                {stateMenuChooseAppReaction && <MenuChooseApp  dataApi={dataApi} setDisplayAction={setStateMenuChooseAppReaction} setAppliAction={setStateAppliReactionChoosen} setDataAction={setDataAppliReactionChoosen} type={"Action"}/>}
                {stateAppliReactionChoosen && <ReactionChoosen item={dataAppliReactionChoosen} setMenuChooseApp={setStateMenuChooseAppReaction} setActionChoosen={setReactionChoosen} />}
            

                <ModalCreateArea item={dataAppliActionChoosen} isvisible={modalVisibleAction} setModalVisible={setModalVisibleAction} actionToken={actionToken} setActionToken={setActionToken} actionChoosen={actionChoosen}/>
                <ModalCreateArea item={dataAppliReactionChoosen} isvisible={modalVisibleReaction} setModalVisible={setModalVisibleReaction} actionToken={reactionToken} setActionToken={setReactionToken} actionChoosen={reactionChoosen}/>


                <TouchableOpacity
                        style={[styles.buttonCreateArea, stateBtnArea ? { opacity: 0.5 } : { opacity: 1 }, stateMenuChooseAppAction ? { display: 'none' } : null, stateMenuChooseAppReaction ? { display: 'none' } : null]}
                        disabled={stateBtnArea}
                        onPress={async() => {
                            const token = await AsyncStorage.getItem('token')
                            axios.post(`${theme?.urlBack}areas/create`, {
                                "title": nameArea,
                                "triggerId": actionChoosen,
                                "actionId": reactionChoosen,
                                "triggerToken": actionToken,
                                "actionToken": reactionToken
                            }, {
                                headers: {
                                    "X-Authorization-Key": token
                                },
                            })
                                .then(response => {
                                    toast.show('Area created', {
                                        type: 'success',
                                        duration: 1000,
                                        offset: 200,
                                    });
                                    setNameArea('')
                                    setStateAppliActionChoosen(false);
                                    setDataAppliActionChoosen(nullData);
                                    setActionChoosen('');
                                    setModalVisibleAction(false);
                                    setActionToken('');
                                    setStateAppliReactionChoosen(false);
                                    setDataAppliReactionChoosen(nullData);
                                    setReactionChoosen('');
                                    setModalVisibleReaction(false);
                                    setReactionToken('');
                                })
                                .catch(error => {
                                    toast.show('Error: please try again', {
                                        type: 'danger',
                                        duration: 1000,
                                        offset: 200,
                                    });
                                });
                        }}
                    >
                        <Text style={{ fontSize: 23, color: colorTheme?.colorButton, fontWeight: 'bold'}}>Create Area</Text>
                </TouchableOpacity>
                <SupprimerIcon
                    isButton={true} 
                    size={30} 
                    color='#722322' 
                    onPress={() => {
                        setNameArea('')
                        setStateAppliActionChoosen(false);
                        setDataAppliActionChoosen(nullData);
                        setActionChoosen('');
                        setModalVisibleAction(false);
                        setActionToken('');
                        setStateAppliReactionChoosen(false);
                        setDataAppliReactionChoosen(nullData);
                        setReactionChoosen('');
                        setModalVisibleReaction(false);
                        setReactionToken('');
                    }} 
                    style={[styles.delIcon, stateMenuChooseAppAction ? { display: 'none' } : null, stateMenuChooseAppReaction ? { display: 'none' } : null]}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerArea: {
        flex: 1,
    },
    container: {
        flex: 6,
        alignItems: 'center',
    },
    text_input: {
        height: 54,
        width: 327,
        padding: 10,
        borderRadius: 25,
        backgroundColor: '#D9D9D9',
    },
    buttonCreateArea: {
        zIndex: 0,
        position: 'absolute',
        top: '85%',
        height: '10%',
        width: '50%',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0066FF',
    },
    research: {
        flex: 1,
        fontSize: 15,
        marginLeft: '3%'
    },
    shadow: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    delIcon: {
        zIndex: 0,
        position: 'absolute',
        top: '87%',
        right: '8%',
    }
});

export default CreateAreaScreen;