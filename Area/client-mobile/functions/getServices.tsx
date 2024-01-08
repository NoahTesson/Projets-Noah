import React from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CheckBoxData {
    id: number;
    label: string;
    isChecked: boolean;
}

const getServicesActions = async ( urlBack: string | undefined, tab: CheckBoxData[] ) => {
    if (tab.length > 0)
        return tab
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.post(`${urlBack}areas/getServices`, {
          "type": 'Action',
        }, {
          headers: {
            "X-Authorization-Key": token
          }
        });

        const dataReaction = await getServicesReactions(urlBack);
        const dataAction = response.data;

        return mergeCheckBoxArrays(dataAction, dataReaction)
    } catch (error) {
        console.log("Error areas/getServices: ", error);
        return [];
    }
}

const getServicesReactions = async ( urlBack: string | undefined ) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.post(`${urlBack}areas/getServices`, {
          "type": 'Reaction',
        }, {
          headers: {
            "X-Authorization-Key": token
          }
        });
        return response.data;
    } catch (error) {
        console.log("Error areas/getServices: ", error);
        return [];
    }
}

const mergeCheckBoxArrays = (arr1: [], arr2: []): CheckBoxData[] => {
    const mergedArray = [...arr1, ...arr2];
    const uniqueArray = Array.from(new Set(mergedArray));

    const newTab = uniqueArray.map((item: string, index: number) => ({
        id: index,
        label: item,
        isChecked: false,
    }));

    return newTab;
}

export default getServicesActions;