import React, { useContext, useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import Footer from '../components/Footer';
import { MainLayoutProps } from '../types';
import { ThemeContext  }from '../Services/ThemeContext';
import GetTheme from '../Services/GetTheme';

const MainLayout: React.FC< MainLayoutProps > = ({ children, navigation }) => {
    const theme = useContext(ThemeContext);
    const [colorTheme, setColorTheme] = useState<{backgroundColor: string;color: string;}>();

    useEffect(() => {
        if (theme) {
            const tmp = GetTheme(theme?.theme);
            setColorTheme(tmp);
        }
    }, [theme]);

    return (
        <View style={styles.container}>
            <View style={[styles.header, { backgroundColor: colorTheme?.backgroundColor, }]}>
                <Image source={require('../assets/logo_blue.png')} style={styles.logo_blue}/>
            </View>
        
            <View style={styles.content}>
                {children}
            </View>
            
            <Footer navigation={navigation}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    header: {
        width: '100%',
        height: '18%',
    },
    logo_blue: {
        height: 200,
        width: 200,
        marginLeft: '22%',
    },
});

export default MainLayout;
