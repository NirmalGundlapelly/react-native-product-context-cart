import {Text, View} from 'react-native';
import React, {Component} from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Wedding from '../blocks/topbar/Wedding';
import Decoder from '../blocks/topbar/Decoder';
import Gift from '../blocks/topbar/Gift';

const Tab = createMaterialTopTabNavigator();

export default class TopTab extends Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={{
          swipeEnabled:false,
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '500',
            textTransform: 'none',
          },
          tabBarStyle: {
            backgroundColor: '#dcdee0',
            borderRadius: 10,
            height: 45,
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'black',
          tabBarIndicatorStyle: {
            backgroundColor: '#9682B6',
            height: '100%',
            borderRadius: 10,
          },
        }}>
        <Tab.Screen
          options={{
            tabBarPressColor: '#dcdee0',
          }}
          name="Wedding"
          component={Wedding}
        />
        <Tab.Screen
          options={{
            tabBarPressColor: '#dcdee0',
          }}
          name="Decor"
          component={Decoder}
        />
        <Tab.Screen
          options={{
            tabBarPressColor: '#dcdee0',
          }}
          name="Gift"
          component={Gift}
        />
      </Tab.Navigator>
    );
  }
}
