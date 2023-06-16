import {Text, View} from 'react-native';
import React, {Component} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Catalog from '../blocks/Catalog';
import ProductDetailScreen from '../blocks/ProductDetailScreen';


const Stack = createNativeStackNavigator();

interface IProps {
  navigation:any
}

export default class CatalogNavigater extends Component<IProps> {

 

  render() {
    return (
    
      <Stack.Navigator initialRouteName='Catalogg' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Catalogg" component={Catalog}/>
        <Stack.Screen options={{headerShown:true}}
          name="ProductDetailScreen"
          component={ProductDetailScreen}
        />
      </Stack.Navigator>
     
    );
  }
}
