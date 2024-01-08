import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import LeftArrowIcon from '../svg/left_arrow'

import { LoginScreenProps, SignUpScreenProps } from '../types';
import { ThemeContext  }from '../Services/ThemeContext';
import GetTheme from '../Services/GetTheme';

const Header: React.FC< LoginScreenProps | SignUpScreenProps> = ({ navigation }) => {
    const theme = useContext(ThemeContext);
    const [colorTheme, setColorTheme] = useState<{backgroundColor: string;color: string;}>();
    
    useEffect(() => {
        if (theme) {
            const tmp = GetTheme(theme?.theme);
            setColorTheme(tmp);
        }
    }, [theme]);

    return (
        <View style={[styles.container, { backgroundColor: colorTheme?.backgroundColor }]}>
            <LeftArrowIcon isButton={true} color={colorTheme?.color} onPress={() => navigation.goBack()} style={styles.backButton}/>
            <Image source={require('../assets/logo_blue.png')} style={styles.image_logo}/>
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
        height: '17%',
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        left: '8%',
        top: '55%',
    },
    image_logo: {
        height: 100,
        width: 200,
    },
});

export default Header;