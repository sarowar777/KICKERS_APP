import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileScreen = () => {
  // Dummy user data
  const user = {
    name: 'Sarowar Malla',
    email: 'sarowarmalla@gmail.com',
    phone: '9862250992',
    bookingsCompleted: 2,
    matchesCompleted: 5,
    profilePicture: require('../Screens/images/saro.jpg'), // Replace with actual path to profile picture
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={user.profilePicture} style={styles.profilePicture} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.phone}>{user.phone}</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.bookingsCompleted}</Text>
          <Text style={styles.statLabel}>Bookings Completed</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.matchesCompleted}</Text>
          <Text style={styles.statLabel}>Matches Completed</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton}>
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  statLabel: {
    fontSize: 14,
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
