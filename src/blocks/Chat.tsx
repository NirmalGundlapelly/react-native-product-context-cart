import {Text, View} from 'react-native';
import React, {Component} from 'react';

export default class Chat extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}>
        <Text style={{fontWeight: '600', fontSize: 40}}>Chat</Text>
      </View>
    );
  }
}