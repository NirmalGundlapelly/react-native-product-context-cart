import {Image, Text, View} from 'react-native';
import React, {Component} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../blocks/Home';
import Catalog from '../blocks/Catalog';
import Chat from '../blocks/Chat';
import Cart from '../blocks/Cart';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CatalogNavigater from './CatalogNavigater';
import {CartContext} from '../../context/CartContext';

const Tab = createBottomTabNavigator();

export default class BottomTab extends Component {
  static contextType = CartContext;
  render() {
    const {cartList} = this.context;
    let productsCount = 0
    cartList.forEach(eachCartItem => {
      productsCount += eachCartItem.quantity
    });
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            paddingVertical: 10,
            height: 70,
          },
          tabBarActiveTintColor: '#4B194F',
        }}>
        <Tab.Screen
          options={{
            tabBarLabelStyle: {
              fontWeight: '800',
              fontSize: 13,
              paddingBottom: 10,
            },
            tabBarIcon: ({color}) => (
              <Ionicons name="home-sharp" size={25} color={color} />
            ),
          }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{
            tabBarLabelStyle: {
              fontWeight: '800',
              fontSize: 13,
              paddingBottom: 10,
            },
            tabBarIcon: ({color}) => (
              <FontAwesome5 name="book-open" size={25} color={color} />
            ),
          }}
          name="Catalog"
          component={CatalogNavigater}
        />
        <Tab.Screen
          options={{
            tabBarLabelStyle: {
              fontWeight: '800',
              fontSize: 13,
              paddingBottom: 10,
            },
            tabBarIcon: ({color}) => (
              <Ionicons name="md-chatbubble-sharp" size={25} color={color} />
            ),
          }}
          name="Chat"
          component={Chat}
        />
        <Tab.Screen
          options={{
            tabBarLabelStyle: {
              fontWeight: '800',
              fontSize: 13,
              paddingBottom: 10,
              paddingRight: 10,
            },
            tabBarIcon: ({color}) => (
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="cart" size={32} color={color} />
                <View
                  style={{
                    backgroundColor: cartList.length < 1 ? 'red' : 'green',
                    flexDirection: 'row',
                    justifyContent:'center',
                    alignItems:'center',
                    borderRadius: 100,
                    width: 20,
                    height:20

                  }}>
                  <Text style={{color: 'white'}}>{productsCount}</Text>
                </View>
              </View>
            ),
          }}
          name="Cart"
          component={Cart}
        />
      </Tab.Navigator>
    );
  }
}
