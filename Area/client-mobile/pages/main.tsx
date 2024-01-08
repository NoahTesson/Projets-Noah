import React, { useContext, useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, ScrollView, Text, RefreshControl } from 'react-native';
import { Image } from 'expo-image';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useToast } from 'react-native-toast-notifications';
import Checkbox from 'expo-checkbox';

import { MainScreenProps } from '../types';
import { ThemeContext  }from '../Services/ThemeContext';
import GetTheme from '../Services/GetTheme';
import AreaToDiplay from '../components/AreaToDisplay';

import getServicesActions from '../functions/getServices';

type AreaObject = {
    id: string,
    plateform: string,
    action: string
}

type AreaDbObject = {
    id: string,
    name: string,
    action: string,
    error: string
}

type AreaObj = {
    id: string,
    action_id: string,
    trigger_id: string,
    title: string,
}

interface CheckBoxData {
    id: number;
    label: string;
    isChecked: boolean;
}

const MainScreen: React.FC< MainScreenProps > = ({ navigation }) => {
    const theme = useContext(ThemeContext);
    const toast = useToast();
    const [colorTheme, setColorTheme] = useState<{backgroundColor: string;color: string;}>();
    const [areas, setAreas] = useState<AreaObj[]>([]);
    const [actionPossibilities, setActionPossibilities] = useState<AreaObject[]>([]);
    const [reactionPossibilities, setReactionPossibilities] = useState<AreaObject[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [stateFilter, setStateFilter] = useState(false);
    const [checkBoxes, setCheckBoxes] = useState<CheckBoxData[]>([]);

    useEffect(() => {
        if (theme) {
            const tmp = GetTheme(theme?.theme);
            setColorTheme(tmp);
        }
    }, [theme]);

    const getAreasRefreshing = useCallback(async () => {
        setRefreshing(true);
        const token = await AsyncStorage.getItem('token');
        axios.get(`${theme?.urlBack}areas/listByUser`, {
            headers: {
                "X-Authorization-Key": token
            }
        })
            .then((resp) => {
                if (resp.data.status !== 'empty') {
                    setAreas(resp.data);
                    toast.show('Loading finished successfully', {
                        type: 'success',
                        duration: 1000,
                        offset: 200,
                    });
                } else {
                    setAreas([]);
                }
            })
            .catch((err) => {
                console.log(err)
                toast.show('Error during loading', {
                    type: 'danger',
                    duration: 1000,
                    offset: 200,
                });
            })
            .finally(() => {
                setRefreshing(false);
            })
    }, []);

    const getAreas = useCallback(async () => {
        const token = await AsyncStorage.getItem('token');
        axios.get(`${theme?.urlBack}areas/listByUser`, {
            headers: {
                "X-Authorization-Key": token
            }
        })
            .then((resp) => {
                if (resp.data.status !== 'empty') {
                    setAreas(resp.data);
                } else {
                    setAreas([]);
                }
            })
            .catch((err) => {
            })
    }, []);

    useFocusEffect(
        useCallback(() => {
            getAreas();
        }, [])
    );

    const getPossibleAreasFromPlateform = async (service: string, type: string) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const resp = await axios.post(`${theme?.urlBack}areas/getServicesActions`, {
                type: type,
                name: service,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "X-Authorization-Key": token
                }
            });
            return resp.data;
        } catch (error) {
            console.log("Error areas/getServicesActions: ", error);
            return;
        }
    }
    
    // nom de l'action id: ('trigger_id')
    const getActionItemById = (id: string): AreaObject[] => {
        const tmp = actionPossibilities.filter((item: AreaObject) => item.id === id);
        return tmp;
    }
    // nom de la reaction id: ('trigger_id')
    const getReactionItemById = (id: string): AreaObject[] => {
        const tmp = reactionPossibilities.filter((item: AreaObject) => item.id === id);
        return tmp;
    }

    useEffect(() => {
        const fetchData = async () => {
            const token = await AsyncStorage.getItem('token');
            axios.post(`${theme?.urlBack}areas/getServices`, { 'type': 'Action'}, { 
                headers: {
                    "X-Authorization-Key": token
                }
            })
                .then((response) => {
                    response.data.map(async (item: string) => {
                        const areaObjectResp = await getPossibleAreasFromPlateform(item, 'Action');
                        areaObjectResp.map((item: AreaDbObject) => {
                            const tab: AreaObject = {
                                id: item.id || '-1',
                                plateform: item.name || "error",
                                action: item.action || "error"
                            }
                            setActionPossibilities((prevActionPossibilities) => [...prevActionPossibilities, tab]);
                        });
                    });
                })
                .catch((error) => {
                    console.log("Error: areas/getServices: ", error.message);
                })

            axios.post(`${theme?.urlBack}areas/getServices`, { 'type': 'Reaction' }, { 
                headers: {
                    "X-Authorization-Key": token
                }
            })
                .then((response) => {
                    response.data.map(async (item: string) => {
                        const areaObjectResp = await getPossibleAreasFromPlateform(item, 'Reaction');
                        areaObjectResp.map((item: AreaDbObject) => {
                            const tab: AreaObject = {
                                id: item.id || '-1',
                                plateform: item.name || "error",
                                action: item.action || "error"
                            }
                            setReactionPossibilities((prevActionPossibilities) => [...prevActionPossibilities, tab]);
                        });
                    })
                })
                .catch((error) => {
                    console.log("Error: areas/getServices: ", error.message);
                })
        };
        fetchData();
    }, []);

    const toggleCheckBox = (id: number) => {
        const updatedCheckBoxes = checkBoxes.map((checkbox) =>
          checkbox.id === id
            ? { ...checkbox, isChecked: !checkbox.isChecked }
            : checkbox
        );
        setCheckBoxes(updatedCheckBoxes);
    };

    return (
        <View style={[styles.container, { backgroundColor: colorTheme?.backgroundColor }]}>
            <View style={styles.searchSection}>
                <Image
                    source={require('../assets/chercher.png')}
                    style={{ width: 20, height: 20, position: 'relative', left: '30%', zIndex: 2 }}
                />
                <TextInput
                    style={[styles.TextInput_research, styles.shadow]}
                    placeholder="search"
                    placeholderTextColor="grey"
                    returnKeyType="search"
                />
                <TouchableOpacity
                    onPress={() => {
                        setStateFilter((preview) => !preview);
                        if (!stateFilter) {
                            getServicesActions(theme?.urlBack, checkBoxes)
                                .then((response) => {
                                    setCheckBoxes(response);
                                })
                                .catch((err) => {})
                        }
                    }}
                >
                    <Image
                        source={require('../assets/filtre.png')}
                        style={{ width: 20, height: 20, position: 'relative', right: '140%' }}
                    />
                </TouchableOpacity>
            </View>
            {
                    stateFilter ? (
                        <View style={[styles.filter, { borderColor: colorTheme?.color }]}>
                            <ScrollView
                                style={{ marginTop: 20 }}
                                contentContainerStyle={styles.scrollCheckBox}
                            >
                                {
                                    checkBoxes.map((checkbox) => (
                                        <View key={checkbox.id} style={styles.container_checkbox}>
                                            <Checkbox
                                                style={styles.checkbox}
                                                value={checkbox.isChecked}
                                                onValueChange={() => toggleCheckBox(checkbox.id)}
                                                color={checkbox.isChecked ? '#0066FF' : undefined}
                                                />
                                            <Text >{checkbox.label}</Text>
                                        </View>
                                    ))
                                }
                            </ScrollView>
                        </View>    
                    ) : null
            }
            <View style={[styles.pageContent, { backgroundColor: colorTheme?.backgroundColor }]}>
                    {
                        areas.length === 0 ? (
                            <Text style={{ color: colorTheme?.color, textAlign: 'center', fontWeight: 'bold', marginTop: 10, }}>No Areas</Text>
                        ) : null
                    }
                <ScrollView 
                    contentContainerStyle={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={getAreasRefreshing} />
                    }
                >
                    {
                        areas.map((item: AreaObj, index: number) => {
                            const actionObj = getActionItemById(item.action_id);
                            const reactionObj = getReactionItemById(item.trigger_id);

                            if (actionObj[0] && reactionObj[0]) {
                                const filteredCheckboxes = checkBoxes.filter((box) => {
                                    if (box.isChecked === true)
                                        return true;
                                    return false;
                                })
                                if (filteredCheckboxes.length === 0) {
                                    return (
                                        <AreaToDiplay key={index} id={item.id} titre={item.title} service_action={actionObj[0].plateform} service_reaction={reactionObj[0].plateform} action={actionObj[0].action} reaction={reactionObj[0].action} getArea={getAreas}/>
                                    )
                                } else {
                                    const filteredAreas = filteredCheckboxes.map((box) => {
                                        if (box.label === actionObj[0].plateform || box.label === reactionObj[0].plateform) {
                                            return (
                                                <AreaToDiplay key={index} id={item.id} titre={item.title} service_action={actionObj[0].plateform} service_reaction={reactionObj[0].plateform} action={actionObj[0].action} reaction={reactionObj[0].action} getArea={getAreas}/>
                                            )
                                        }
                                        return null;
                                    })
                                    return filteredAreas;
                                }
                            }
                        })
                    }
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    TextInput_research: {
        width: '90%',
        height: 50,
        fontSize: 17,
        paddingLeft: '10%',
        borderRadius: 15,
        backgroundColor: '#98C1FE',
        position: 'relative',
    },
    searchSection: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    pageContent: {
        flex: 6,
    },
    footer: {
        width: '100%',
        height: '12%',
        backgroundColor: '#0066FF',
        flexDirection: 'row',
        paddingTop: '4%',
    },
    scrollView: {
        gap: 10,
        paddingTop: 50,
        paddingBottom: 50,
        alignItems: 'center',
    },
    shadow: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    filter: {
        alignSelf: 'center',
        width: '90%',
        height: 150,
        borderWidth: 1,
        borderRadius: 20,
    },
    checkbox: {
        margin: 8,
    },
    container_checkbox: {
        width: 100,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    scrollCheckBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 20,
        justifyContent: 'center',
    }
});

export default MainScreen;