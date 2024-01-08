import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';

const LatestNews = () => {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedNews, setSelectedNews] = useState(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axios.get(
            'https://newsapi.org/v2/top-headlines?country=fr&apiKey=94d4cd36ad5e41d18e22f365415d6f44'
            );

            if (response.data.articles) {
            setNews(response.data.articles);
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const openNewsWebsite = (url) => {
        setSelectedNews(url);
    };

    const renderNewsItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => openNewsWebsite(item.url)}
                style={{ padding: 16 }}
            >
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
            </TouchableOpacity>
        );
    };

    if (isLoading) {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
        );
    }

  return (
        <View style={{ flex: 1 }}>
            {selectedNews ? (
                <WebView source={{ uri: selectedNews }} />
            ) : (
                <FlatList
                data={news}
                keyExtractor={(item) => item.url}
                renderItem={renderNewsItem}
                />
            )}
        </View>
    );
};

export default LatestNews;
