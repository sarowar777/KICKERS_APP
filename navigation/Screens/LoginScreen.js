import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function LoginScreen(props) {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const { navigation, route } = props;
  const { role } = route.params;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  


  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://192.168.1.69:8001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
    

      if (response.ok) {
        // Save the token if needed, and navigate to the main tabs
        // For example: await AsyncStorage.setItem('token', result.token);
        const { dataToSend } = result;

        if (dataToSend.role === 'futsal admin') {
          navigation.navigate('FutsalRegistration', { ...dataToSend });
        } else if (dataToSend.role === 'user') {
          navigation.navigate('MainTabs', { ...dataToSend });
        }
      } else {
        Alert.alert('Login Failed', result.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Login Error', 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{ paddingHorizontal: 25 }}>
        <View>
          <Image
            source={require('../Screens/images/kickers.png')}
            style={{ width: 250, height: 250, alignSelf: 'center' }}
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
          Login
        </Text>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            marginBottom: 25,
          }}>
          <Icon
            name="envelope"
            size={20}
            style={{ marginRight: 5, padding: 5, color: 'black' }}
          />
          <GestureHandlerRootView>
            <TextInput
              placeholder="Email"
              placeholderTextColor={'black'}
              style={styles.textInputs}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </GestureHandlerRootView>
        </View>

        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            marginBottom: 25,
          }}>
          <Icon
            name="lock"
            size={25}
            style={{ marginRight: 5, padding: 5, color: 'black' }}
          />
          <GestureHandlerRootView>
            <TextInput
              placeholder="Password"
              placeholderTextColor={'black'}
              style={styles.textInputs}
              secureTextEntry={passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
          </GestureHandlerRootView>
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={{ position: 'absolute', right: 10, alignSelf: 'center' }}>
            <Icon
              name={passwordVisible ? 'eye-slash' : 'eye'}
              size={20}
              color={'black'}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#FF7F32',
            paddingTop: 10,
            borderRadius: 10,
            marginBottom: 30,
            height: 50,
            alignContent: 'center',
          }}
          onPress={handleLogin}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 18,
              color: 'white',
            }}>
            Login
          </Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="green" />}

        <TouchableOpacity style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ color: 'black', bottom: 10, fontSize: 12 }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <Text style={{ alignSelf: 'center', color: 'black' }}>
          Or, login with..
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            top: 10,
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
              style={{ height: 26, width: 26 }}
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
              style={{ height: 26, width: 26 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor: '#ddd',
              paddingHorizontal: 38,
              paddingVertical: 10,
            }}>
            <Image
              source={require('../Screens/images/twitter.png')}
              style={{ height: 26, width: 26 }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 80,
            top: 30,
          }}>
          <Text style={{ color: 'black' }}>New to the app?</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('RegistrationScreen', { role })}>
            <Text style={{ color: '#FF7F32' }}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E6E6E6',
  },
  textInputs: {
    height: 38,
    margin: 0,
    color: 'black',
    width: 310,
  },
});
