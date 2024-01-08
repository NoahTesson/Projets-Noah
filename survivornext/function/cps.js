import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, Button } from 'react-native';

import { MAIN_COLOR } from '../Variable'

class ClickCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: 0,
      startTime: null,
      endTime: null,
      cps: 0,
      clicking: false,
      modalVisible: false,
    };
  }

  handleButtonClick = () => {
    const { clicks, startTime, clicking } = this.state;

    if (!startTime) {
      this.setState({ startTime: Date.now() });
    }

    if (!clicking) {
      this.setState({ clicking: true });
    }

    this.setState({ clicks: clicks + 1 });
  };

  calculateCPS = () => {
    const { clicks, startTime, endTime } = this.state;

    if (clicks > 0 && startTime && endTime) {
      const elapsedTime = (endTime - startTime) / 1000;
      const cps = clicks / elapsedTime;
      this.setState({ cps });
    }
  };

  startClicking = () => {
    this.setState({ clicks: 0, cps: 0, startTime: null, endTime: null, clicking: true, modalVisible: false });

    setTimeout(() => {
      this.setState({ endTime: Date.now(), clicking: false }, () => {
        this.calculateCPS();
        this.toggleModal(true);
      });
    }, 10000);
  };

  toggleModal = (visible) => {
    this.setState({ modalVisible: visible });
  };

  render() {
    const { clicks, cps, clicking, modalVisible } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {clicking ? (
          <View>
            <TouchableOpacity onPress={this.handleButtonClick} style={{ padding: 20, backgroundColor: '#ADB2D3' }}>
              <Text style={{ color: 'black', fontSize: 20, textAlign: 'center' }}>Clique</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 24, marginTop: 20 }}>Cliques: {clicks}</Text>
          </View>
        ) : (
          <TouchableOpacity onPress={this.startClicking} style={{ padding: 20, backgroundColor: '#ADB2D3' }}>
            <Text style={{ color: 'black', fontSize: 20 }}>Commencer à cliquer</Text>
          </TouchableOpacity>
        )}

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
              <Text style={{ fontSize: 18, marginBottom: 10, textAlign: 'center' }}>CPS:</Text>
              <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>{cps.toFixed(2)}</Text>
              <TouchableOpacity  onPress={() => this.toggleModal(false)}>
                <Text style={{textAlign: 'center', color: MAIN_COLOR}}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default ClickCounter;
