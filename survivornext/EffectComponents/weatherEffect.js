import { useState, useEffect } from 'react';

import getLocalisation from '../function/getLocalisation'

function WeatherEffect({ onDataLoaded }) {
    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
  
    useEffect(() => {
      const getWeather = async () => {
        if (Platform.OS === 'web' ) {
            navigator.geolocation.getCurrentPosition(function(position) {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
            });
        } else {
          getLocalisation((latitude, longitude) => {
            setLat(latitude);
            setLong(longitude);
          });
        }
        await fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=fee813d99b6d52b2ba5d814c4b8e3b95`)
        .then(res => res.json())
        .then(result => {
            onDataLoaded(result)
        });
      }
      getWeather();
    }, [lat, long]);

    return null;
}

export default WeatherEffect;