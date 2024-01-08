import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

const CoinFlip = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState('');

  const flipCoin = () => {
    if (isFlipping) return;

    setIsFlipping(true);
    
    setTimeout(() => {
      const randomResult = Math.random() < 0.5 ? 'Pile' : 'Face';
      setResult(randomResult);
      setIsFlipping(false);
    }, 1000);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={flipCoin}>
        <Animatable.View
          animation={isFlipping ? 'flipInY' : null}
          iterationCount={isFlipping ? 1 : undefined}
          style={{
            width: 200,
            height: 200,
            backgroundColor: 'gold',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
          }}
        >
          {isFlipping ? (
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>...</Text>
          ) : (
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{result}</Text>
          )}
        </Animatable.View>
      </TouchableOpacity>
    </View>
  );
};

export default CoinFlip;
