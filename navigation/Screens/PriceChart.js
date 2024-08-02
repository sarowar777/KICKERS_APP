import {View, Text, Image, TouchableOpacity,StyleSheet} from 'react-native';
import React from 'react';


export default function PriceChart({navigation}) {
  return (
    <View style={{borderWidth: 0, height: 810}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../Screens/images/left.png')}
          style={{
            height: 30,
            width: 30,
            left: 15,
            top: 20,
            resizeMode: 'cover',
          }}
        />
      </TouchableOpacity>
      <View
        style={{borderWidth: 0, top: 25, height: 100, flexDirection: 'row',justifyContent:'center',gap:50}}>
        <Text
          style={{
            color: 'black',
            fontSize: 26,
            fontWeight: 'bold',
            top: 25,
          }}>
          Price Chart
        </Text>
        <TouchableOpacity onPress={()=>navigation.navigate('BookFutsal')}>
          <View
            style={{
              height: 60,
              width: 160,
              borderWidth: 0,
              
              justifyContent:'center',
              top: 20,
              backgroundColor: '#01B460',
              borderRadius: 15,
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
      <View style={{borderWidth: 0, top: 30, height: 120}}>
        <Text
          style={{color: 'black', fontWeight: 'bold', fontSize: 16, left: 15}}>
          Dhukhu Futsal Hub
        </Text>
        <View
          style={{
            borderWidth: 2,
            borderColor: '#D9D9D9',
            borderRadius: 10,
            height: 60,
            width: 360,
            alignSelf: 'center',
            top: 20,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 12,
              alignSelf: 'center',
              top: 15,
            }}>
            Pricing is subjected to change and is controlled by venue
          </Text>
        </View>
      </View>
      <View style={{borderWidth: 0, top: 30, flex:1}}>
        <Text
          style={{
            color: '#1178B2',
            fontWeight: 'bold',
            left: 20,
            top: 10,
            fontSize: 16,
          }}>
          Futsal 5a side
        </Text>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            top: 25,
            left: 20,
            fontSize: 18,
          }}>
          Sunday-Friday
        </Text>
        <View style={styles.dayPrices}>
           <Text style={styles.priceText}>07:00 AM - 02:00 PM</Text>
           <Text style={styles.priceText}>NPR 1500 / hour</Text>
        </View>
        <View style={styles.dayPrices}>
           <Text style={styles.priceText}>02:00 PM - 08:00 PM</Text>
           <Text style={styles.priceText}>NPR 2000 / hour</Text>
        </View>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            top: 45,
            left: 20,
            fontSize: 18,
          }}>
          Saturday
        </Text>
        <View style={{borderBottomWidth:2,borderColor:'#D9D9D9',top:45,height:70,flexDirection:'row',justifyContent:'center',gap:30}}>
           <Text style={styles.priceText}>06:00 AM - 08:00 PM</Text>
           <Text style={styles.priceText}>NPR 2000 / hour</Text>
        </View>
      </View>
    </View>
  );
}
const styles=StyleSheet.create({
  dayPrices:{
    borderBottomWidth:2,borderColor:'#D9D9D9',top:25,height:70,flexDirection:'row',justifyContent:'center',gap:30
  },
  priceText:{
    color:'black',fontSize:16,fontWeight:'bold',top:20
  }
})
