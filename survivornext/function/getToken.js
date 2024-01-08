import * as SecureStore from 'expo-secure-store';

const getToken = async () => {
    let result = await SecureStore.getItemAsync("token");
    if (result) {
        return result;
    } else {
        alert('No Token');
    }
}

const getDatasUser = async (id) => {
    let result = await SecureStore.getItemAsync(id);
    if (result) {
        return result;
    } else {
        return null;
    }
}

export { getToken, getDatasUser };