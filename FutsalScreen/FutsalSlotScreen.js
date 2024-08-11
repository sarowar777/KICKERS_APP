import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Calendar} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';


import {SERVER_URL} from '@env';

const FutsalSlotScreen = ({route}) => {
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [futsalType, setFutsalType] = useState('5ASide');
  const [price, setPrice] = useState('');
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);
  const [currentSlotId, setCurrentSlotId] = useState(null);
  const showStartPicker = () => setStartPickerVisible(true);
  const hideStartPicker = () => setStartPickerVisible(false);
  const showEndPicker = () => setEndPickerVisible(true);
  const hideEndPicker = () => setEndPickerVisible(false);
  

 


  const {token} = route.params;

  const handleSaveSlot = async () => {
    if (!selectedDate || !startTime || !endTime || !price) {
      alert('Please fill all fields');
      return;
    }

   

    // Assume futsalId is available in the route parameters or elsewhere
    const futsalId = 5; // Update with actual futsalId

    const slotData = {
      timeSlots: [
        {
          date: selectedDate, // Ensure this is in the correct format
          startTime: startTime, // Ensure this is in the correct format
          endTime: endTime, // Ensure this is in the correct format
          futsalType: futsalType,
          price: price,
        },
      ],
      futsalId: futsalId,
    };

    const url = `${SERVER_URL}/add-time-slot`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include token here
        },
        body: JSON.stringify(slotData),
      });

      const responseText = await response.text();

      if (response.ok) {
        const result = JSON.parse(responseText); // Parse if JSON is expected
        console.log('Time Slot added successfully:', result);
        // You might need to navigate or update UI here
      } else {
        console.error('Failed to add time slot:', responseText);
      }
    } catch (error) {
      console.error('Error submitting Slot:', error);
    }
  };

  const resetForm = () => {
    setSelectedDate('');
    setStartTime('');
    setEndTime('');
    setFutsalType('5A Side');
    setPrice('');
    setCurrentSlotId(null);
  };

  const handleEditSlot = slot => {
    setSelectedDate(slot.date);
    setStartTime(slot.startTime);
    setEndTime(slot.endTime);
    setFutsalType(slot.futsalType);
    setPrice(slot.price);
    setCurrentSlotId(slot.id);
    setFormVisible(true);
  };

  const handleDeleteSlot = slotId => {
    setSlots(slots.filter(slot => slot.id !== slotId));
  };

  const formatTime = time => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const handleConfirmStartTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
    setStartTime(formattedTime);
    hideStartPicker();
  };
  
  const handleConfirmEndTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
    setEndTime(formattedTime);
    hideEndPicker();
  };
  

  return (
    <View style={styles.container}>
      {isFormVisible ? (
        <>
          <Calendar
            onDayPress={day => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate]: {
                selected: true,
                marked: true,
                selectedColor: '#F95609',
              },
            }}
          />
            <View style={styles.pickerContainer}>
  <TouchableOpacity onPress={showStartPicker}>
    <Text style={styles.input}>
      {startTime ? `Start Time: ${startTime}` : 'Select Start Time'}
    </Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={showEndPicker}>
    <Text style={styles.input}>
      {endTime ? `End Time: ${endTime}` : 'Select End Time'}
    </Text>
  </TouchableOpacity>

  <DateTimePickerModal
    isVisible={isStartPickerVisible}
    mode="time"
    onConfirm={handleConfirmStartTime}
    onCancel={hideStartPicker}
  />

  <DateTimePickerModal
    isVisible={isEndPickerVisible}
    mode="time"
    onConfirm={handleConfirmEndTime}
    onCancel={hideEndPicker}
  />
</View>

          

          <View style={styles.picker}>
            <Text style={styles.label}>Futsal Type:</Text>
            <Button
              title={futsalType}
              color={'#F95609'}
              onPress={() =>
                setFutsalType(futsalType === '5A Side' ? '7A Side' : '5A Side')
              }
            />
          </View>

          <Text style={{color: 'black', fontSize: 16, top: 15}}>Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Price"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
            color={'black'}
          />
          <TouchableOpacity
            style={{
              borderWidth: 0,
              width: 200,
              alignSelf: 'center',
              marginBottom: 10,
            }}
            onPress={handleSaveSlot}>
            <View
              style={{
                borderWidth: 0,
                borderRadius: 10,
                width: 200,
                height: 50,
                alignSelf: 'center',
                justifyContent: 'center',
                backgroundColor: '#F95609',
              }}>
              <Text
                style={{
                  color: 'white',
                  alignSelf: 'center',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Save Slot
              </Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        // <Button title="Update Slot"  color={'#F95609'}onPress={() => setFormVisible(true)} />
        <TouchableOpacity
          style={{
            borderWidth: 0,
            width: 200,
            alignSelf: 'center',
            marginBottom: 10,
          }}
          onPress={() => setFormVisible(true)}>
          <View
            style={{
              borderWidth: 0,
              borderRadius: 10,
              width: 250,
              height: 50,
              alignSelf: 'center',
              justifyContent: 'center',
              backgroundColor: '#F95609',
            }}>
            <Text
              style={{
                color: 'white',
                alignSelf: 'center',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Update Slot
            </Text>
          </View>
        </TouchableOpacity>
      )}

      <FlatList
        data={slots}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.slotItem}>
            <View>
              <Text style={styles.slotText}>{item.date}</Text>
            </View>
            <View>
              <Text style={styles.slotText}>
                {item.startTime} - {item.endTime}
              </Text>
            </View>
            <View>
              <Text style={styles.slotText}>{item.futsalType} </Text>
            </View>
            <View>
              <Text style={styles.slotText}>{item.price}</Text>
            </View>

            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => handleEditSlot(item)}>
                <Icon name="edit" size={20} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteSlot(item.id)}>
                <Icon name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <DateTimePickerModal
        isVisible={isStartPickerVisible}
        mode="time"
        onConfirm={time => {
          setStartTime(formatTime(time));
          setStartPickerVisible(false);
        }}
        onCancel={() => setStartPickerVisible(false)}
      />

      <DateTimePickerModal
        isVisible={isEndPickerVisible}
        mode="time"
        onConfirm={time => {
          setEndTime(formatTime(time));
          setEndPickerVisible(false);
        }}
        onCancel={() => setEndPickerVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
    paddingVertical: 5,
    color: 'black',
  },
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
  },
  label: {
    color: 'black',
    fontSize: 16,
  },
  slotItem: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    color: 'black',
  },
  slotText: {
    color: 'black',
    fontSize: 16,
  },
  buttons: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 15,
  },
  pickerContainer: {
    marginVertical: 10,
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
    paddingVertical: 5,
    color: 'black',
  },
});

export default FutsalSlotScreen;
