import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {sizes, spacing, shadow, colors} from '../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
const CARD_WIDTH = sizes.width - 80;
const CARD_HEIGHT = 230;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

export default function TopGameCarousel({list}) {
  return (
    <FlatList
      data={list}
      horizontal
      snapToInterval={CARD_WIDTH_SPACING}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      keyExtractor={i => i.id}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            style={{
              marginLeft: spacing.l,
              marginRight: index === list.length - 1 ? spacing.l : 0,
            }}>
            <View style={[styles.card, shadow.dark]}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.nameUser}>{item.nameUser}</Text>
              <View
                style={{
                  borderWidth: 0,
                  borderColor: 'black',
                  top: 15,
                  width:280,
                  height: 130,
                  left: 25,
                  
                  
                }}>
                <Text style={{color: 'black', marginBottom: 5}}>
                  <Icon
                    name="calendar"
                    size={11}
                    color={'orange'}
                    style={{left: 10}}
                  />
                  {item.date}
                </Text>
                
                <Text style={{color: 'black', marginBottom: 5}}>
                  <Icon
                    name="home"
                    size={13}
                    color={'orange'}
                    style={{left: 13}}
                  />
                  {item.futsal}
                </Text>
                <Text style={{color: 'black', marginBottom: 5,left:4}}>
                  <Icon
                    name="map-marker"
                    size={15}
                    color={'orange'}
                    style={{left: 20}}
                  />
                  {item.location}
                </Text>
                <Text style={{color: 'black', marginBottom: 5,left:1}}>
                  <Icon name="futbol-o" size={11} color={'orange'} style={{}} />
                  {item.description}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}
const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginVertical: 10,
    borderWidth: 0,
    borderColor: 'black',
    borderRadius: 15,
    backgroundColor: '#FEFEFE',
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
    top: 20,
    left: 30,
    resizeMode: 'cover',
  },
  nameUser: {
    color: 'black',
    left: 110,
    top: -20,
    fontWeight: 'bold',
    fontSize: 16,
  },

  location: {
    fontSize: 10,
    color: colors.white,
  },
  description: {
    fontSize: 10,
    fontWeight: 'bold',
    //
  },
});
