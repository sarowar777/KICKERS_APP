import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {} from 'react-native-gesture-handler';
import {colors} from '../constants/theme';

export default function RolesScreen(props) {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Image
          source={require('../Screens/images/kickers.png')}
          style={styles.img}></Image>
      </View>

      <View style={styles.texts}>
        <Text style={{color: 'black', fontSize: 22,alignSelf:'center',fontWeight:'bold'}}>
          Choose Your Role
        </Text>
       
        
      </View>

      <View style={styles.buttonBox}>
        <TouchableOpacity
          style={[styles.role, styles.player]}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text
            style={{color: 'white', alignSelf: 'center', fontWeight: 'bold'}}>
            Player
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.role, styles.owner]}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text
            style={{color: 'black', alignSelf: 'center', fontWeight: 'bold'}}>
            Futsal Owner
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 3,
  },
  imageBox: {
    flex: 1.2,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    marginTop: 10,
  },
  img: {
    resizeMode: 'cover',
    height: 350,
    width: 300,
    
  },
  buttonBox: {
    flex: 1,
    borderWidth: 0,
    borderColor: 'red',
    alignSelf: 'center',
    // justifyContent: 'center',
    rowGap:25
  },
  role: {
    borderRadius: 8,
    borderWidth: 0,
    alignSelf: 'center',
    width: 200,
    height: 55,
    justifyContent: 'center',
  },
  player: {
    backgroundColor: '#FF7F32',
    color: 'white',
  },
  owner: {
    backgroundColor: '#D9D9D9',
  },
  texts: {
    flex: 0.2,
    alignSelf: 'center',
    // justifyContent: 'center',
    borderWidth:0,
    marginBottom:30
    
  },
});
