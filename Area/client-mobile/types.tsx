import { ReactNode } from 'react';
import { NavigationProp, RouteProp } from '@react-navigation/native';

type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    SignUp: undefined;
    Main: undefined;
    Profile: undefined;
    CreateArea: undefined;
    MainLayout: undefined;
};

export type HomeScreenProps = {
    navigation: NavigationProp<RootStackParamList, 'Home'>;
};

export type LoginScreenProps = {
    navigation: NavigationProp<RootStackParamList, 'Login'>;
};

export type SignUpScreenProps = {
    navigation: NavigationProp<RootStackParamList, 'SignUp'>;
};

export type CreateAreaScreenProps = {
    navigation: NavigationProp<RootStackParamList, 'CreateArea'>;
}

export type MainScreenProps = {
    navigation: NavigationProp<RootStackParamList, 'Main'>;
};

export type ProfileScreenProps = {
    navigation: NavigationProp<RootStackParamList, 'Profile'>;
};

export type MainLayoutProps = {
    children: ReactNode;
    navigation: NavigationProp<RootStackParamList, 'Main'>;
}

export type SigninWithComponentProps = {
    name: string;
    navigation: NavigationProp<RootStackParamList, 'Home'>;
};