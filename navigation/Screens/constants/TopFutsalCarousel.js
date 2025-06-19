import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {sizes, spacing, shadow, colors} from '../../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SERVER_URL} from '@env'

const CARD_WIDTH = sizes.width - 80;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

export default function TopFutsalCarousel({list, navigation}) {
  const [myData, setMyData] = useState(null);

 
 
 
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
            onPress={() => navigation.navigate('FutsalInfo')}
            style={{
              marginLeft: spacing.l,
              marginRight: index === list.length - 1 ? spacing.l : 0,
            }}>
            <View style={[styles.card, shadow.dark]}>
          
              <View style={styles.imageBox}>
                <Image source={item.image} style={styles.image} />
              </View>
              <View style={styles.titleBox}>
                <Text style={styles.title}>{item.title}</Text>

                <Text style={styles.location}>
                  <Icon
                    name="map-marker"
                    size={12}
                    color={'orange'}
                    style={{left: 10}}
                  />
                  {item.location}
                </Text>
                <View style={{flexDirection: 'row', top: 3, marginBottom: 4}}>
                  <Image
                    source={require('../Screens/images/stars.png')}
                    style={{height: 10, width: 10, resizeMode: 'cover'}}
                  />
                  <Image
                    source={require('../Screens/images/stars.png')}
                    style={{height: 10, width: 10, resizeMode: 'cover'}}
                  />
                  <Image
                    source={require('../Screens/images/stars.png')}
                    style={{height: 10, width: 10, resizeMode: 'cover'}}
                  />
                  <Image
                    source={require('../Screens/images/stars.png')}
                    style={{height: 10, width: 10, resizeMode: 'cover'}}
                  />
                </View>

                <Text style={styles.description}>{item.description}</Text>
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
    
  },
  imageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: sizes.radius,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    resizeMode: 'cover',
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
