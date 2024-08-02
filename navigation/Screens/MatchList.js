import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking
} from 'react-native';
import React, {useState} from 'react';
import {sizes, spacing, shadow, colors} from '../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
const CARD_WIDTH = sizes.width - 80;
const CARD_HEIGHT = 300;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

export default function MatchList({list}) {
  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

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
        const isBookingAccepted = item.booking === ' Accepted';
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

                  backgroundColor: '#DE2A2A',
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
                  Cancel
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
                  size={14}
                  color={'orange'}
                  style={{left: 10}}
                />
                {item.location}
              </Text>
              <Text style={{color: 'black', marginBottom: 5}}>
                <Icon name="futbol-o" size={12} color={'orange'} style={{}} />
                {item.description}
              </Text>
              <Text style={{color: 'black', marginBottom: 5,left:2}}>
              <Icon name="book" size={12} color={'orange'} style={{}} />
                
              <Text style={{color: 'black', marginBottom: 5,left:8}}>
                 Match:
                </Text>
                {item.booking}
              </Text>
              {isBookingAccepted && 
              <TouchableOpacity onPress={() => handleCall(item.phone)}>
                <View
                  style={{
                    borderWidth: 0,
                    width: 100,
                    height: 38,
                    alignSelf: 'center',
                    right: 30,
                    flexDirection: 'row',
                    top: 10,
                    alignItems: 'center',
                    backgroundColor: '#01B460',
                    borderRadius: 10,
                  }}>
                  <Icon
                    name="phone"
                    size={20}
                    color={'white'}
                    style={{left: 5, top: -2}}
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      marginBottom: 5,
                      left: 10,
                      fontSize: 14,
                      top: 0,
                    }}>
                    Call Now
                  </Text>
                </View>
              </TouchableOpacity>
      }
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
