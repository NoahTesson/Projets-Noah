import * as Location from 'expo-location';

const getLocalisation = async (changecoord) => {
    try {
      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const { latitude, longitude } = location.coords;
      changecoord(latitude, longitude);
    } catch (error) {
      
    }
};

export default getLocalisation;