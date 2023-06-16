import {Text, View} from 'react-native';
import React, {Component} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTab from './src/navigation/BottomTab';
import TopTab from './src/navigation/TopTab';
import CartContextProvider from './context/CartContextProvider';
import ProductDetailScreen from './src/blocks/ProductDetailScreen';

const Stack = createNativeStackNavigator();

export default class App extends Component {
  render() {
    return (
      <CartContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="BottomTab" component={BottomTab} />
            <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartContextProvider>
    );
  }
}
