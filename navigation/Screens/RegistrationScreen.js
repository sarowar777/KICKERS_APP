import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RegistrationScreen(props) {
  const { navigation, route } = props;
  const { role } = route.params; // Retrieve the role parameter

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [cpasswordVisible, setcPasswordVisible] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [fullNameError, setFullNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [cPasswordError, setcPasswordError] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglecPasswordVisibility = () => {
    csetPasswordVisible(!cpasswordVisible);
  };

  const saveData = async () => {
    if (!fullName) setFullNameError(true); else setFullNameError(false);
    if (!email) setEmailError(true); else setEmailError(false);
    if (!phoneNumber) setPhoneNumberError(true); else setPhoneNumberError(false);
    if (!password) setPasswordError(true); else setPasswordError(false);
    if (!confirmPassword) setcPasswordError(true); else setcPasswordError(false);
    if (!fullName || !email || !phoneNumber || !password || !confirmPassword) return false;

    const url = "http://192.168.1.67:8001/register";
    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name:fullName,
        email,
        phone:phoneNumber,
        password: confirmPassword,
        roleId: role // Include the role value in the request body
      })
    });

    result = await result.json();
    if (result) {
      console.warn("Data added");
      setRegistrationSuccess(true); // Show the success modal
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: '#E6E6E6' }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 25 }}>
        <View>
          <Image
            source={require('../Screens/images/kickers.png')}
            style={{ width: 250, height: 250, alignSelf: 'center' }}
          />
        </View>

        <Text style={{ color: 'black', fontSize: 20, fontWeight: '500', color: '#333', marginBottom: 30 }}>
          Register
        </Text>
        <View style={{ flexDirection: 'row', alignSelf: 'center', top: -20, justifyContent: 'space-between', gap: -50 }}>
          <TouchableOpacity style={{ borderColor: '#ddd', paddingHorizontal: 38, paddingVertical: 10 }}>
            <Image source={require('../Screens/images/google.png')} style={{ height: 26, width: 26 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ borderColor: '#ddd', paddingHorizontal: 38, paddingVertical: 10 }}>
            <Image source={require('../Screens/images/facebook.png')} style={{ height: 26, width: 26 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ borderColor: '#ddd', paddingHorizontal: 38, paddingVertical: 10 }}>
            <Image source={require('../Screens/images/twitter.png')} style={{ height: 26, width: 26 }} />
          </TouchableOpacity>
        </View>
        <Text style={{ alignSelf: 'center', color: 'black', top: -10 }}>
          Or, login with..
        </Text>

        <View style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1, marginBottom: 25 }}>
          <Icon name="user" size={25} style={{ marginRight: 5, color: 'black' }} />
          <GestureHandlerRootView>
            <TextInput
              placeholder="Full Name"
              placeholderTextColor={'black'}
              style={styles.textInputs}
              value={fullName}
              onChangeText={text => setFullName(text)}
            />
          </GestureHandlerRootView>
        </View>

        <View style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1, marginBottom: 25 }}>
          <Icon name="envelope" size={20} style={{ marginRight: 5, color: 'black' }} />
          <GestureHandlerRootView>
            <TextInput
              placeholder="Email"
              placeholderTextColor={'black'}
              value={email}
              style={styles.textInputs}
              keyboardType="email-address"
              onChangeText={text => setEmail(text)}
            />
          </GestureHandlerRootView>
        </View>

        <View style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1, marginBottom: 25 }}>
          <Icon name="phone" size={25} style={{ marginRight: 5, color: 'black' }} />
          <GestureHandlerRootView>
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor={'black'}
              value={phoneNumber}
              style={styles.textInputs}
              keyboardType="numeric"
              maxLength={10}
              onChangeText={text => setPhoneNumber(text)}
            />
          </GestureHandlerRootView>
        </View>

        <View style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1, marginBottom: 25 }}>
          <Icon name="lock" size={25} style={{ marginRight: 5, color: 'black' }} />
          <GestureHandlerRootView>
            <TextInput
              placeholder="Password"
              placeholderTextColor={'black'}
              value={password}
              style={styles.textInputs}
              secureTextEntry={passwordVisible}
              onChangeText={text => setPassword(text)}
            />
          </GestureHandlerRootView>
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={{ position: 'absolute', right: 10, alignSelf: 'center' }}
          >
            <Icon
              name={passwordVisible ? 'eye-slash' : 'eye'}
              size={20}
              color={'black'}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1, marginBottom: 25 }}>
          <Icon name="lock" size={25} style={{ marginRight: 5, color: 'black' }} />
          <GestureHandlerRootView>
            <TextInput
              placeholder="Confirm Password"
              value={confirmPassword}
              placeholderTextColor={'black'}
              style={styles.textInputs}
              secureTextEntry={cpasswordVisible}
              onChangeText={text => setConfirmPassword(text)}
            />
          </GestureHandlerRootView>
          <TouchableOpacity
            onPress={togglecPasswordVisibility}
            style={{ position: 'absolute', right: 10, alignSelf: 'center' }}
          >
            <Icon
              name={cpasswordVisible ? 'eye-slash' : 'eye'}
              size={20}
              color={'black'}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={saveData}
          style={{
            backgroundColor: '#FF7F32',
            paddingTop: 10,
            borderRadius: 10,
            marginBottom: 30,
            height: 50,
            alignContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 18,
              color: 'white',
            }}>
            Register
          </Text>
        </TouchableOpacity>
        {error && (
          <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
        )}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 80,
            top: 30,
          }}>
          <Text style={{ color: 'black', top: -30 }}>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: '#FF7F32', top: -30 }}>Login</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={registrationSuccess}
          animationType="slide"
          transparent={true}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
                Registration Successful!
              </Text>
              <Text>Your account has been successfully registered.</Text>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInputs: {
    height: 38,
    top: -5,
    paddingVertical: 0,
    color: 'black',
    borderWidth: 0,
    width: 290,
  },
});
