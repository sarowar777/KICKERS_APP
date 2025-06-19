import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {sizes, spacing, shadow, colors} from '../../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TOP_BOOKING} from '../../data/constList';
import MyMatchList from './MyMatchList';
import {SERVER_URL} from '@env';

export default function MyGame(props) {
  const [matchData, setMatchData] = useState([]);
  const {navigation, route} = props;
  const {token} = route.params;

  const getData = async () => {
    try {
      const url = 'http://192.168.1.66:8001/match-requests';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMatchData(data.result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    getData();
  }, [matchData]);
  const handleDelete = id => {
    setMatchData(prevData => prevData.filter(item => item.id !== id));
  };

  return (
    <View style={{flex: 1, backgroundColor: '#E6E6E6'}}>
      <MyMatchList
        list={matchData}
        token={token}
        onDelete={handleDelete}
        navigation={navigation}
      />
    </View>
  );
}
