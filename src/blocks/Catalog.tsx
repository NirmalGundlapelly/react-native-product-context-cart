import {
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {Component} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import Ionicons from 'react-native-vector-icons/Ionicons';
import filterIcon from '../images/filterIcon.png';

const {height, width} = Dimensions.get('screen');

interface IProps {
  navigation: any;
}

interface IState {
  products: any;
  searchText: string;
  filteredValue: any;
  showSearch: boolean;
}

export default class Catalog extends Component<IProps, IState> {
  state = {products: [], searchText: '', filteredValue: '', showSearch: false};

  componentDidMount(): void {
    this.getAllProducts();
  }

  getAllProducts = async () => {
    const response = await fetch('https://dummyjson.com/products');
    if (response.ok) {
      const responseData = await response.json();
      this.setState({products: responseData.products});
    }
  };

  handleSearch = () => {
    this.setState({showSearch: !this.state.showSearch});
  };

  renderProductItem = (item: any) => {
    const itemName =
      item.title.length > 10 ? `${item.title.slice(0, 10)}...` : item.title;

    return (
      <>
        <TouchableOpacity
          onPress={() =>{
            let value = {...item, quantity: 0}
            this.props.navigation.navigate('ProductDetailScreen', {...value})
          }
           
          }>
          <View style={styles.productItem}>
            <View style={styles.itemCardContainer}>
              <Image style={styles.thumbnail} source={{uri: item.thumbnail}} />
              <Text style={styles.itemTitleText}>{itemName}</Text>
              <View style={styles.itemPriceContainer}>
                <Text style={styles.itemPrice}>${item.price}</Text>
                <Ionicons name="cart" size={20} color="#9682B6" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  render() {
    const {products, searchText, filteredValue} = this.state;
    console.log(filteredValue);
    const finalList = products.filter((eachObj: any) =>
      eachObj.title.toLowerCase().includes(searchText.toLowerCase().trim()),
    );

    return (
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{padding: 5}}>
            {/* Nav Bar */}
            <View style={styles.navBarContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons
                  onPress={() => this.props.navigation.navigate('Home')}
                  name="arrow-back"
                  size={29}
                  color={'black'}
                />
                <Text style={{color: 'black', fontSize: 20, marginLeft: 10}}>
                  Bridal Bouquet
                </Text>
              </View>
              {this.state.showSearch && (
                <TextInput
                  value={searchText}
                  style={styles.input}
                  keyboardType="web-search"
                  placeholder="Search Products"
                  placeholderTextColor={'black'}
                  onChangeText={text =>
                    this.setState({searchText: text.trim()})
                  }
                />
              )}
              <Ionicons
                onPress={this.handleSearch}
                name="search"
                size={29}
                color={'black'}
              />
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingRight: 10,
                }}>
                <Text style={styles.productHeading}>Catalog</Text>
                <Image source={filterIcon} />
              </View>

              {/* Flat Container */}
              <View style={styles.productFlatContainer}>
                {/* Filter Tab */}
                {finalList.length === 0 ? (
                  <Text style={styles.noProductsAvailableText}>
                    No Products Available
                  </Text>
                ) : (
                  <FlatList
                    numColumns={2}
                    columnWrapperStyle={styles.tagView}
                    showsVerticalScrollIndicator={false}
                    data={finalList}
                    renderItem={({item}) => this.renderProductItem(item)}
                    keyExtractor={(item: any) => item.id}
                  />
                )}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  navBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height: 60,
  },
  navHeading: {
    color: 'white',
    fontSize: 23,
    fontWeight: '500',
  },
  productHeading: {
    padding: 10,
    color: '#535557',
    fontSize: 20,
    fontWeight: '500',
  },
  productFlatContainer: {
    height: '87.5%',

    padding: 1,
  },
  productItem: {
    padding: 10,
    borderRadius: 7,
    backgroundColor: '#ffffff',
    margin: 5,
    height: height / 5,
    width: width / 2.2,
  },
  thumbnail: {
    borderRadius: 10,
    height: '60%',
    width: '100%',
  },
  itemTitleText: {
    width: '60%',
    color: 'black',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 10,
  },
  itemCategoryText: {
    // width: '50%',
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
    paddingBottom: 5,
  },
  itemCardContainer: {
    flexDirection: 'column',
  },
  itemPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemPrice: {
    color: 'green',
    fontSize: 15,
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

  // Input
  input: {
    height: 40,
    width: 150,
    borderRadius: 5,
    margin: 12,
    borderWidth: 1,
    borderColor: '#65686e',
    color: 'black',
    padding: 10,
  },

  // Drop Down
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  placeholderStyle: {fontSize: 16},

  // Empty Products List View
  noProductsAvailableText: {
    color: 'black',
    fontSize: 30,
    marginTop: 70,

    textAlign: 'center',
  },
  tagView: {
    flexWrap: 'wrap',
  },
});
