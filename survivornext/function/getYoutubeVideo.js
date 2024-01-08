import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { WebView } from 'react-native-webview';

const YoutubeVideo = () => {
    const [url, setUrl] = useState('https://www.google.com');
  
    const loadUrl = () => {
      if (!url.startsWith('https://')) {
        setUrl('https://' + url);
      }
    };
  
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
          <TextInput
            style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, marginRight: 10 }}
            onChangeText={(text) => setUrl(text)}
            value={url}
          />
          <Button title="Go" onPress={loadUrl} />
        </View>
        <WebView source={{ uri: url }} style={{ flex: 1 }} />
      </View>
    );
  };
  
  export default YoutubeVideo;
  