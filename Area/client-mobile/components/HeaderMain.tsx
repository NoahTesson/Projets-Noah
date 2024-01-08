import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { ThemeContext  }from '../Services/ThemeContext';
import GetTheme from '../Services/GetTheme';

type HeaderMainProps = {};

const HeaderMain: React.FC< HeaderMainProps > = () => {
    const theme = useContext(ThemeContext);
    const [colorTheme, setColorTheme] = useState<{backgroundColor: string;color: string;}>();
    
    useEffect(() => {
        if (theme) {
            const tmp = GetTheme(theme?.theme);
            setColorTheme(tmp);
        }
    }, [theme]);

    return (
        <View style={{ alignItems: 'center', backgroundColor: colorTheme?.backgroundColor }}>
            <Image source={require('../assets/logo_blue.png')} style={styles.logo_blue}/>
        </View>
    );
}

const styles = StyleSheet.create({
    logo_blue: {
        height: 90,
        width: 300,
        marginTop: '10%',
    },
});

export default HeaderMain;