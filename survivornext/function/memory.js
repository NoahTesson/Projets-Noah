import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';

import { MAIN_COLOR } from '../Variable'

const generateCards = () => {
  const name = ['Rouge', 'Vert', 'Bleu', 'Orange', 'Jaune', 'Rose', 'Violet', 'Cyan'];
  const cards = [...name, ...name];
  return cards.sort(() => Math.random() - 0.5);
};

const MemoryGame = () => {
  const [cards, setCards] = useState(generateCards());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [solvedPairs, setSolvedPairs] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [index1, index2] = flippedIndices;
      if (cards[index1] === cards[index2]) {
        setSolvedPairs([...solvedPairs, cards[index1]]);
      }
      setTimeout(() => {
        setFlippedIndices([]);
      }, 1000);
    }
  }, [flippedIndices]);

  useEffect(() => {
    if (solvedPairs.length === cards.length / 2) {
      setIsGameOver(true);
    }
  }, [solvedPairs]);

  const handleCardPress = (index) => {
    if (flippedIndices.length === 2 || solvedPairs.includes(cards[index]) || isGameOver) {
      return;
    }
    setFlippedIndices((prev) => [...prev, index]);
  };

  const handleRestart = () => {
    setCards(generateCards());
    setFlippedIndices([]);
    setSolvedPairs([]);
    setIsGameOver(false);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.card, flippedIndices.includes(index) || solvedPairs.includes(item) ? styles.cardOpen : null]}
      onPress={() => handleCardPress(index)}
    >
      {flippedIndices.includes(index) || solvedPairs.includes(item) ? (
        <Text style={styles.cardText}>{item}</Text>
      ) : null}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isGameOver ? (
        <View>
          <Text style={styles.gameOverText}>Victoire!</Text>
          <TouchableOpacity onPress={handleRestart}>
            <Text style={styles.restartButton}>Recommencer</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={cards}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={4}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 80,
    height: 80,
    backgroundColor: 'lightgray',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardOpen: {
    backgroundColor: 'white',
  },
  cardText: {
    fontSize: 20,
  },
  gameOverText: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
  restartButton: {
    fontSize: 24,
    backgroundColor: MAIN_COLOR,
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
  },
});

export default MemoryGame;
