import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FutsalProfileScreen({ navigation, route }) {
  const { email = '', role = '', profilePicture = '', uploadedImages = [] } = route.params || {};

  const [isEditing, setIsEditing] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState(profilePicture);
  const [newUploadedImages, setNewUploadedImages] = useState(uploadedImages || []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('LoginScreen');
  };

  const handleImagePicker = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    })
      .then((images) => {
        setNewUploadedImages(images.map((img) => img.path));
      })
      .catch((error) => console.log('Image Picker Error: ', error));
  };

  const handleProfilePicture = () => {
    ImagePicker.openPicker({
      cropping: true,
      mediaType: 'photo',
    })
      .then((image) => {
        setNewProfilePicture(image.path);
      })
      .catch((error) => console.log('Profile Picture Error: ', error));
  };

  const handleSaveProfile = () => {
    // Save the updated profile info to backend or AsyncStorage
    setIsEditing(false);
  };

  if (!email) {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <Text style={styles.errorText}>Profile data is missing.</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={isEditing ? handleProfilePicture : null}>
            <Image
              source={{ uri: newProfilePicture || 'https://via.placeholder.com/150' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <Text style={styles.profileName}>{email}</Text>
          <Text style={styles.profileRole}>{role}</Text>
        </View>

        {isEditing ? (
          <View>
            <TextInput
              placeholder="Email"
              value={email}
              editable={false}
              style={styles.input}
            />

            <Button title="Upload Images" onPress={handleImagePicker} />
            <ScrollView horizontal style={styles.imageContainer}>
              {newUploadedImages.map((image, index) => (
                <Image key={index} source={{ uri: image }} style={styles.uploadedImages} />
              ))}
            </ScrollView>

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
              <Text style={styles.saveButtonText}>Save Profile</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.label}>Uploaded Images</Text>
            <ScrollView horizontal style={styles.imageContainer}>
              {uploadedImages.map((image, index) => (
                <Image key={index} source={{ uri: image }} style={styles.uploadedImages} />
              ))}
            </ScrollView>

            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#E6E6E6',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileRole: {
    fontSize: 16,
    color: '#666',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  uploadedImages: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  editButton: {
    backgroundColor: '#FF7F32',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  saveButton: {
    backgroundColor: '#28A745',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: '#DC3545',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  errorText: {
    color: '#DC3545',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});
