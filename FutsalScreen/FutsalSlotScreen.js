import React, {useEffect, useState} from 'react';
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
import {format} from 'date-fns';
import {SERVER_URL} from '@env';

const FutsalSlotScreen = props => {
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [futsalType, setFutsalType] = useState('FiveA');
  const [price, setPrice] = useState('');
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);
  const [currentSlotId, setCurrentSlotId] = useState(null);
  const {route, navigation} = props;
  const {futsalId, token} = route.params;

  const showStartPicker = () => setStartPickerVisible(true);
  const hideStartPicker = () => setStartPickerVisible(false);
  const showEndPicker = () => setEndPickerVisible(true);
  const hideEndPicker = () => setEndPickerVisible(false);


  const handleCancel=()=>{
    resetForm();
        setFormVisible(false);
  }

  const handleSaveSlot = async () => {
    if (!selectedDate || !startTime || !endTime || !price) {
      alert('Please fill all fields');
      return;
    }

    const futsalID = futsalId; // Update with actual futsalId

    const slotData = {
      timeSlots: [
        {
          date: selectedDate,
          startTime: startTime,
          endTime: endTime,
          futsalType: futsalType,
          price: price,
        },
      ],
      futsalId: futsalID,
    };

    const url = 'http://192.168.1.64:8001/add-time-slot';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(slotData),
      });

      const responseText = await response.text();

      if (response.ok) {
        const result = JSON.parse(responseText);
        console.log('Time Slot added successfully:', result);
        resetForm();
        setFormVisible(false);
        // Update UI or navigate here
      } else {
        console.error('Failed to add time slot:', responseText);
      }
    } catch (error) {
      console.error('Error submitting Slot:', error);
    }
  };

  const resetForm = () => {
    setSelectedDate('');
    setSelectedStartTime('');
    setSelectedEndTime('');
    setStartTime('');
    setEndTime('');
    setFutsalType('FiveA');
    setPrice('');
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

  const handleConfirmStartTime = date => {
    const isoTime = date.toISOString();
    const formattedTime = formatTime(date);
    setStartTime(isoTime);
    setSelectedStartTime(formattedTime);
    hideStartPicker();
  };

  const handleConfirmEndTime = date => {
    const isoTime = date.toISOString();
    const formattedTime = formatTime(date);
    setEndTime(isoTime);
    setSelectedEndTime(formattedTime);
    hideEndPicker();
  };

  //conversion
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return {
      date: format(date, 'yy/MM/dd'),
      time: format(date, 'hh:mm a')
    };
  };
  const getData = async () => {
    const url = `http://192.168.1.64:8001/getTimeSlot/${futsalId}`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
  
      if (response.ok) {
        const result = await response.json();
        

        // console.warn(result)
        setSlots(result.result); // Assuming the response is an array of slots
      } else {
        console.error('Failed to fetch time slots:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };
  
  useEffect(() => {
    getData();
  },[]);
  

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
            <TouchableOpacity
              style={styles.timePicker}
              onPress={showStartPicker}>
              <Text style={styles.input}>
                {selectedStartTime
                  ? `Start Time: ${selectedStartTime}`
                  : 'Start Time'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.timePicker} onPress={showEndPicker}>
              <Text style={styles.input}>
                {selectedEndTime
                  ? `End Time: ${selectedEndTime}`
                  : 'End Time'}
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
                setFutsalType(futsalType === 'FiveA' ? 'SevenA' : 'FiveA')
              }
            />
          </View>
          <View style={styles.amount}>
          <Text style={{color: 'black', fontSize: 16, top: 15}}>Amount:</Text>
          <TextInput
            style={styles.textinput}
            placeholder="Enter Price"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
            color={'black'}
          />
          </View>
          <View style={styles.bottomButton}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveSlot}>
            <View style={styles.saveButtonInner}>
              <Text style={styles.saveButtonText}>Save Slot</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.saveButton,styles.cancel]} onPress={handleCancel}>
            <View style={styles.saveButtonInner}>
              <Text style={styles.saveButtonText}>Cancel</Text>
            </View>
          </TouchableOpacity>
          </View>
          
        </>
      ) : (
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => setFormVisible(true)}>
          <View style={styles.updateButtonInner}>
            <Text style={styles.updateButtonText}>Update Slot</Text>
          </View>
        </TouchableOpacity>
      )}

      <FlatList
        data={slots}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          const formattedDate = formatDateTime(item.date).date;
        const formattedStartTime = formatDateTime(item.startTime).time;
        const formattedEndTime = formatDateTime(item.endTime).time;
          return (
          <View style={styles.slotItem}>
            <View>
              <Text style={styles.slotText}> {formattedDate}</Text>
            </View>
            <View>
              <Text style={styles.slotText}>
              {formattedStartTime} - {formattedEndTime}
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
        )}}
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
  
  picker: {
    height:50,
    borderBottomWidth: 1,
    borderColor:'#D9D9D9',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
  },
  amount:{
    height:50,
    borderBottomWidth: 0,
    borderColor:'#D9D9D9',
    flexDirection: 'row',
    gap: 3,
    alignContent:'center'
  },
  label: {
    color: 'black',
    fontSize: 16,
  },
  slotItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    color: 'black',
  },
  slotText: {
    color: 'black',
    fontSize: 12,
  },
  buttons: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 15,
  },
  pickerContainer: {
    height:70,
    borderBottomWidth: 1,
    borderColor:'#D9D9D9',
    marginVertical: 10,
    flexDirection: 'row',
    gap: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  input: {
    fontSize: 14,
   borderWidth:0,
    height: 50,
    borderColor: 'grey',
     alignSelf:'center',
    paddingVertical: 15,
    
    color: 'black',
  },
  textinput:{
    fontSize: 14,
    alignSelf:'center',
    borderColor:'#D9D9D9',
    borderWidth:2,
    height:40,
    textAlign:'center',
    paddingTop:10,borderRadius:10
  },
  timePicker: {
    borderWidth:2,
    borderRadius:10,
    flex:1,
    borderColor:'#D9D9D9',
    alignSelf:'center',
    alignItems: 'center',
   
  },
  bottomButton:{
    flexDirection:'row',
    alignSelf:'center',
    justifyContent:'center',gap:30
  },
  saveButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#F95609',
    borderRadius: 10,
    alignItems: 'center',
    width:150
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight:'bold'
  },
  cancel:{
    backgroundColor:'red'
  },
  saveButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  updateButton: {
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#F95609',
    borderRadius: 10,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  updateButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default FutsalSlotScreen;
