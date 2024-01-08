import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const squareSize = 150;
const ballSize = 50;

class BallGame extends Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      ballPosition: this.randomPosition(),
      gameActive: true,
      timeLeft: 10,
    };
  }

  componentDidMount() {
    this.startGame();
  }

  randomPosition = () => {
    const x = Math.random() * (squareSize - ballSize);
    const y = Math.random() * (squareSize - ballSize);
    return { x, y };
  };

  moveBall = () => {
    this.setState({
      ballPosition: this.randomPosition(),
    });
  };

  handleBallPress = () => {
    if (this.state.gameActive) {
      this.setState(
        (prevState) => ({
          score: prevState.score + 1,
        }),
        () => {
          this.moveBall();
        }
      );
    }
  };

  startGame = () => {
    this.timer = setInterval(() => {
      const { timeLeft } = this.state;

      if (timeLeft > 0) {
        this.setState({
          timeLeft: timeLeft - 1,
        });
      } else {
        clearInterval(this.timer);
        this.setState({
          gameActive: false,
        });
      }
    }, 1000);

    this.moveBall();
  };

  resetGame = () => {
    this.setState({
      score: 0,
      timeLeft: 10,
      gameActive: true,
    });

    this.startGame();
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.gameActive ? (
          <TouchableOpacity onPress={this.handleBallPress}>
            <View
              style={[
                styles.ball,
                {
                  left: this.state.ballPosition.x,
                  top: this.state.ballPosition.y,
                },
              ]}
            />
          </TouchableOpacity>
        ) : (
          <View>
            <Text style={styles.gameOverText}>Fin du jeu</Text>
            <Text style={styles.scoreText}>Score: {this.state.score}</Text>
            <TouchableOpacity onPress={this.resetGame}>
              <Text style={styles.resetButton}>Rejouer</Text>
            </TouchableOpacity>
          </View>
        )}
        {this.state.gameActive && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Temps restant: {this.state.timeLeft}</Text>
            <Text style={styles.infoText}>Score: {this.state.score}</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ball: {
    width: ballSize,
    height: ballSize,
    backgroundColor: 'orange',
    borderRadius: ballSize / 2,
    position: 'absolute',
  },
  scoreText: {
    color: 'black',
    fontSize: 24,
    marginTop: 10,
    textAlign: 'center',
  },
  gameOverText: {
    fontSize: 36,
    textAlign: 'center',
  },
  resetButton: {
    fontSize: 24,
    marginTop: 20,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  infoContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  infoText: {
    color: 'black',
    fontSize: 18,
    marginVertical: 5,
  },
});

export default BallGame;
