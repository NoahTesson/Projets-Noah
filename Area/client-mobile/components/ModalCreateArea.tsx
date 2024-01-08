import React, { useState, useEffect, useContext } from 'react'
import { View, Modal, Text, StyleSheet, TouchableOpacity, TextInput, Platform, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import ModalDropdown from 'react-native-modal-dropdown';
import WebView from 'react-native-webview';
import DateTimePicker from '@react-native-community/datetimepicker';

import { ThemeContext  }from '../Services/ThemeContext';
import GetTheme from '../Services/GetTheme';

type ItemProps = {
    name: string,
    couleur: string,
    component: React.JSX.Element | null;
}

type ModalCreateAreaProps = {
    item: ItemProps;
    isvisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    actionToken: string;
    setActionToken: React.Dispatch<React.SetStateAction<string>>;
    actionChoosen: string;
}

const ModalCreateArea: React.FC<ModalCreateAreaProps> = ({ item, isvisible, setModalVisible, actionToken, setActionToken, actionChoosen }) => {
    const theme = useContext(ThemeContext);
    const [colorTheme, setColorTheme] = useState<{backgroundColor: string; color: string; colorButton: string}>();

    useEffect(() => {
        if (theme) {
            const tmp = GetTheme(theme?.theme);
            setColorTheme(tmp);
        }
    }, [theme]);

    useEffect(() => {
        setActionToken('')
    }, [item]);

    useEffect(() => {
        if (item.name === "Twitter" && actionChoosen.toString() === '12') {
            setActionToken('aps besoin histoire de remplie')
            setModalVisible(false)
        }
    })

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isvisible}
        >
            <View style={styles.modalContainer}>
                <View style={[styles.modalContent, { backgroundColor: colorTheme?.color }]}>
                    <Text style={{ color: colorTheme?.backgroundColor}}>{item.name}</Text>
                    <DataModalCreateArea name={item.name} data={actionToken} setActionToken={setActionToken} actionChoosen={actionChoosen}/>
                    <View style={styles.container_buttons}>
                        <TouchableOpacity
                            onPress={() => {
                                setActionToken('')
                                setModalVisible(false)
                            }}
                            style={[styles.button, { borderRightWidth: 1, borderColor: colorTheme?.backgroundColor }]}
                        >
                            <Text style={{ color: colorTheme?.backgroundColor}}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setActionToken(actionToken)
                                setModalVisible(false)
                            }}
                            style={[styles.button, { borderLeftWidth: 1, borderColor: colorTheme?.backgroundColor }]}
                        >
                            <Text style={{ color: colorTheme?.backgroundColor}}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    modalContent: {
        width: '80%',
        height: '20%',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        paddingLeft: 10,
        borderColor: 'gray',
        color: 'white',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container_buttons: {
        width: '100%',
        height: '15%',
        flexDirection: 'row',
    },
    picker: {
        bottom: 80,
    },
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

type DataModalCreateAreaProps = {
    name: string;
    data: string;
    setActionToken: React.Dispatch<React.SetStateAction<string>>;
    actionChoosen: string;
}

type guildProps = {
    name: string;
    id: string;
}

const DataModalCreateArea: React.FC<DataModalCreateAreaProps> = ({ name, data, setActionToken, actionChoosen }) => {
    const theme = useContext(ThemeContext);
    const [guildDiscord, setGuildDiscord] = useState<guildProps[]>([])
    const [organisation, setOrganisation] = useState([]);
    const [linkDiscord, setLinkDiscord] = useState(false);
    const [stateWebView, setStateWebView] = useState(false);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const fetchdata = async () => {
            const token = await AsyncStorage.getItem('token');
            axios.get(`${theme?.urlBack}api/discord/getGuilds`, {
                headers: {
                    "X-Authorization-Key": token
                }
            })
                .then((response) => {
                    setGuildDiscord(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        if (name === "Discord")
            fetchdata();
    }, []);

    useEffect(() => {
        const fetchdata = async () => {
            const token = await AsyncStorage.getItem('token');
            axios.get(`${theme?.urlBack}api/trello/getOrganization`, {
                headers: {
                    "X-Authorization-Key": token
                }
            })
                .then((response) => {
                    console.log(response.data)
                    setOrganisation(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        if (name === "Trello")
            fetchdata();
    }, []);



    if (name === "Discord") {
        if (Platform.OS === 'android') {
            return (
                <>
                    <ModalDropdown
                        defaultIndex={0}
                        initialScrollIndex={0}
                        options={guildDiscord.map((item: guildProps) => (
                            item.name
                            ))}
                            onSelect={(index: number) => {
                                setActionToken(guildDiscord[index].id);
                            }}
                            defaultValue={'Select server...'}
                            textStyle={{ color: "white" }}
                    />
                    <Modal
                        visible={linkDiscord}
                    >
                        <View style={{ flex: 1 }}>
                            <View style={styles.webview}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setLinkDiscord(false);
                                    }}
                                    style={{ backgroundColor: 'white', opacity: 1, padding: 10 }}
                                >
                                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#3C71DA' }}>Annuler</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 8 }}>
                                <WebView
                                    onNavigationStateChange={(navState) => {
                                        if (navState.url.includes(`localhost:8081/?token=`)) {
                                            setLinkDiscord(false);
                                        }
                                    }}
                                    source={{ uri: `https://discord.com/api/oauth2/authorize?client_id=1155453684822581319&permissions=8&scope=bot` }}
                                />
                            </View>
                        </View>
                    </Modal>
                    <Text style={{color: 'blue'}}
                        onPress={() => setLinkDiscord(true)}>
                        This bot needs to be in your server: 
                    </Text>
                </>
            )
        } else {
            return (
                <>
                    <View style={{ width: '90%', height: 70, overflow: 'hidden', borderRadius: 8, borderColor: 'gray', borderWidth: 1 }}>
                        <Picker
                            selectedValue={data}
                            style={styles.picker}
                            onValueChange={(value) => setActionToken(value)}
                        >
                            {
                                guildDiscord.map((item: guildProps, index) => (
                                    <Picker.Item key={index} label={item.name} value={item.id} color="white"/>
                                    ))
                                }
                        </Picker>
                    </View>
                    <Modal
                        visible={linkDiscord}
                    >
                        <View style={{ flex: 1 }}>
                            <View style={styles.webview}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setLinkDiscord(false);
                                    }}
                                    style={{ backgroundColor: 'white', opacity: 1, padding: 10 }}
                                >
                                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#3C71DA' }}>Annuler</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 8 }}>
                                <WebView
                                    onNavigationStateChange={(navState) => {
                                        if (navState.url.includes(`localhost:8081/?token=`)) {
                                            setLinkDiscord(false);
                                        }
                                    }}
                                    source={{ uri: `https://discord.com/api/oauth2/authorize?client_id=1155453684822581319&permissions=8&scope=bot` }}
                                />
                            </View>
                        </View>
                    </Modal>
                    <Text style={{color: 'blue'}}
                        onPress={() => setLinkDiscord(true)}>
                        Accepter le bot
                    </Text>
                </>
            )
        }
    }
    if (name === "Sheet") {
        return (
            <TextInput
                style={styles.input}
                placeholder="Enter sheet name"
                placeholderTextColor={"white"}
                value={data}
                onChangeText={(value) => setActionToken(value)}
            />
        )
    }
    if (name === "Email") {
        return (
            <TextInput
                style={styles.input}
                placeholder="Enter email adress"
                placeholderTextColor={"white"}
                value={data}
                onChangeText={(value) => setActionToken(value)}
            />
        )
    }
    if (name === "Spotify") {
        return (
            <TextInput
                style={styles.input}
                placeholder="Enter playlist / artist / track ID"
                placeholderTextColor={"white"}
                value={data}
                onChangeText={(value) => setActionToken(value)}
            />
        )
    }
    if (name === "Github") {
        if (actionChoosen.toString() === '16') {
            return (
                <>
                    <Modal
                        visible={stateWebView}
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
                            <View style={{ flex: 8 }}>
                                <WebView
                                    onNavigationStateChange={(navState) => {
                                        console.log(navState.url)
                                        if (navState.url.includes(`localhost:8081/?code=`)) {
                                            setActionToken("pour le remplir")
                                            setStateWebView(false);
                                        }
                                    }}
                                    source={{ uri: `https://github.com/apps/area-webhooks` }}
                                />
                            </View>
                        </View>
                    </Modal>
                    <Text style={{color: '#0066FF'}}
                        onPress={() => {
                            setActionToken("pour le remplir")
                            setStateWebView(true)
                        }}
                    >
                        installer Area-webhooks
                    </Text>
                </>
            )
        } else {
            return (
                <TextInput
                    style={styles.input}
                    placeholder="Enter repository name"
                    placeholderTextColor={"white"}
                    value={data}
                    onChangeText={(value) => setActionToken(value)}
                />
            )
        }
    }
    if (name === "Twitter") {
        if (actionChoosen.toString() !== '12') {
            return (
                <TextInput
                    style={styles.input}
                    placeholder="Enter twitter username"
                    placeholderTextColor={"white"}
                    value={data}
                    onChangeText={(value) => setActionToken(value)}
                />
            )
        }
    }
    if (name === "Chess") {
        return (
            <TextInput
                style={styles.input}
                placeholder="Enter username"
                placeholderTextColor={"white"}
                value={data}
                onChangeText={(value) => setActionToken(value)}
            />
        )
    }
    if (name === "Trello") {
        console.log(actionChoosen)
        if (actionChoosen.toString() === "56") {
            if (Platform.OS === 'android') {
                return (
                    <ModalDropdown
                        defaultIndex={0}
                        initialScrollIndex={0}
                        options={organisation.map((item) => (
                            item.displayName
                            ))}
                            onSelect={(index: number) => {
                                setActionToken(guildDiscord[index].id);
                            }}
                            defaultValue={'Select server...'}
                            textStyle={{ color: "white" }}
                    />
                )
            } else {
                return (
                    <View style={{ width: '90%', height: 70, overflow: 'hidden', borderRadius: 8, borderColor: 'gray', borderWidth: 1 }}>
                        <Picker
                            selectedValue={data}
                            style={styles.picker}
                            onValueChange={(value) => setActionToken(value)}
                        >
                            {
                                organisation.map((item, index) => (
                                    <Picker.Item key={index} label={item.displayName} value={item.id} color="white"/>
                                    ))
                                }
                        </Picker>
                    </View>
                )
            }
        }
        return (
            <TextInput
                style={styles.input}
                placeholder="Enter Organization name"
                placeholderTextColor={"white"}
                value={data}
                onChangeText={(value) => setActionToken(value)}
            />
        )
    }
    if (name === "Clashroyale") {
        return (
            <TextInput
                style={styles.input}
                placeholder="Enter Player Tag"
                placeholderTextColor={"white"}
                value={data}
                onChangeText={(value) => setActionToken(value)}
            />
        )
    }
    if (name === "Clashofclans") {
        return (
            <TextInput
                style={styles.input}
                placeholder="Enter Player Tag"
                placeholderTextColor={"white"}
                value={data}
                onChangeText={(value) => setActionToken(value)}
            />
        )
    }
    if (name === "Brawlstar") {
        return (
            <TextInput
                style={styles.input}
                placeholder="Enter Player Tag"
                placeholderTextColor={"white"}
                value={data}
                onChangeText={(value) => setActionToken(value)}
            />
        )
    }
    if (name === "Tft") {
        return (
            <TextInput
                style={styles.input}
                placeholder="Enter TFT Username"
                placeholderTextColor={"white"}
                value={data}
                onChangeText={(value) => setActionToken(value)}
            />
        )
    }
    if (name === "Weather") {
        return (
            <TextInput
                style={styles.input}
                placeholder="Enter city location (ex: Paris)"
                placeholderTextColor={"white"}
                value={data}
                onChangeText={(value) => setActionToken(value)}
            />
        )
    }
    if (name === "Datetime") {
        return (
            <>
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    style={{ backgroundColor: 'white' }}
                    onChange={(event, selectedDate) => {
                        const currentDate = selectedDate || date;
                        setDate(currentDate);
                        console.log(date.toString().slice(-2))
                        const upddata = date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
                        setActionToken(upddata);
                    }}
                />
                <DateTimePicker
                    testID="dateTimePicker"
                    value={time}
                    mode={'time'}
                    is24Hour={true}
                    display="default"
                    style={{ backgroundColor: 'white' }}
                    onChange={(event, selectedDate) => {
                        const currentDate = selectedDate || time;
                        setTime(currentDate)
                        const upddata = date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
                        setActionToken(upddata);
                    }}
                />
            </>
        )
    }
    if (name === "Twitch") {
        return (
            <TextInput
                style={styles.input}
                placeholder="Enter Twitch Username"
                placeholderTextColor={"white"}
                value={data}
                onChangeText={(value) => setActionToken(value)}
            />
        )
    }
    if (name === "Coingecko") {
        return (
            <TextInput
                style={styles.input}
                placeholder="Enter toggle price"
                placeholderTextColor={"white"}
                value={data}
                onChangeText={(value) => setActionToken(value)}
            />
        )
    }
}

export default ModalCreateArea;