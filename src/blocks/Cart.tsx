import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import {CartContext} from '../../context/CartContext';

import ratingIcon from '../images/ratingIcon.png';
import emptyCartt from '../images/emptyCartt.png';

export default class Cart extends Component {
  static contextType = CartContext;

  renderCartItem = item => {
    const {
      removeCartItem,
      incrementCartItemQuantity,
      decrementCartItemQuantity,
      itemQuantity
    } = this.context;

    return (
      <View style={styles.cartItemCard}>
        <Image style={styles.cartItemImage} source={{uri: item.thumbnail}} />
        <View style={styles.cartTextContainer}>
          <Text>{item.title}</Text>
          <Text>Quantity</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => 
                
                {
                  if (item.quantity > 1){
                    decrementCartItemQuantity(item)}
                  }
                }
                
              style={{
                width: 40,
                height: 50,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 30}}>-</Text>
            </TouchableOpacity>
            <Text
              style={{
                backgroundColor: 'white',
                width: 40,
                height: 45,
                textAlign: 'center',
                paddingTop: 13,
              }}>
              {item.quantity? item.quantity:1}
            </Text>
            <TouchableOpacity
              onPress={() => incrementCartItemQuantity(item)}
              style={{
                width: 40,
                height: 50,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 30}}>+</Text>
            </TouchableOpacity>
          </View>
          <Image source={ratingIcon} style={{marginTop: 10}} />
          <Text style={{color: 'green'}}>Price: ${item.price}</Text>
          <TouchableOpacity
            onPress={() => removeCartItem(item.id)}
            style={styles.removeButton}>
            <Text style={{color: 'white'}}>Remove from Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const {cartList} = this.context;
    let total = 0;
    let productsCount = 0
    cartList.forEach(eachCartItem => {
      total += eachCartItem.price * eachCartItem.quantity;
      productsCount += eachCartItem.quantity
    });
    console.log('cartScreen', cartList);
    return (
      <View style={styles.cartMainContainer}>
        <Text style={styles.myCartText}>My Cart</Text>
        {cartList.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={cartList}
            renderItem={({item}) => this.renderCartItem(item)}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text style={{textAlign: 'center', marginTop: 150, fontSize: 40}}>
              Empty Cart...
            </Text>
            <Image source={emptyCartt} style={{width:"70%", height:"50%"}}/>
          </View>
        )}

        {
          cartList.length > 0 && (
            <>
            <Text
            style={{
              position: 'absolute',
              marginLeft: 10,
              backgroundColor: 'black',
              color: 'white',
              padding: 10,
              borderRadius: 10,
              bottom: 40,
              fontSize: 17,
              fontWeight: '600',
            }}>
            Total Amount: ${total}.00
          </Text>
          <Text
            style={{
              position: 'absolute',
              marginLeft: 10,
              backgroundColor: 'black',
              color: 'white',
              padding: 10,
              borderRadius: 10,
              bottom: 10,
              fontSize: 17,
              fontWeight: '600',
            }}>
            Products Count: {productsCount}
          </Text>
          </>
          )
        }

      
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cartItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation:2
  },
  cartMainContainer: {
    padding: 10,
    height: Dimensions.get('window').height / 1.09,
  },
  myCartText: {
    fontSize: 25,
    fontWeight: '600',
    marginBottom: 15,
    color: 'green',
  },
  cartItemImage: {
    height: 175,
    width: 180,
  },
  cartTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 30,
    flexGrow: 1,
  },
  buttonContainer: {
    backgroundColor: 'rgba(129, 138, 152, 0.2)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderRadius: 5,
    height: 50,
    width: 130,
  },
  removeButton: {
    backgroundColor: 'orange',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});
