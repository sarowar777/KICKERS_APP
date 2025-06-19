import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {SERVER_URL} from '@env';

const ProfileScreen = props => {
  const {navigation, route} = props;
  const [user, setUser] = useState(null);
  const {token} = route.params; // Get the token from route params

  const getProfile = async () => {
    try {
      const url = 'http://192.168.1.66:8001/profile';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setUser({
        ...data.result,
        image: data.result.image
          ? {
              uri: `http://192.168.1.66:8001/assets/user-images/${data.result.image}`,
            }
          : require('../../assets/pictures/avatar.png'), // Set the default picture
      });
      console.log(user);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token'); // Clear the token from AsyncStorage
      navigation.reset({
        index: 0,
        routes: [{name: 'LoginScreen'}], // Navigate to the login screen
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    ); // Show a loading state while the data is being fetched
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        {user.image && (
          <Image
            source={user.image}
            style={styles.profilePicture}
            onError={error =>
              console.error('Error loading image:', error.nativeEvent.error)
            } // Log any image loading errors
          />
        )}
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.phone}>{user.phone}</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('EditProfileScreen', {user, token})}
        style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Icon name="sign-out" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  email: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    color: '#666666',
  },
  editButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    top: 10,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF6347',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    top: 20,
  },
});

export default ProfileScreen;
