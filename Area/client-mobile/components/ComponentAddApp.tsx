import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Image } from 'expo-image';

type ContainerPlusProps = {
    setMenuChooseApp: React.Dispatch<React.SetStateAction<boolean>>;
    colorTheme: {backgroundColor: string;color: string;} | undefined;
}

const ComponentAddApp: React.FC< ContainerPlusProps > = ({ setMenuChooseApp, colorTheme }) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <TouchableOpacity 
                style={styles.containerPlus}
                onPress={() => setMenuChooseApp(true)}
                >
                <Image source={require('../assets/plus.png')} style={{ width: 25, height: 25}} />
            </TouchableOpacity>
            <Text style={{ color: colorTheme?.color, fontWeight: 'bold', fontSize: 15, marginTop: '3%' }}>Add application</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    containerPlus: {
        width: 50,
        height: 50,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D9D9D9',
    },
});

export default ComponentAddApp;