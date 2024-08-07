import React from 'react';
import {
  Text,
  Dimensions,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';

import {SwiperFlatList} from 'react-native-swiper-flatlist';
import Icon from 'react-native-vector-icons/FontAwesome';
import PriceChart from './PriceChart';
import {} from 'react-native-gesture-handler';

export default function FutsalInfo({navigation}) {
  const openMap = () => {
    const query = 'Dhukhu Futsal Hub'; // Change this to your desired search query
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      query,
    )}`;
    Linking.openURL(url);
  };
  return (
    <View style={styles.container}>
      <View>
        <SwiperFlatList
          autoplay
          autoplayDelay={2}
          autoplayLoop
          index={2}
          showPagination>
          <View style={[styles.child]}>
            <ImageBackground
              source={require('../Screens/images/dhukhu2.jpg')}
              style={{height: 260, resizeMode: 'cover'}}
            />
          </View>
          <View style={[styles.child]}>
            <ImageBackground
              source={require('../Screens/images/dhukhu.jpg')}
              style={{height: 260, resizeMode: 'cover'}}
            />
          </View>
          <View style={[styles.child]}>
            <ImageBackground
              source={require('../Screens/images/dhukhu3.jpg')}
              style={{height: 260, resizeMode: 'cover'}}
            />
          </View>
          <View style={[styles.child]}>
            <ImageBackground
              source={require('../Screens/images/dhukhu4.jpg')}
              style={{height: 260, resizeMode: 'cover'}}
            />
          </View>
        </SwiperFlatList>
      </View>
      <ScrollView>
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: '#D9D9D9',
            height: 245,
          }}>
          <Text
            name="title"
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: 'bold',
              left: 15,
              top: 25,
            }}>
            {' '}
            Dhukhu Futsal Hub{' '}
          </Text>

          <View
            style={{
              borderWidth: 0,
              borderColor: 'blue',
              top: 35,
              height: 30,
              width: 220,
              left: 20,
              flexDirection: 'row',
            }}>
            <Icon
              name="clock-o"
              size={22}
              style={{color: 'black', left: 10}}></Icon>
            <Text style={{color: 'black', left: 20, fontWeight: 'bold'}}>
              06:00 AM - 08:00 PM
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('PriceChart')}>
              <View
                style={{
                  borderWidth: 2,
                  borderColor: '#D9D9D9',
                  left: 70,
                  width: 100,
                  top: -40,
                  height: 50,
                  borderRadius: 8,
                }}>
                <Text
                  style={{
                    color: 'black',
                    alignSelf: 'center',
                    fontSize: 18,
                    top: 8,
                    fontWeight: 'bold',
                  }}>
                  Price
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderWidth: 0,
              borderColor: 'blue',
              top: 40,
              height: 30,
              width: 320,
              left: 20,
              flexDirection: 'row',
            }}>
            <Icon
              name="map-marker"
              size={22}
              style={{color: 'black', left: 13}}></Icon>
            <Text style={{color: 'black', left: 23, fontWeight: 'bold'}}>
               Lamingtan Marg 4, Kathmandu 44600
            </Text>
          </View>
          <View
            style={{
              borderWidth: 0,
              borderColor: 'blue',
              top: 47,
              height: 30,
              width: 220,
              left: 20,
              flexDirection: 'row',
            }}>
            <Icon
              name="phone"
              size={22}
              style={{color: 'black', left: 10}}></Icon>
            <Text style={{color: 'black', left: 22, fontWeight: 'bold'}}>
              01-4535832
            </Text>
          </View>
          <TouchableOpacity onPress={openMap}>
            <View
              style={{
                borderWidth: 2,
                borderColor: '#7F7F7F',
                top: 55,
                height: 50,
                width: 200,
                left: 60,
                flexDirection: 'row',
              }}>
              <Image
                source={require('../Screens/images/mapg.png')}
                style={{
                  resizeMode: 'cover',
                  height: 30,
                  width: 30,
                  top: 5,
                  left: 4,
                }}
              />
              <Text
                style={{
                  color: 'black',
                  alignSelf: 'center',
                  left: 10,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Show in Map
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            borderWidth: 0,
            borderColor: 'red',
            top: 0,
            height: 290,
            width: 390,
            left: 10,
            marginBottom: 10,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: 'bold',
              left: 25,
              top: 15,
            }}>
            Amenities
          </Text>
          <View
            style={{
              borderWidth: 0,
              borderColor: 'blue',
              top: 25,
              height: 50,
              flexDirection: 'row',
            }}>
            <View
              style={{
                backgroundColor: '#D9D9D9',
                height: 30,
                width: 150,
                alignItems: 'center',
                left: 35,
                top: 10,
              }}>
              <Text style={{color: 'black', top: 3}}>Parking</Text>
            </View>
            <View
              style={{
                backgroundColor: '#D9D9D9',
                height: 30,
                width: 150,
                alignItems: 'center',
                left: 55,
                top: 10,
              }}>
              <Text style={{color: 'black', top: 3}}>Restroom</Text>
            </View>
          </View>
          <View
            style={{
              borderWidth: 0,
              borderColor: 'blue',
              top: 25,
              height: 50,
              flexDirection: 'row',
            }}>
            <View
              style={{
                backgroundColor: '#D9D9D9',
                height: 30,
                width: 150,
                alignItems: 'center',
                left: 35,
                top: 10,
              }}>
              <Text style={{color: 'black', top: 3}}>Restaurant</Text>
            </View>
            <View
              style={{
                backgroundColor: '#D9D9D9',
                height: 30,
                width: 150,
                alignItems: 'center',
                left: 55,
                top: 10,
              }}>
              <Text style={{color: 'black', top: 3}}>Swimming Pool</Text>
            </View>
          </View>
          <View
            style={{
              borderWidth: 0,
              borderColor: 'blue',
              top: 25,
              height: 50,
              flexDirection: 'row',
            }}>
            <View
              style={{
                backgroundColor: '#D9D9D9',
                height: 30,
                width: 150,
                alignItems: 'center',
                left: 35,
                top: 10,
              }}>
              <Text style={{color: 'black', top: 3}}>Gym</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('BookFutsal')}>
            <View
              style={{
                height: 60,
                width: 160,
                borderWidth: 0,
                justifyContent: 'center',
                top: 45,
                alignSelf: 'center',
                backgroundColor: '#F95609',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                  
                }}>
                BOOK NOW!
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  child: {width, justifyContent: 'center'},
});
