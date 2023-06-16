import {StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import {StatusBar} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import TopTab from '../navigation/TopTab';
import {NavigationContainer} from '@react-navigation/native';

export default class Home extends Component {
  render() {
    return (
      <>
        {/* <StatusBar backgroundColor={'#F4F4F4'} /> */}
        <View style={styles.appContainer}>
          <Text style={styles.floristText}>florist</Text>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomText}>Welcome!</Text>
            <Ionicons name="person" size={29} color={'black'} />
          </View>
         
            <TopTab />
          
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    padding: 15,
    flex: 1,
  },
  floristText: {
    textTransform: 'uppercase',
    color: '#2E2D2D',
    textAlign: 'center',
    marginTop: 25,
    fontSize: 20,
    letterSpacing: 7,
    fontWeight:'500'
  },
  welcomeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom:20
  },
  welcomText: {
    fontSize: 27,
    color: '#222224',
    fontWeight: '500',
    fontFamily: 'NITS',
  },
  topBarContainer:{
    
  }
});
