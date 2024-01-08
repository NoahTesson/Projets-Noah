import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import { COLOR_TEXT_BUTTON, MAIN_COLOR } from '../Variable'

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      Alert.alert('Fin du jeu!', `Joueur ${winner} a gagné!`, [{ text: 'Recommencer', onPress: resetGame }]);
    } else if (board.every((cell) => cell !== null)) {
      Alert.alert('Fin du jeu!', 'Egalité!', [{ text: 'Recommencer', onPress: resetGame }]);
    }
  }, [board]);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (index) => (
    <TouchableOpacity style={styles.square} onPress={() => handleClick(index)}>
      <Text style={styles.squareText}>{board[index]}</Text>
    </TouchableOpacity>
  );

  const getStatus = () => {
    const winner = calculateWinner(board);
    if (winner) {
      return `Joueur ${winner} a gagné!`;
    } else if (board.every((cell) => cell !== null)) {
      return 'Egalité!';
    } else {
      return `Prochain joueur: ${xIsNext ? 'X' : 'O'}`;
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{getStatus()}</Text>
      <View style={styles.board}>
        <View style={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>
      <TouchableOpacity style={styles.restartButton} onPress={resetGame}>
        <Text style={styles.restartButtonText}>Recommencer</Text>
      </TouchableOpacity>
    </View>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    fontSize: 24,
    marginBottom: 20,
  },
  board: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  squareText: {
    fontSize: 32,
  },
  restartButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: MAIN_COLOR,
    borderRadius: 5,
  },
  restartButtonText: {
    fontSize: 18,
    color: COLOR_TEXT_BUTTON,
  },
});

export default TicTacToe;
