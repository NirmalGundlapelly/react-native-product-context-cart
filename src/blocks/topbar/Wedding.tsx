import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';

import Fontisto from 'react-native-vector-icons/Fontisto';

import allIcon from '../../images/allIcon.png';
import type1 from '../../images/type1.png'
import type2 from '../../images/type2.png'
import type3 from '../../images/type3.png'
import type4 from '../../images/type4.png'

import popular1 from '../../images/popular1.png'
import ratingIcon from '../../images/ratingIcon.png'

const data = [
  {
    id: 1,
    image: allIcon,
    text: 'All',
  },
  {
    id: 2,
    image: type1,
    text: 'Bouquet',
  },
  {
    id: 3,
    image: type2,
    text: 'Table',
  },
  {
    id: 4,
    image: type3,
    text: 'Aisle',
  },
  {
    id: 5,
    image: type4,
    text: 'Accessories',
  },
];

const populardata = [
  {
    id:1,
    image:popular1,
    text:'Spark',
    price:90
  },
  {
    id:2,
    image:popular1,
    text:'The Link',
    price:35
  },
]

interface IProps {
  navigation: any;
}

interface IState {}

export default class Wedding extends Component<IProps, IState> {
  handleSelection = (id: number) => {
    if (id == 1) {
      this.props.navigation.navigate('Catalog');
    }
  };

  // selection
  renderTypes = (item: any) => {
    return (
      <TouchableOpacity onPress={() => this.handleSelection(item.id)}>
        <View>
          <View style={styles.typeItem}>
            <Image style={styles.typeImage} source={item.image} />
            <Text style={styles.typeText}>{item.text}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // popularity
  renderPopularTypes = (item: any) => {
    return (
      <TouchableOpacity>
        <View style={styles.popularityCard}>
          <View >
            <Image style={styles.typePopularImage} source={item.image} />
            <View style={styles.popCardTextContainer}>
              <Text style={styles.popCardText}>{item.text}</Text>
              <Image source={ratingIcon}/>
            </View>
            <Text style={{fontWeight:'500'}}>${item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.weddingContainer}>
        <View style={styles.needHelpContainer}>
          <View>
            <Text style={styles.needHelpText}>Need help?</Text>
            <Text style={styles.needHelpDesc}>
              Make an appointment or chat with us.
            </Text>
          </View>
          <Fontisto name="date" size={39} color={'white'} />
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({item}) => this.renderTypes(item)}
        />
        <Text style={styles.popularText}>Popularity</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={populardata}
          renderItem={({item}) => this.renderPopularTypes(item)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  weddingContainer: {
    flex:1
  },
  needHelpContainer: {
    backgroundColor: '#9682B6',
    marginTop: 20,
    borderRadius: 5,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  needHelpText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 30,
  },
  needHelpDesc: {
    color: '#f7f7f7',
  },
  typeItem:{
    marginVertical:15,
    marginRight:26,
    flexDirection:'column',
    alignItems:'center'
  },
  typeText:{
    marginTop:10,
    fontWeight:'600',
    color:'#7d7c79'
  },
  typeImage:{
    width:70,
    height:70,
    borderRadius:10
  },
  popularText:{
    fontWeight:'600',
    fontSize:20,
    color:'black',
    marginTop:10
  },
  typePopularImage:{
    width:'100%'
  },
  popularityCard:{
    backgroundColor:'white',
    marginRight:10,
    padding:10,
    borderRadius:10,
    marginTop:15,
    width:300,
  },
  popCardTextContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingVertical:10
  },
  popCardText:{
    color:'#9682B6',
    fontWeight:'500',
    fontSize:20
  }
});
