import React, {useState, useEffect, useContext} from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import AccueilIcon from '../svg/accueil';
import NapteIcon from '../svg/napte';
import UserIcon from '../svg/user';
import { ThemeContext } from '../Services/ThemeContext';
import GetTheme, { Theme } from '../Services/GetTheme';

interface FooterBarProps extends BottomTabBarProps {
}

type TabIcons = {
    [key: string]: React.ReactNode;
};

const Footer: React.FC<FooterBarProps> = ({ state, descriptors, navigation }) => {
    const theme = useContext(ThemeContext);
    const [colorTheme, setColorTheme] = useState<Theme>();
    const [witch, setWitch] = useState('Main');
    
    useEffect(() => {
        if (theme) {
            const tmp = GetTheme(theme?.theme);
            setColorTheme(tmp);
        }
    }, [theme]);

    const tabIcons: TabIcons = {
        Main: <AccueilIcon size={20} color={colorTheme?.colorButton}/>,
        CreateArea: <NapteIcon size={20} color={colorTheme?.colorButton} />,
        Profile: <UserIcon size={20} color={colorTheme?.colorButton} />,
    };

    const getIcon = (name: string, witch: string) => {
        if (name === 'Main')
            return (<AccueilIcon size={20} color={witch === 'Main' ? ('#0066FF') : colorTheme?.color}/>)
        if (name === 'CreateArea')
            return (<NapteIcon size={20} color={witch === 'CreateArea' ? ('#0066FF') : colorTheme?.color} />)
        if (name === 'Profile')
            return <UserIcon size={20} color={witch === 'Profile' ? ('#0066FF') : colorTheme?.color} />
    }

    return (
        <View style={[styles.container, { backgroundColor: colorTheme?.backgroundColor }]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel || options.title || route.name;
                const isFocused = state.index === index;

                const onPress = () => {
                    if (!isFocused) {
                        setWitch(route.name);
                        navigation.navigate(route.name);
                    }
                };
                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        style={isFocused ? styles.tabItemFocused : styles.tabItem}
                    >
                        {getIcon(route.name, witch)}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
    },
    tabItemFocused: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Footer;