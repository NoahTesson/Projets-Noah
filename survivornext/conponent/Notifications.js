import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue } from 'firebase/database'
 
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
});

const firebaseConfig = {
    apiKey: "AIzaSyAZqEU3w7ooLSb2orNbqQy3jXcAaC7VXyk",
    authDomain: "databasetrombi-3f499.firebaseapp.com",
    projectId: "databasetrombi-3f499",
    storageBucket: "databasetrombi-3f499.appspot.com",
    messagingSenderId: "248539128989",
    appId: "1:248539128989:web:f1626524a5f5109547a074",
    databaseURL: "https://databasetrombi-3f499-default-rtdb.europe-west1.firebasedatabase.app"
};

initializeApp(firebaseConfig);

const db = getDatabase();

export default function NotificationsApp() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    const [previousData, setPreviousData] = useState(null);
    const dbRef = ref(db, '/');

    useEffect(() => {
        const handleDataChange = async (snapshot) => {
            const dataFromFirebase = snapshot.val();

            if ((JSON.stringify(dataFromFirebase) !== JSON.stringify(previousData))) {
                setPreviousData(dataFromFirebase);
                const keys = Object.keys(dataFromFirebase);
                const lastKey = keys[keys.length - 1];
                const lastEntry = dataFromFirebase[lastKey];
                if (lastEntry.state === false) {
                    await schedulePushNotification(lastEntry.title, lastEntry.body);
                    set(ref(db, lastEntry.title), {
                        title: lastEntry.title,
                        body: lastEntry.body,
                        state: true,
                    });
                }
            }
        };
    
        const unsubscribe = onValue(dbRef, handleDataChange);
    
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        });
    
        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return null;
}

async function schedulePushNotification(title, body) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: body
        },
        trigger: { seconds: 2 },
    });
}

async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync({ projectId: '7d6cb316-b100-4c27-82b4-4ec0303fcb1f' })).data;
    } else {
        alert('Must use physical device for Push Notifications');
    }
    return token;
}