import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';

export default function RolesScreen(props) {
  const { navigation } = props;
  

  // const getApiData = async () => {
  //   const url = "http://192.168.1.67:8001/login"; // Use your local IP address
  //   try {
  //     let response = await fetch(url);
  //     response = await response.json();
  //     console.warn(response);
  //     console.warn("Connected");
  //   } catch (error) {
  //     console.error("Fetch error: ", error);
  //   }
  // };

  // useEffect(() => {
  //   getApiData();
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Image
          source={require('../Screens/images/kickers.png')}
          style={styles.img}
        />
      </View>

      <View style={styles.texts}>
        <Text style={{ color: 'black', fontSize: 22, alignSelf: 'center', fontWeight: 'bold' }}>
          Choose Your Role
        </Text>
      </View>

      <View style={styles.buttonBox}>
        <TouchableOpacity
          style={[styles.role, styles.player]}
          onPress={() => navigation.navigate('RegistrationScreen', { role: 1 })}
        >
          <Text style={{ color: 'white', alignSelf: 'center', fontWeight: 'bold' }}>
            Player
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.role, styles.owner]}
          onPress={() => navigation.navigate('RegistrationScreen', { role: 2 })}
        >
          <Text style={{ color: 'black', alignSelf: 'center', fontWeight: 'bold' }}>
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
    rowGap: 25,
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
    borderWidth: 0,
    marginBottom: 30,
  },
});
