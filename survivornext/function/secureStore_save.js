import * as SecureStore from 'expo-secure-store';

const save = async (token) => {
    await SecureStore.setItemAsync("token", token);
}

const saveDatasUsers = async (id, datas) => {
    await SecureStore.setItemAsync(id, datas);
}

export { save, saveDatasUsers };
