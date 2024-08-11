// import React, { useState } from 'react';
// import { View, TextInput, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// const EditProfileScreen = ({ navigation, route }) => {
//   const { user } = route.params;
//   const [name, setName] = useState(user.name);
//   const [email, setEmail] = useState(user.email);
//   const [phone, setPhone] = useState(user.phone);
//   const [profilePicture, setProfilePicture] = useState(user.profilePicture);

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setProfilePicture(result.uri);
//     }
//   };

//   const saveChanges = () => {
//     // Handle save changes logic here
//     navigation.goBack();
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={pickImage}>
//         <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
//       </TouchableOpacity>
//       <TextInput
//         style={styles.input}
//         placeholder="Name"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Phone"
//         value={phone}
//         onChangeText={setPhone}
//         keyboardType="phone-pad"
//       />
//       <Button title="Save Changes" onPress={saveChanges} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     alignItems: 'center',
//   },
//   profilePicture: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     marginBottom: 10,
//   },
// });

// export default EditProfileScreen;

import { View, Text } from 'react-native'
import React from 'react'

export default function EditProfileScreen() {
  return (
    <View>
      <Text>EditProfileScreen</Text>
    </View>
  )
}
