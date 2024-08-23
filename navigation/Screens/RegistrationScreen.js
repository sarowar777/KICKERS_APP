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
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SERVER_URL} from '@env';
 


export default function RegistrationScreen(props) {
  const {navigation, route} = props;
  const {role} = route.params; // Retrieve the role parameter

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
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglecPasswordVisibility = () => {
    setcPasswordVisible(!cpasswordVisible);
  };
  const handleFullNameChange = text => {
    setFullName(text);
    if (text) {
      setFullNameError(false);
    }
  };

  const handleEmailChange = text => {
    setEmail(text);
    if (text) {
      setEmailError(false);
    }
  };

  const handlePhoneNumberChange = text => {
    setPhoneNumber(text);
    if (text) {
      setPhoneNumberError(false);
    }
  };

  const handlePasswordChange = text => {
    setPassword(text);
    if (text) {
      setPasswordError(false);
    }
  };

  const handleConfirmPasswordChange = text => {
    setConfirmPassword(text);
    if (text) {
      setcPasswordError(false);
    }
  };
  const saveData = async () => {
    // Reset all error states and general error message
    setFullNameError(false);
    setEmailError(false);
    setPhoneNumberError(false);
    setPasswordError(false);
    setcPasswordError(false);
    setError(null);

    // Initialize a flag to track if there are any errors
    let hasError = false;

    // Validate required fields and set error states
    if (!fullName) {
      setFullNameError(true);
      hasError = true;
    }
    if (!email) {
      setEmailError(true);
      hasError = true;
    }
    if (!phoneNumber) {
      setPhoneNumberError(true);
      hasError = true;
    }
    if (!password) {
      setPasswordError(true);
      hasError = true;
    }
    if (!confirmPassword) {
      setcPasswordError(true);
      hasError = true;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordError(true);
      setcPasswordError(true);
      setError('Passwords do not match.');
      hasError = true;
    }

    // If there are validation errors, stop further processing
    if (hasError) return;

    // Proceed with registration if no errors
    const url = 'http://192.168.1.68:8001/register';
    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          email,
          phone: phoneNumber,
          password: confirmPassword,
          roleId: role, // Include the role value in the request body
        }),
      });

      let result = await response.json();
      if (result) {
        // console.warn('Data added');
        setIsConfirmationVisible(true) // Show the success modal
      }
    } catch (error) {
      // Handle any errors that occur during the fetch
      console.error('Registration failed:', error);
      setError('An error occurred during registration.');
    }
  };
  // Redirect to login screen after 2 seconds of showing the success modal
  useEffect(() => {
    if (isConfirmationVisible) {
      const timer = setTimeout(() => {
        setIsConfirmationVisible(false);
        navigation.navigate('LoginScreen', {role});
      }, 2000);
      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [isConfirmationVisible]);
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', backgroundColor: '#E6E6E6'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
        <View>
          <Image
            source={require('../Screens/images/kickers.png')}
            style={{width: 250, height: 250, alignSelf: 'center'}}
          />
        </View>

        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Register
        </Text>

        {/* Social Media Login Buttons */}
        {/* (Your code for social media buttons) */}
  

        {/* Full Name Input */}
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: fullNameError ? 'red' : '#ccc',
            borderBottomWidth: 1,
            marginBottom: 25,
          }}>
          <Icon
            name="user"
            size={25}
            style={{marginRight: 5, color: fullNameError ? 'red' : 'black'}}
          />
          <GestureHandlerRootView>
            <TextInput
              placeholder="Full Name"
              placeholderTextColor={fullNameError ? 'red' : 'black'}
              style={styles.textInputs}
              value={fullName}
              onChangeText={handleFullNameChange}
            />
          </GestureHandlerRootView>
        </View>

        {/* Email Input */}
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: emailError ? 'red' : '#ccc',
            borderBottomWidth: 1,
            marginBottom: 25,
          }}>
          <Icon
            name="envelope"
            size={20}
            style={{marginRight: 5, color: emailError ? 'red' : 'black'}}
          />
          <GestureHandlerRootView>
            <TextInput
              placeholder="Email"
              placeholderTextColor={emailError ? 'red' : 'black'}
              value={email}
              style={styles.textInputs}
              keyboardType="email-address"
              onChangeText={handleEmailChange}
            />
          </GestureHandlerRootView>
        </View>

        {/* Phone Number Input */}
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: phoneNumberError ? 'red' : '#ccc',
            borderBottomWidth: 1,
            marginBottom: 25,
          }}>
          <Icon
            name="phone"
            size={25}
            style={{marginRight: 5, color: phoneNumberError ? 'red' : 'black'}}
          />
          <GestureHandlerRootView>
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor={phoneNumberError ? 'red' : 'black'}
              value={phoneNumber}
              style={styles.textInputs}
              keyboardType="numeric"
              maxLength={10}
              onChangeText={handlePhoneNumberChange}
            />
          </GestureHandlerRootView>
        </View>

        {/* Password Input */}
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: passwordError ? 'red' : '#ccc',
            borderBottomWidth: 1,
            marginBottom: 25,
          }}>
          <Icon
            name="lock"
            size={25}
            style={{marginRight: 5, color: passwordError ? 'red' : 'black'}}
          />
          <GestureHandlerRootView>
            <TextInput
              placeholder="Password"
              placeholderTextColor={passwordError ? 'red' : 'black'}
              value={password}
              style={styles.textInputs}
              secureTextEntry={passwordVisible}
              onChangeText={handlePasswordChange}
            />
          </GestureHandlerRootView>
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={{position: 'absolute', right: 10, alignSelf: 'center'}}>
            <Icon
              name={passwordVisible ? 'eye-slash' : 'eye'}
              size={20}
              color={passwordError ? 'red' : 'black'}
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Input */}
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: cPasswordError ? 'red' : '#ccc',
            borderBottomWidth: 1,
            marginBottom: 25,
          }}>
          <Icon
            name="lock"
            size={25}
            style={{marginRight: 5, color: cPasswordError ? 'red' : 'black'}}
          />
          <GestureHandlerRootView>
            <TextInput
              placeholder="Confirm Password"
              value={confirmPassword}
              placeholderTextColor={cPasswordError ? 'red' : 'black'}
              style={styles.textInputs}
              secureTextEntry={cpasswordVisible}
              onChangeText={handleConfirmPasswordChange}
            />
          </GestureHandlerRootView>
          <TouchableOpacity
            onPress={togglecPasswordVisibility}
            style={{position: 'absolute', right: 10, alignSelf: 'center'}}>
            <Icon
              name={cpasswordVisible ? 'eye-slash' : 'eye'}
              size={20}
              color={cPasswordError ? 'red' : 'black'}
            />
          </TouchableOpacity>
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          onPress={saveData}
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

        {/* Already registered? Login */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 80,
            top: 30,
          }}>
          <Text style={{color: 'black', top: -30}}>Already registered?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen', {role})}>
            <Text style={{color: '#FF7F32', top: -30}}>Login</Text>
          </TouchableOpacity>
        </View>
        <Text style={{alignSelf: 'center', color: 'black', top: -50}}>
          Or, login with..
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            top: -40,
            justifyContent: 'space-between',
            gap: -50,
          }}>
          <TouchableOpacity
            style={{
              borderColor: '#ddd',
              paddingHorizontal: 38,
              paddingVertical: 10,
            }}>
            <Image
              source={require('../Screens/images/google.png')}
              style={{height: 26, width: 26}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor: '#ddd',
              paddingHorizontal: 38,
              paddingVertical: 10,
            }}>
            <Image
              source={require('../Screens/images/facebook.png')}
              style={{height: 26, width: 26}}
            />
          </TouchableOpacity>
        </View>

        {isConfirmationVisible && (
        <View style={styles.confirmationContainer}>
          <Text style={styles.confirmationText}>
            Registration Completed !!
          </Text>
        </View>
      )}

        
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
  errorText: {
    color: 'red',
    marginLeft: 2,
    top: -10,
  },
  confirmationContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmationText: {
    color: 'white',
    fontSize: 16,
  },
});
