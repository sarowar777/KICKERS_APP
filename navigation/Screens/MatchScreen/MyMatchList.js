import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {sizes, spacing, shadow, colors} from '../../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SERVER_URL} from '@env';

const CARD_WIDTH = sizes.width - 80;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

export default function MyMatchList(props) {
  const {list, navigation, token, onDelete} = props;
  const formatTime = timeString => {
    const [hour, minute] = timeString.split(':');
    let hours = parseInt(hour, 10);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 24-hour time to 12-hour time
    return `${hours}:${minute} ${ampm}`;
  };

  // Function to handle delete button press
  const handleDelete = id => {
    Alert.alert(
      'Delete Match',
      'Are you sure you want to delete this match?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteMatch(id)}, // Call deleteMatch if OK is pressed
      ],
      {cancelable: false},
    );
  };

  // Function to delete the match
  const deleteMatch = async id => {
    try {
      const url = `http://192.168.1.66:8001/match-requests/${id}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // If deletion is successful, call the onDelete function passed from parent
      onDelete(id);
    } catch (error) {
      console.error('Error deleting match:', error);
    }
  };
  return (
    <FlatList
      data={list}
      snapToInterval={CARD_WIDTH_SPACING}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      keyExtractor={i => i.id.toString()} // Convert id to string
      style={{borderWidth: 0, flex: 1, marginBottom: 70}}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => {
        return (
          <View style={[styles.card, shadow.dark]}>
            <View style={{flexDirection: 'row', flex: 2.5}}>
              <View
                style={{
                  height: 120,
                  width: 170,
                  left: 20,
                  top: 20,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Icon name="map-marker" size={20} style={{color: 'black'}} />
                  <Text style={{color: 'black', left: 10}}>
                    {item.futsalName}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', top: 20}}>
                  <Icon name="calendar" size={16} style={{color: 'black'}} />
                  <Text style={{color: 'black', left: 10}}>
                    {item.matchDate}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', top: 40}}>
                  <Icon name="clock-o" size={20} style={{color: 'black'}} />
                  <Text style={{color: 'black', left: 10}}>
                    {formatTime(item.startTime)} - {formatTime(item.endTime)}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', top: 60, width: 230}}>
                  <Icon name="futbol-o" size={18} style={{color: 'black'}} />
                  <Text style={{color: 'black', left: 10}}>
                    {item.futsalType} | {item.matchType}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                gap: 20,
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                style={{
                  width: 100,
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
                onPress={() =>
                  navigation.navigate('CreateGameScreen', {match: item, token})
                }>
                <View
                  style={{
                    height: 40,
                    width: 100,
                    backgroundColor: '#01B460',
                    borderRadius: 10,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>
                    EDIT
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 100,
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
                onPress={() => handleDelete(item.id)}>
                <View
                  style={{
                    height: 40,
                    width: 100,
                    backgroundColor: '#C11919',
                    borderRadius: 10,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>
                    DELETE
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: 260,
    marginVertical: 10,
    backgroundColor: '#FEFEFE',
    borderRadius: 16,
    alignSelf: 'center',
  },

  titleBox: {
    position: 'absolute',
    top: CARD_HEIGHT - 80,
    left: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.white,
  },
  location: {
    fontSize: 10,
    color: colors.white,
  },
  description: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.white,
    //
  },
});
