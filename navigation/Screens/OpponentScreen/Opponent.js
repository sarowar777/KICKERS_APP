import {View, Text, TouchableOpacity, Modal} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import OpponentList from '../OpponentList';
import {BOOKINGS, TOP_GAME} from '../../data/constList';
import {SERVER_URL} from '@env';

export default function Opponent(props) {
  const {navigation, route} = props;
  const {token} = route.params;

  const [matchData, setMatchData] = useState([]);
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
  }, []);
  const [searchText, setSearchText] = useState('');

  const handleClearInput = () => {
    setSearchText('');
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState(0);
  const [isavailModal, setIsAvailModal] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Select Date');

  {
    /* time picker */
  }
  const [isStartTimePickerVisible, setIsStartTimePickerVisible] =
    useState(false);
  const [isEndTimePickerVisible, setIsEndTimePickerVisible] = useState(false);
  const showStartTimePicker = () => {
    setIsStartTimePickerVisible(true);
  };
  const [selectedStartTime, setSelectedStartTime] = useState('Start Time');
  const [selectedEndTime, setSelectedEndTime] = useState('End Time');
  const hideStartTimePicker = () => {
    setIsStartTimePickerVisible(false);
  };

  const showEndTimePicker = () => {
    setIsEndTimePickerVisible(true);
  };

  const hideEndTimePicker = () => {
    setIsEndTimePickerVisible(false);
  };
  const handleConfirmStartTime = date => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedTime =
      formattedHours + ':' + formattedMinutes + ' ' + period;
    setSelectedStartTime(formattedTime);
    hideStartTimePicker();
  };

  const handleConfirmEndTime = date => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedTime =
      formattedHours + ':' + formattedMinutes + ' ' + period;
    setSelectedEndTime(formattedTime);
    hideEndTimePicker();
  };

  {
    /* date picker */
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const currentDate = new Date();

    if (date < currentDate) {
      alert('Cannot select past dates');
      setSelectedDate('Select Date');
      // Show date picker modal again
      showDatePicker();
      return;
    }

    const options = {weekday: 'long', month: 'short', day: '2-digit'};
    const formattedDate = date.toLocaleDateString('en-US', options);
    setSelectedDate(formattedDate);
    hideDatePicker();
  };

  const handleDateSelection = () => {
    // Show date picker modal when clicked again
    showDatePicker();
  };

  const handleReset = () => {
    setSelectedDate('Select Date');
    setSelectedStartTime('Start Time');
    setSelectedEndTime('End Time');
  };
  return (
    <View style={{flex: 1, backgroundColor: '#E6E6E6'}}>
      <View style={{borderWidth: 0, height: 100, backgroundColor: '#FEFEFE'}}>
        <View
          style={{
            borderWidth: 2,
            borderColor: '#D9D9D9',
            backgroundColor: '#FEFEFE',
            top: 15,
            width: 350,
            height: 60,
            alignSelf: 'center',
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateGameScreen', token)}>
            <View
              style={{
                flexDirection: 'row',
                height: 40,
                borderWidth: 0,
                width: 130,
                top: 10,
              }}>
              <Icon
                name="plus"
                size={20}
                style={{color: 'black', top: 5, left: 15}}></Icon>
              <Text style={{color: 'black', left: 20, top: 5}}>
                Create Game
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsAvailModal(true)}>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 0,
                height: 40,
                width: 100,
                top: 10,
                left: 20,
              }}>
              <Icon
                name="filter"
                size={20}
                style={{color: 'black', top: 5, left: 15}}></Icon>
              <Text style={{color: 'black', left: 20, top: 5}}>Filter</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 0,
                height: 40,
                width: 100,
                top: 10,
                left: 30,
              }}>
              <Icon
                name="sort"
                size={20}
                style={{color: 'black', top: 5, left: 15}}></Icon>
              <Text style={{color: 'black', left: 20, top: 5}}>Sort</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={isavailModal}
        onRequestClose={() => setIsAvailModal(false)}
        transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity onPress={() => setIsAvailModal(false)}>
            <View
              style={{
                right: 20,
                top: -15,
                borderRadius: 20,
                backgroundColor: '#FEFEFE',
                width: 30,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  marginRight: 10,
                  marginTop: 10,
                  left: 5,
                  top: -6,
                  color: 'black',
                }}>
                x
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: 600,
              width: 400,
              marginBottom: 5,
              alignSelf: 'center',
              borderRadius: 10,
              backgroundColor: '#FEFEFE',
            }}>
            <View
              style={{
                borderWidth: 2,
                borderColor: '#E9E9E9',
                height: 300,
                width: 380,
                alignSelf: 'center',
                top: 20,
                borderRadius: 10,
              }}>
              <Icon
                name="calendar"
                size={20}
                style={{color: '#434343', left: 10, top: 15}}
              />
              <Text style={{left: 40, top: -7, color: '#434343', fontSize: 16}}>
                Check Venue Availability
              </Text>
              <View
                style={{
                  borderWidth: 0,
                  borderColor: 'red',
                  width: 350,
                  height: 150,
                  top: 10,
                  alignSelf: 'center',
                }}>
                <Text style={{left: 10, color: '#434343'}}>Slot Date</Text>

                <TouchableOpacity onPress={handleDateSelection}>
                  <View
                    style={{
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: '#E9E9E9',
                      top: 10,
                      height: 50,
                      width: 330,
                      left: 10,
                      flexDirection: 'row',
                    }}>
                    <Text style={{top: 10, left: 15, color: '#434343'}}>
                      {selectedDate}
                    </Text>
                    <Icon
                      name="calendar"
                      size={20}
                      style={{
                        right: 10,
                        top: 10,
                        position: 'absolute',
                        color: '#434343',
                      }}></Icon>
                  </View>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                </TouchableOpacity>

                <View
                  style={{
                    borderTopWidth: 2,
                    borderColor: '#E9E9E9',
                    top: 30,
                    height: 100,
                  }}>
                  <Text style={{left: 10, top: 15, color: '#434343'}}>
                    Slot Time
                  </Text>
                  <View
                    style={{
                      borderWidth: 0,
                      borderColor: 'green',
                      top: 0,
                      height: 80,
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      style={{flexDirection: 'row', alignItems: 'center'}}
                      onPress={showStartTimePicker}>
                      <View
                        style={{
                          borderRadius: 10,
                          borderWidth: 2,
                          borderColor: '#E9E9E9',
                          top: 10,
                          height: 50,
                          width: 150,
                          left: 10,
                          flexDirection: 'row',
                        }}>
                        <Text style={{top: 10, left: 15, color: '#434343'}}>
                          {selectedStartTime}
                        </Text>
                        <Icon
                          name="clock-o"
                          size={20}
                          style={{
                            right: 10,
                            top: 10,
                            position: 'absolute',
                            color: '#434343',
                          }}></Icon>
                      </View>
                      <DateTimePickerModal
                        isVisible={isStartTimePickerVisible}
                        mode="time"
                        onConfirm={handleConfirmStartTime}
                        onCancel={hideStartTimePicker}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{flexDirection: 'row', alignItems: 'center'}}
                      onPress={showEndTimePicker}>
                      <View
                        style={{
                          borderRadius: 10,
                          borderWidth: 2,
                          borderColor: '#E9E9E9',
                          top: 10,
                          height: 50,
                          width: 150,
                          left: 30,
                          flexDirection: 'row',
                        }}>
                        <Text style={{top: 10, left: 15, color: '#434343'}}>
                          {selectedEndTime}
                        </Text>
                        <Icon
                          name="clock-o"
                          size={20}
                          style={{
                            right: 10,
                            top: 10,
                            position: 'absolute',
                            color: '#434343',
                          }}></Icon>
                      </View>
                      <DateTimePickerModal
                        isVisible={isEndTimePickerVisible}
                        mode="time"
                        onConfirm={handleConfirmEndTime}
                        onCancel={hideEndTimePicker}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                borderWidth: 0,
                top: 60,
                height: 60,
                width: 400,
                alignSelf: 'center',
                backgroundColor: '#F3F3F3',
                alignItems: 'center',
              }}>
              <Text style={{color: '#4A4C4B', top: 20, fontSize: 14}}>
                {selectedDate} || {selectedStartTime} to {selectedEndTime}
              </Text>
            </View>

            <View
              style={{
                borderWidth: 0,
                borderColor: 'red',
                top: 100,
                height: 120,
                flexDirection: 'row',
              }}>
              <TouchableOpacity onPress={handleReset}>
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: '#E9E9E9',
                    width: 180,
                    height: 80,
                    alignSelf: 'center,',
                    left: 10,
                    top: 20,
                    borderRadius: 20,
                  }}>
                  <Text
                    style={{
                      color: '#424645',
                      fontWeight: 'bold',
                      alignSelf: 'center',
                      top: 25,
                      fontSize: 16,
                    }}>
                    RESET
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View
                  style={{
                    borderWidth: 0,
                    borderColor: 'black',
                    width: 180,
                    height: 80,
                    alignSelf: 'center,',
                    left: 30,
                    top: 20,
                    borderRadius: 20,
                    backgroundColor: '#26A764',
                  }}>
                  <Text
                    style={{
                      color: '#FCFFF6',
                      fontWeight: 'bold',
                      alignSelf: 'center',
                      top: 25,
                      fontSize: 16,
                    }}>
                    SHOW RESULTS
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="fade"
        transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: '#FEFEFE',
              borderTopLeftRadius: 35,
              borderTopRightRadius: 35,
            }}>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <View
                style={{
                  right: 20,
                  top: -35,
                  borderRadius: 20,
                  backgroundColor: '#FEFEFE',
                  width: 30,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    marginRight: 10,
                    marginTop: 10,
                    left: 5,
                    top: -6,
                    color: 'black',
                  }}>
                  x
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                alignSelf: 'center',
                top: -10,
                height: 120,
                width: 350,
                backgroundColor: '#FEFEFE',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
                Sort By
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  top: 15,
                  borderWidth: 0,
                  borderColor: 'red',
                  height: 40,
                  alignItems: 'center',
                }}>
                <Text style={{color: 'black'}}>Distance</Text>
                <TouchableOpacity onPress={() => setSelectedRadio(2)}>
                  <View
                    style={{
                      height: 25,
                      borderWidth: 2,
                      borderColor: 'black',
                      width: 25,
                      left: 245,
                      borderRadius: 25,
                    }}>
                    {selectedRadio == 2 ? (
                      <View
                        style={{
                          height: 18,
                          borderWidth: 0,
                          borderColor: 'black',
                          width: 18,
                          backgroundColor: '#08C208',
                          borderRadius: 18,
                          top: 1.5,
                          alignSelf: 'center',
                        }}
                      />
                    ) : null}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <OpponentList navigation={navigation} list={TOP_GAME} />
    </View>
  );
}
