import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component, createRef} from 'react';
import TopTab from '../navigation/TopTab';
import {BottomTabBar} from '@react-navigation/bottom-tabs';

import ratingIcon from '../images/ratingIcon.png';
import {CartContext} from '../../context/CartContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IProps {
  item: any;
  route: any;
  navigation: any;
}

interface IState {
  showPopup: boolean;
  quantity: number;
}

let CurrentSlide = 0;
let IntervalTime = 2000;

export default class ProductDetailScreen extends Component<IProps, IState> {
  state = {showPopup: false, quantity: 1};
  flatList = createRef();

  static contextType = CartContext;

  hangleAddPopUp = () => {
    console.log('popup');
  };

  // TODO _goToNextPage()
  _goToNextPage = () => {
    const detail = this.props.route.params;
    const link = detail.images;
    if (CurrentSlide >= link.length - 1) CurrentSlide = 0;

    this.flatList.current.scrollToIndex({
      index: ++CurrentSlide,
      animated: true,
    });
  };

  _startAutoPlay = () => {
    this._timerId = setInterval(this._goToNextPage, IntervalTime);
  };

  _stopAutoPlay = () => {
    if (this._timerId) {
      clearInterval(this._timerId);
      this._timerId = null;
    }
  };

  componentDidMount() {
    const detail = this.props.route.params;
    this.setState({
      quantity: detail.quantity ? detail.quantity : this.state.quantity,
    });
    const link = detail.images;
    if (link.length > 1) {
      this._stopAutoPlay();
      this._startAutoPlay();
    }
  }

  componentWillUnmount() {
    this._stopAutoPlay();
  }

  findQuantity = () => {
    const details = this.props.route.params;
    console.log('productDetailsScreen', details)
    const {cartList} = this.context;

    const productItem = cartList.find(each => each.id == details.id);
    console.log('producItem', productItem);
    if (productItem != undefined) {
      const productQuantity = productItem[0].quantity;
      console.log('productQuantity', productQuantity);
      return productQuantity;
    }else{
      return this.state.quantity
    }
  };

  render() {
    const details = this.props.route.params;
    // const image = details.images[0];
    // const imagess = [
    //   {id: 1, image: detail.images[0]},
    //   {id: 2, image: detail.images[1]},
    //   {id: 3, image: detail.images[2]},
    //   {id: 4, image: detail.images[3]},
    // ];
    const {
      handleAddToCart,
      cartList,
      incrementCartItemQuantity,
      decrementCartItemQuantity,
      itemQuantity,
    } = this.context;

    // const details = {...detail, quantity: 1};
    console.log('stateQuantity', itemQuantity);

    let productsCount = 0;
    cartList.forEach(eachCartItem => {
      productsCount += eachCartItem.quantity;
    });

    return (
      <View style={styles.totalMainContainer}>
        <View>
          <FlatList
            horizontal
            flatListRef={React.createRef()}
            ref={this.flatList}
            showsHorizontalScrollIndicator={false}
            data={details.images}
            renderItem={({item}) => (
              <Image style={styles.thumbnail} source={{uri: item}} />
            )}
            keyExtractor={item => item.id}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.productDetailsContainer}>
              {/* <Image style={styles.thumbnail} source={{uri: image}} /> */}
              <View style={styles.descriptionContainer}>
                <View style={styles.detailsPriceContainer}>
                  <Text style={styles.productDetailTitle}>{details.title}</Text>
                  <Text style={styles.productDetailPrice}>
                    ${details.price}
                  </Text>
                </View>
                <View style={styles.detailsPriceContainer}>
                  <Text style={styles.productDetailPrice}>Availability</Text>

                  {/* <Text style={styles.itemRating}>
                      Rating: *{details.rating}
                    </Text> */}
                  <Text
                    style={{color: '#04c20a', fontWeight: '500', fontSize: 18}}>
                    In Stock
                  </Text>
                </View>
                <View style={styles.detailsPriceContainer}>
                  <Text style={styles.productDetailPrice}>Rating</Text>

                  {/* <Text style={styles.itemRating}>
                      Rating: *{details.rating}
                    </Text> */}
                  <Image source={ratingIcon} />
                </View>
                <View
                  style={{
                    borderBottomColor: '#cbd1cb',
                    borderBottomWidth: 1,
                    marginHorizontal: 20,
                    marginVertical: 10,
                  }}></View>

                <View style={styles.detailsPriceContainer}>
                  <Text style={styles.productDetailTitle}>Quantity</Text>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        decrementCartItemQuantity({
                          ...details,
                          quantity: this.state.quantity,
                        });
                        if (this.state.quantity > 1) {
                          this.setState({quantity: this.state.quantity - 1});
                        }
                      }}
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
                        color: 'black',
                        width: 40,
                        height: 45,
                        textAlign: 'center',
                        paddingTop: 13,
                      }}>
                      {/* {details.quantity? details.quantity : this.state.quantity} */}
                      {cartList.find((each)=> each.id == details.id) ? cartList.find((each)=> each.id == details.id).quantity: this.state.quantity}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        incrementCartItemQuantity({...details, quantity: 0});

                        this.setState({quantity: this.state.quantity + 1});
                      }}
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
                </View>

                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      handleAddToCart({
                        ...details,
                        quantity: this.state.quantity,
                      });
                      this.setState({showPopup: true});
                    }}
                    style={styles.viewCardButton}>
                    <Ionicons name="cart" size={25} color={'white'} />
                    <Text style={styles.buttonText}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
                {this.state.showPopup && cartList.length > 0 && (
                  <Text
                    style={{
                      backgroundColor: 'green',
                      color: 'white',
                      padding: 10,
                      borderRadius: 10,
                      opacity: 0.8,
                      marginTop: 10,
                      margin: 20,
                    }}>
                    Product Added Successfully..
                  </Text>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  totalMainContainer: {
    height: 820,
    backgroundColor: 'white',
  },
  navBarContainer: {
    padding: 10,
    backgroundColor: '#2973f0',
    height: 60,
  },
  navHeading: {
    paddingTop: 5,
    color: 'white',
    fontSize: 23,
    fontWeight: '500',
  },
  productHeading: {
    padding: 10,
    color: 'white',
    fontSize: 23,
    fontWeight: '500',
  },
  productsMainContainer: {
    backgroundColor: '#f79934',
    marginBottom: 5,
  },
  thumbnail: {
    marginTop: -5,
    // height: '35%',
    // width: '100%',
    height: 300,
    width: 400,
    marginRight: 10,
  },
  productDetailsContainer: {
    height: 1000,
  },
  view360Degree: {
    padding: 4,
    marginTop: 10,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2973f0',
  },
  viewBottomText: {
    fontSize: 16,
    color: '#969494',
    fontWeight: '400',
    paddingTop: 5,
  },
  descriptionContainer: {
    height: 400,
  },
  productDetailTitle: {
    color: '#201d1d',
    fontSize: 25,
    padding: 5,
    fontWeight: '500',
  },
  itemPrice: {
    color: 'green',
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 5,
    paddingBottom: 5,
  },
  itemRating: {
    color: '#f79934',
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 5,
    paddingBottom: 5,
  },
  detailsPriceContainer: {
    padding: 5,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productDetailPrice: {
    color: '#787773',
    fontSize: 20,
    padding: 5,
    fontWeight: '500',
  },
  productDescriptionContainer: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 8,
    height: 110,
    width: '98%',
    marginVertical: 10,
  },
  elevation: {
    shadowColor: '#52006A',
    elevation: 5,
  },
  productDescriptionHeading: {
    color: '#2973f0',
    fontWeight: '500',
    fontSize: 15,
  },
  productDescriptionText: {
    color: '#5b5353',
    fontWeight: '400',
    fontSize: 15,
  },
  scrollView: {
    flexGrow: 1,
    height: '100%',
  },
  viewCardButton: {
    flexDirection: 'row',
    backgroundColor: '#9682B6',
    padding: 10,
    width: 150,
    borderRadius: 5,
    marginRight: 15,
    marginTop: 40,
  },
  buyNowButton: {
    backgroundColor: 'green',
    padding: 10,
    width: 100,
    borderRadius: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
    marginLeft: 10,
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
});
