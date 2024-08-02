import {View, Text, Image, TouchableOpacity, ScrollView,Button} from 'react-native';
import React, {useState,useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { EsewaSdk } from 'rn-nepal-payment';
export default function BookFutsal({navigation}) {
  const [selectedRadio, setSelectedRadio] = useState(0);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false); 
  const [selectedDate, setSelectedDate] = useState('Select Date');
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
    checkDateAvailability(formattedDate); // Check date availability
    hideDatePicker();
  };

  const handleDateSelection = () => {
    // Show date picker modal when clicked again
    showDatePicker();
  };

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
    const formattedTime = formattedHours + ':' + formattedMinutes + ' ' + period;
    setSelectedEndTime(formattedTime);
    hideEndTimePicker();
  };
  // Function to calculate the duration in hours between two time strings
  const calculateHoursDifference = (startTime, endTime) => {
    // Parse the time strings to get the hour and minute components
    const startHour = parseInt(startTime.split(':')[0], 10);
    const startMinute = parseInt(startTime.split(':')[1], 10);
    const endHour = parseInt(endTime.split(':')[0], 10);
    const endMinute = parseInt(endTime.split(':')[1], 10);
  
    // Adjust end time if it's before start time
    if (endHour < startHour || (endHour === startHour && endMinute < startMinute)) {
      endHour += 24; // Assuming end time is on the next day
    }
  
    // Calculate the difference in hours and minutes
    let hours = endHour - startHour;
    let minutes = endMinute - startMinute;
  
    // Adjust hours and minutes if necessary
    if (minutes < 0) {
      hours--;
      minutes += 60;
    }
  
    // Calculate the total time difference in hours
    const totalTimeDifference = hours + minutes / 60;
  
    return totalTimeDifference;
  };
  const [bookingHours, setBookingHours] = useState(0);
  const handleBooking = () => {
    const hours = calculateHoursDifference(selectedStartTime, selectedEndTime);
    if (hours >= 0) {
      console.log('Total Hours:', hours);
      // Perform booking logic here
      setBookingHours(hours); // Store hours in component state
     
    } else {
      console.log('Invalid time selection');
    }
  };
  
  const handleBookPress = () => {
     setIsConfirmationVisible(true); // Show confirmation message
      setTimeout(() => {
        setIsConfirmationVisible(false); // Hide confirmation message after certain duration
        navigation.navigate('MainTabs'); // Navigate to BookScreen
      }, 3000); // 3000 milliseconds or 3 seconds
  };
  
  
  useEffect(() => {
    if (selectedStartTime !== 'Start Time' && selectedEndTime !== 'End Time') {
      handleBooking();
    }
  }, [selectedStartTime, selectedEndTime]);

  const [isVisible, setisVisible] = React.useState(false);
  const [response, setResponse] = React.useState('');

  const _onPaymentComplete = (response) => {
    setResponse(response);
    setisVisible(false);
    return
  }



  const [isDateAvailable, setIsDateAvailable] = useState(false);

  // Function to check if the selected date is available in Firestore
  const checkDateAvailability = async (selectedDate) => {
    const futsalRef = firebase.firestore().collection('Booking_Slot').doc('dhukhu');
    const snapshot = await futsalRef.get();
    if (snapshot.exists) {
      const data = snapshot.data();
      if (data[selectedDate]) {
        // Date is available
        setIsDateAvailable(true);
      } else {
        // Date is not available
        setIsDateAvailable(false);
      }
    } else {
      // Futsal not found or error occurred
      setIsDateAvailable(false);
    }
  };

  

  return (
    <View style={{flex: 1}}>
      <ScrollView> 
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../Screens/images/left.png')}
          style={{
            height: 40,
            width: 40,
            left: 15,
            top: 20,
            resizeMode: 'cover',
          }}
        />
      </TouchableOpacity>
      <Text
        style={{
          color: 'black',
          fontSize: 26,
          fontWeight: 'bold',
          left: 25,
          top: 45,
        }}>
        Book A Game
      </Text>
      <View
        style={{
          borderBottomWidth: 2,
          borderColor: '#D9D9D9',
          top: 50,
          height: 120,
        }}>
        <Text style={{left: 30, top: 20, color: '#434343'}}>Slot Date</Text>
        <TouchableOpacity onPress={handleDateSelection}>
        <View style={[styles.datePickerContainer]}>
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
      </View>
      <View
        style={{
          borderBottomWidth: 2,
          borderColor: '#D9D9D9',
          top: 50,
          height: 120,
        }}>
        <Text style={{left: 30, top: 20, color: '#434343'}}>Slot Time</Text>
        <View
          style={{borderWidth: 0, top: 20, height: 70, flexDirection: 'row'}}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={showStartTimePicker}>
            <View
              style={{
                borderRadius: 10,
                borderWidth: 2,
                borderColor: '#D9D9D9',
                top: 0,
                height: 50,
                width: 150,
                left: 30,
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
                borderColor: '#D9D9D9',
                top: 0,
                height: 50,
                width: 150,
                left: 60,
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
      <View
        style={{
          borderBottomWidth: 2,
          borderColor: '#D9D9D9',
          top: 50,
          height: 150,
        }}>
        <Text style={{left: 30, top: 20, color: '#434343'}}>Futsal Type</Text>
        <View
          style={{
            flexDirection: 'row',
            top: 30,
            borderWidth: 0,
            borderColor: 'red',
            height: 40,
            alignItems: 'center',
            left: 35,
          }}>
          <Text style={{color: '#434343', fontSize: 18}}>5a Side </Text>
          <TouchableOpacity onPress={() => setSelectedRadio(1)}>
            <View
              style={{
                height: 25,
                borderWidth: 2,
                borderColor: 'black',
                width: 25,
                left: 20,
                borderRadius: 25,
              }}>
              {selectedRadio == 1 ? (
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
        <View
          style={{
            flexDirection: 'row',
            top: 35,
            borderWidth: 0,
            borderColor: 'red',
            height: 40,
            alignItems: 'center',
            left: 35,
          }}>
          <Text style={{color: '#434343', fontSize: 18}}>7a Side</Text>
          <TouchableOpacity onPress={() => setSelectedRadio(2)}>
            <View
              style={{
                height: 25,
                borderWidth: 2,
                borderColor: 'black',
                width: 25,
                left: 30,
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
      <View
        style={{
          borderBottomWidth: 2,
          borderColor: '#D9D9D9',
          top: 50,
          height: 200,
        }}>
        <View
          style={{borderWidth: 0, top: 0, height: 50, flexDirection: 'row'}}>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              left: 20,
              top: 10,
              fontSize: 16,
            }}>
            Payment Method
          </Text>
          <View
            style={{
              borderWidth: 0,
              position: 'absolute',
              right: -10,
              height: 40,
              width: 200,
              flexDirection: 'row',
            }}>
            <TouchableOpacity>
              <Text
                style={{
                  color: '#DE2A2A',
                  fontWeight: 'bold',
                  left: 20,
                  top: 10,
                  fontSize: 16,
                }}>
                View All Method
              </Text>
              <Icon
                name="angle-right"
                size={20}
                style={{
                  color: '#DE2A2A',
                  position: 'absolute',
                  right: -35,
                  top: 12,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            borderWidth: 0,
            height: 120,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'black',
                height: 100,
                width: 170,
                left: 15,
              }}>
              <Image
                source={require('../Screens/images/esewa1.png')}
                style={{
                  resizeMode: 'cover',
                  height: 35,
                  width: 35,
                  alignSelf: 'center',
                  top: 10,
                }}
              />
              <Text style={{color: 'black', alignSelf: 'center', top: 20}}>
                eSewa Mobile Wallet
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'black',
                height: 100,
                width: 170,
                left: 45,
              }}>
              <Image
                source={require('../Screens/images/khalti.png')}
                style={{
                  resizeMode: 'cover',
                  height: 55,
                  width: 55,
                  alignSelf: 'center',
                }}
              />
              <Text style={{color: 'black', alignSelf: 'center', top: 0}}>
                Khalti Mobile Wallet
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{
         borderBottomWidth: 2,
         borderColor: '#D9D9D9',
         top: 50,
         height: 150,
      }}>
         <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              left: 20,
              top: 10,
              fontSize: 16,
            }}>
            Bill Summary
          </Text>
          <View style={{borderWidth:0,top:30,height:40,flexDirection:'row'}}>
            <Text style={{color:'black',left:20,top:5}}>Per Hour Rate</Text>
            <Text style={{color:'black',right:20,top:5,position:'absolute'}}>NPR 1500</Text>
          </View>
          <View style={{borderWidth:0,top:30,height:40,flexDirection:'row'}}>
            <Text style={{color:'black',left:20,top:5}}>Total Amount</Text>
            <Text style={{color:'black',right:20,top:5,position:'absolute'}}>{bookingHours} x 1500={bookingHours *1500}</Text>
          </View>

      </View>
      <View style={{  borderBottomWidth: 2,
         borderColor: '#D9D9D9',
         top: 50,
         height: 150,}}>
        <View style={{borderWidth:0,top:0,height:80,flexDirection:'row'}}
        >
           <TouchableOpacity onPress={handleBookPress}>
          <View
            style={{
              height: 60,
              width: 160,
              borderWidth: 0,
              top: 10,
              left:235,
              
              backgroundColor: '#F95609',
              borderRadius: 15,
            }}>
            <Text
              style={{
                alignSelf: 'center',
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
                top: 15,
              }}>
              BOOK 
            </Text>
          </View>
        </TouchableOpacity>
          <Text style={{color:'black',left:20,top:5,position:'absolute',fontSize:18}}>NPR {bookingHours *1500}</Text>
        </View>
        {/* <Button
        title={'Esewa test'}
        onPress={() => setisVisible(true)}
        style={{ width: 100, height: 50, backgroundColor: 'red' }}
      />
      {response?.token && <Text>{`ref id: ${response.token}`}</Text>}

      <EsewaSdk
        amt={100} // Amount of product or item or ticket etc
        taxAmt={5} // Tax amount on product or item or ticket etc
        totalAmt={105} // Total payment amount including tax, service and deliver charge. [i.e tAmt = amt + txAmt + psc + tAmt]
        env={'EPAYTEST'} // Merchant code provided by eSewa
        testMode={true} // Boolean value for enabling test endpoint and real payment gateway
        isVisible={isVisible} // Bool to show modal
        onPaymentComplete={_onPaymentComplete} //  Callback from connectips Web Sdk
        pid={"ee2c3ca1-696b-4cc5-a6be-2c40d929d43"} // A unique ID of product or item or ticket etc
        failureURL={`http://merchant.com.np/page/esewa_payment_failed?q=fu`} // Failure URL: a redirect URL of merchant application where customer will be redirected after FAILURE or PENDING transaction
        successURL={`http://merchant.com.np/page/esewa_payment_success?q=su`} // Success URL: a redirect URL of merchant application where customer will be redirected after SUCCESSFUL transaction
        psc={0} // Product service charge amount
        pdc={0} // Product delivery charge amount
      /> */}
      </View>
      </ScrollView>
      {isConfirmationVisible && (
        <View style={styles.confirmationContainer}>
          <Text style={styles.confirmationText}>Your booking request was submitted. Please wait for confirmation.</Text>
        </View>
          )}
    </View>
  );
}
const styles = {
  datePickerContainer:{
    borderRadius: 10,
              borderWidth: 2,
              borderColor: '#D9D9D9',
              top: 25,
              height: 50,
              width: 330,
              left: 30,
              flexDirection: 'row',
              
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
};