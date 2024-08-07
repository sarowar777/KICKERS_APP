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

export default function MyMatchList({list, navigation}) {
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
            <View style={{flexDirection: 'row',flex:2.5}}>
              <View
                style={{
                  borderWidth: 0,
                  borderColor: 'red',
                  height: 120,
                  width: 170,
                  left: 20,
                  top: 20,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Icon name="map-marker" size={20} style={{color: 'black'}} />
                  <Text style={{color: 'black', left: 10}}>{item.title}</Text>
                </View>
                <View style={{flexDirection: 'row', top: 20}}>
                  <Icon name="calendar" size={20} style={{color: 'black'}} />
                  <Text style={{color: 'black', left: 10}}>{item.date}</Text>
                </View>
                <View style={{flexDirection: 'row', top: 40}}>
                  <Icon name="clock-o" size={20} style={{color: 'black'}} />
                  <Text style={{color: 'black', left: 10}}>{item.time}</Text>
                </View>
                <View style={{flexDirection: 'row', top: 60, width: 230}}>
                  <Icon name="futbol-o" size={18} style={{color: 'black'}} />
                  <Text style={{color: 'black', left: 10}}>
                    5a side | Loosers Pay | 1500Rs
                  </Text>
                </View>
              </View>
             
            </View>
            <View style={{flex:1,flexDirection:'row',borderWidth:0,gap:20,alignSelf:'center'}}>
            <TouchableOpacity style={{width:100,justifyContent:'center',alignSelf:'center'}}>
                <View
                  style={{
                    borderWidth: 0,
                    height: 40,
                    width: 100,
                    backgroundColor: '#01B460',
                    borderRadius: 10,
                    alignSelf:'center',
                    justifyContent:'center'

                  }}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 'bold',
                      
                    }}>
                    EDIT
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{width:100,alignSelf:'center',justifyContent:'center'}}>
              <View
                style={{
                  height: 40,
                  width: 100,
                  borderWidth: 0,
                  
                  alignSelf: 'center',
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
                  Delete
                </Text>
              </View>
            </TouchableOpacity>
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
    height: 260,
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
