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
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

export default function UpcomingBook({list, navigation}) {
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
            <View
              style={{
              
                borderWidth: 0,
                height: 120,
                width: 300,
                alignSelf: 'center',
                top: 15,
                justifyContent: 'center',
                gap: 10,
              }}>
              <View
                style={{
                  borderWidth: 0,
                  borderColor: 'red',
                  height: 110,
                  width: 170,
                  left:20
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Icon name="map-marker" size={20} style={{color: 'black'}} />
                  <Text style={{color: 'black', left: 10}}>{item.title}</Text>
                </View>
                <View style={{flexDirection: 'row', top: 10}}>
                  <Icon name="calendar" size={16} style={{color: 'black'}} />
                  <Text style={{color: 'black', left: 4}}>{item.date}</Text>
                </View>
                <View style={{flexDirection: 'row', top: 20}}>
                  <Icon name="clock-o" size={20} style={{color: 'black'}} />
                  <Text style={{color: 'black', left: 8}}>{item.time}</Text>
                </View>
                <View style={{flexDirection: 'row', top: 30}}>
                  <Icon name="book" size={20} style={{color: 'black'}} />
                  <Text style={{color: 'black', left: 8}}> {item.description}</Text>
                </View>
              </View>
             
            </View>
            <TouchableOpacity style={{width:100,alignSelf:'center', top: 30,}}>
              <View
                style={{
                  height: 40,
                  width: 100,
                  borderWidth: 0,
                 
                  // alignSelf: 'center',
                  justifyContent:'center',

                  backgroundColor: '#C11919',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 'bold',
                    
                  }}>
                  Cancel
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: 210,
    marginVertical: 10,
    backgroundColor: '#FEFEFE',
    borderRadius: 16,
    alignSelf: 'center',
  },

  titleBox: {
    position: 'absolute',
    top: CARD_HEIGHT - 80,
    left: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.white,
  },
  location: {
    fontSize: 10,
    color: colors.white,
  },
  description: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.white,
    //
  },
});
