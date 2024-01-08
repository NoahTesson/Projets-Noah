import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import { COLOR_TEXT_BUTTON, MAIN_COLOR } from '../Variable'

const ConnectFour = () => {
  const [board, setBoard] = useState(Array(42).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      Alert.alert('Fin du jeu!', `Joueur ${winner} a gagné!`, [{ text: 'Recommencer', onPress: resetGame }]);
    } else if (board.every((cell) => cell !== null)) {
      Alert.alert('Fin du jeu!', 'Match nul!', [{ text: 'Recommencer', onPress: resetGame }]);
    }
  }, [board]);

  const handleClick = (col) => {
    if (calculateWinner(board) || board[col]) {
      return;
    }

    const newBoard = [...board];
    let row = 5;
    while (row >= 0 && newBoard[col + row * 7] !== null) {
      row--;
    }

    if (row >= 0) {
      newBoard[col + row * 7] = xIsNext ? 'X' : 'O';
      setBoard(newBoard);
      setXIsNext(!xIsNext);
    }
  };

  const getStatus = () => {
    const winner = calculateWinner(board);
    if (winner) {
      return `Joueur ${winner} a gagné!`;
    } else if (board.every((cell) => cell !== null)) {
      return 'Match nul!';
    } else {
      return `Prochain joueur: ${xIsNext ? 'X' : 'O'}`;
    }
  };

  const resetGame = () => {
    setBoard(Array(42).fill(null));
    setXIsNext(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{getStatus()}</Text>
      <View style={styles.board}>
        {Array.from({ length: 6 }).map((_, row) => (
          <View key={row} style={styles.row}>
            {Array.from({ length: 7 }).map((_, col) => (
              <TouchableOpacity
                key={col}
                style={styles.square}
                onPress={() => handleClick(col)}
              >
                <Text style={[styles.squareText, { color: board[col + row * 7] === 'X' ? 'red' : board[col + row * 7] === 'O' ? '#FFDB58' : 'black' }]}>
                  {board[col + row * 7] === 'X' ? 'O' : board[col + row * 7]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.restartButton} onPress={resetGame}>
        <Text style={styles.restartButtonText}>Recommencer</Text>
      </TouchableOpacity>
    </View>
  );
};

const calculateWinner = (squares) => {
  const columns = 7;
  const rows = 6;

  const lines = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col <= columns - 4; col++) {
      lines.push([row * columns + col, row * columns + col + 1, row * columns + col + 2, row * columns + col + 3]);
    }
  }

  for (let col = 0; col < columns; col++) {
    for (let row = 0; row <= rows - 4; row++) {
      lines.push([row * columns + col, (row + 1) * columns + col, (row + 2) * columns + col, (row + 3) * columns + col]);
    }
  }

  for (let col = 0; col <= columns - 4; col++) {
    for (let row = 0; row <= rows - 4; row++) {
      lines.push([row * columns + col, (row + 1) * columns + col + 1, (row + 2) * columns + col + 2, (row + 3) * columns + col + 3]);
      lines.push([row * columns + col + 3, (row + 1) * columns + col + 2, (row + 2) * columns + col + 1, (row + 3) * columns + col]);
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c] &&
      squares[a] === squares[d]
    ) {
      return squares[a];
    }
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareText: {
    fontSize: 24,
  },
  restartButton: {
    marginTop: 20,
    backgroundColor: MAIN_COLOR,
    padding: 10,
    borderRadius: 5,
  },
  restartButtonText: {
    color: COLOR_TEXT_BUTTON,
    fontSize: 16,
  },
});

export default ConnectFour;
