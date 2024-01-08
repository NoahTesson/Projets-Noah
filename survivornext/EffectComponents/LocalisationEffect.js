import React, { useState, useEffect } from "react";
import * as Location from 'expo-location';

function LocalisationEffect({ onDataLoaded, localisation }) {
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = 
            await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            onDataLoaded(location);
        })();
    }, [localisation]);

    return null;
}

export default LocalisationEffect;