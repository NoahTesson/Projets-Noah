import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { BACKGROUND_COLOR } from './Variable';

import LoginPage from './conponent/Pages/login'
import HomePage from './conponent/Pages/home'
import getInfoEmployeMe from './function/getinfoEmployeme'

import WeatherEffect from './EffectComponents/weatherEffect'
import LocalisationEffect from './EffectComponents/LocalisationEffect';
 
export default function App() {
    const [navigation, setNavigation] = useState("Login")
    const [dataWeather, setDataWeather] = useState([]);
    const [localisation, setLocalisation] = useState([]);
    const [dataEmploye, setDataEmploye] = useState([]);

    useEffect(() => {
        const getDatasMe = async () => {
            await getInfoEmployeMe(setDataEmploye);
        }
        getDatasMe();
    }, []);

    return (
        <View style={styles.container}>
            <LocalisationEffect onDataLoaded={(loadedData) => {setLocalisation(loadedData)}} localisation={localisation} /> 
            <WeatherEffect onDataLoaded={(loadedData) => {setDataWeather(loadedData)}} />
            {
                navigation === "Login" ? (
                    <LoginPage updNav={(value) => {setNavigation(value)}}/>
                ) : null
            }
            {
                navigation === "Home" ? (
                    <HomePage updNav={(value) => {setNavigation(value)}} dataWeather={dataWeather} localisation={localisation} dataEmploye={dataEmploye}/>
                ) : null
            }
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
});
