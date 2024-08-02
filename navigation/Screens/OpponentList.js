import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {sizes, spacing, shadow, colors} from '../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

const CARD_WIDTH = sizes.width - 80;
const CARD_HEIGHT = 220;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

export default function OpponentList({list}) {
  return (
    <FlatList
      data={list}
      snapToInterval={CARD_WIDTH_SPACING}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      keyExtractor={i => i.id}
      style={{borderWidth: 0, borderColor: 'red', flex: 1, marginBottom: 70}}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => {
        return (
          <View style={[styles.card, shadow.dark]}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.nameUser}>{item.nameUser}</Text>
            <TouchableOpacity>
              <View
                style={{
                  height: 40,
                  width: 90,
                  borderWidth: 0,
                  top: -75,
                  left: 200,

                  backgroundColor: '#01B460',
                  borderRadius: 6,
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'white',
                    fontSize: 12,
                    fontWeight: 'bold',
                    top: 10,
                  }}>
                  Join
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                borderWidth: 0,
                borderColor: 'black',
                top: -20,
                height: 130,
                left: 25,
              }}>
              <Text style={{color: 'black', marginBottom: 5}}>
                <Icon
                  name="calendar"
                  size={12}
                  color={'orange'}
                  style={{left: 10}}
                />
                {item.date}
              </Text>

              <Text style={{color: 'black', marginBottom: 5}}>
                <Icon
                  name="home"
                  size={14}
                  color={'orange'}
                  style={{left: 10}}
                />
                {item.futsal}
              </Text>
              <Text style={{color: 'black', marginBottom: 5}}>
                <Icon
                  name="map-marker"
                  size={15}
                  color={'orange'}
                  style={{left: 14}}
                />
                {item.location}
              </Text>
              <Text style={{color: 'black', marginBottom: 5}}>
                <Icon name="futbol-o" size={12} color={'orange'} style={{}} />
                {item.description}
              </Text>
            </View>
          </View>
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
    alignSelf: 'center',
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
    top: 30,
    left: 20,
    resizeMode: 'cover',
  },
  nameUser: {
    color: 'black',
    left: 90,
    top: -5,
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
