import React, { useState, useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ToastProvider } from 'react-native-toast-notifications'

import HomeScreen from './pages/home';
import LoginScreen from './pages/login';
import SignUpScreen from './pages/SignUp'
import CreateAreaScreen from './pages/CreateArea'
import MainScreen from './pages/main';
import ProfileScreen from './pages/profile';

import HeaderMain from './components/HeaderMain';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import { ThemeContext, Theme } from './Services/ThemeContext';
import Footer from './components/Footer';

export default function App() {
    const [theme, setTheme] = useState<Theme>('light');
    const [loaded, setLoaded] = useState(false);
    const [stateNewArea, setStateNewArea] = useState(false)
    const [urlBack, setUrlBack] = useState<'http://10.0.2.2:8080/' | string>('https://stirring-settling-mutt.ngrok-free.app/');

    useEffect(() => {
    const loadFonts = async () => {
        await Font.loadAsync({
            'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
            'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
            'Montserrat-Black': require('./assets/fonts/Montserrat-Black.ttf'),
            'Montserrat-BlackItalic': require('./assets/fonts/Montserrat-BlackItalic.ttf'),
            'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
            'Montserrat-BoldItalic': require('./assets/fonts/Montserrat-BoldItalic.ttf'),
            'Montserrat-ExtraBold': require('./assets/fonts/Montserrat-ExtraBold.ttf'),
            'Montserrat-ExtraBoldItalic': require('./assets/fonts/Montserrat-ExtraBoldItalic.ttf'),
            'Montserrat-ExtraLight': require('./assets/fonts/Montserrat-ExtraLight.ttf'),
            'Montserrat-ExtraLightItalic': require('./assets/fonts/Montserrat-ExtraLightItalic.ttf'),
            'Montserrat-Italic': require('./assets/fonts/Montserrat-Italic.ttf'),
            'Montserrat-LightItalic': require('./assets/fonts/Montserrat-LightItalic.ttf'),
            'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
            'Montserrat-MediumItalic': require('./assets/fonts/Montserrat-MediumItalic.ttf'),
            'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
            'Montserrat-SemiBoldItalic': require('./assets/fonts/Montserrat-SemiBoldItalic.ttf'),
            'Montserrat-Thin': require('./assets/fonts/Montserrat-Thin.ttf'),
            'Montserrat-ThinItalic': require('./assets/fonts/Montserrat-ThinItalic.ttf')
        });
        setLoaded(true);
    }

    loadFonts();
    }, [loaded])

    if (!loaded) {
        return null;
    }
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, urlBack }}>
            <ToastProvider>
                <View style={styles.container}>
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName="Home">
                            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
                            <Stack.Screen name="MainLayout" options={{ headerShown: false, animationEnabled: false }}>
                                {() => (
                                    <Tab.Navigator
                                    initialRouteName='Main'
                                    tabBar={(props) => <Footer {...props} />}
                                    screenOptions={{
                                        header: () => <HeaderMain />,
                                    }}
                                    >
                                        <Tab.Screen name="Main" component={MainScreen} />
                                        <Tab.Screen name="CreateArea" component={CreateAreaScreen} />
                                        <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
                                    </Tab.Navigator>
                                )}
                            </Stack.Screen>
                        </Stack.Navigator>
                    </NavigationContainer>
                    <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
                </View>
            </ToastProvider>
        </ThemeContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
