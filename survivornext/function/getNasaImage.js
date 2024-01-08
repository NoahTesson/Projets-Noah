import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Image } from "expo-image";

const SpaceImage = () => {
  const [spaceImage, setSpaceImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSpaceImage();
  }, []);

  const fetchSpaceImage = async () => {
    try {
      const response = await axios.get(
        'https://api.nasa.gov/planetary/apod?api_key=oYYYFEfOmswmp4cH0CP9Km1fFDIHSi8si2njgW7O'
      );

      if (response.data) {
        setSpaceImage(response.data);
      }
    } catch (error) {
      console.error('Error fetching space image:', error);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={{ uri: spaceImage.hdurl }}
        style={{ width: '100%', height: '100%', borderRadius: 30}}
      />
    </View>
  );
};

export default SpaceImage;
