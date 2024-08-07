import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function FutsalRegistrationScreen(props) {
  const {navigation}=props;
  const [selectedRadio, setSelectedRadio] = useState(0);
  //timee
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

  //ameneties
  const [inputs, setInputs] = useState([{key: '', value: ''}]);
  const addInput = () => {
    setInputs([...inputs, {key: '', value: ''}]);
  };

  const handleInputChange = (text, index) => {
    const newInputs = [...inputs];
    newInputs[index].value = text;
    setInputs(newInputs);
  };

  const removeInput = index => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  return (
    <ScrollView style={styles.container}>
      <Text
        style={{
          color: '#F95609',
          alignSelf: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 50,
        }}>
        Registration Screen
      </Text>
      <View style={styles.subContainer}>
        <Text style={{color: 'black', padding: 15}}>
          *Please Fill The Form Before Proceeding
        </Text>
        <View style={styles.form}>
          <View style={styles.formField}>
            <Text style={styles.formText}>Futsal Name</Text>
            <TextInput style={styles.formTextInput} />
          </View>
          <View style={styles.formField}>
            <Text style={styles.formText}>Pan Number</Text>
            <TextInput
              style={styles.formTextInput}
              keyboardType="numeric"
              maxLength={9}
            />
          </View>
          <View style={styles.formField}>
            <Text style={styles.formText}>Phone Number</Text>
            <TextInput
              style={styles.formTextInput}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>
          <View style={styles.formField}>
            <Text style={styles.formText}>Address</Text>
            <TextInput style={styles.formTextInput} />
          </View>
          <View style={styles.formField}>
            <Text style={styles.formText}>Futsal Type</Text>
            <View
              style={{
                flexDirection: 'row',
                top: 10,
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
                top: 10,
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
                    left: 25,
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
          <View style={styles.formField}>
            <Text style={styles.formText}>Time</Text>
            <View
              style={{
                borderWidth: 0,
                width: 320,
                gap: 12,
                left: -8,
                top: 10,
                height: 60,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={showStartTimePicker}>
                <View
                  style={{
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: '#D9D9D9',
                    top: 0,
                    height: 50,
                    width: 150,

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
                style={{flexDirection: 'row'}}
                onPress={showEndTimePicker}>
                <View
                  style={{
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: '#D9D9D9',
                    top: 0,
                    height: 50,
                    width: 150,
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
          <View style={styles.formField}>
            <Text style={styles.formText}>Amenities</Text>
            {inputs.map((input, index) => (
              <View key={index} style={styles.inputContainer}>
                <TextInput
                  placeholder={`Input ${index + 1}`}
                  value={input.value}
                  onChangeText={text => handleInputChange(text, index)}
                  style={styles.formTextInput}
                />
                <TouchableOpacity onPress={() => removeInput(index)}>
                  <Icon
                    name="trash"
                    size={20}
                    color="red"
                    style={{marginLeft: 10, marginTop: 15}}
                  />
                </TouchableOpacity>
              </View>
            ))}
            
            
          </View>
          <View style={[styles.formBtn]}>
            <TouchableOpacity onPress={addInput}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Add Input</Text>
              </View>
            </TouchableOpacity>
          </View> 
          <View style={styles.formField}>
            <Text style={styles.formText}>Standard Price</Text>
            <TextInput style={styles.formTextInput} keyboardType='numeric' />
          </View> 
          <View style={styles.formBtn}>
          <TouchableOpacity onPress={()=>navigation.navigate("FutsalScreens")}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </View>
          </TouchableOpacity>
          </View> 
         
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    marginTop: 30,
    borderTopWidth: 2,
    borderColor: '#F95609',
    backgroundColor: '#E5E5E5',
  },
  form: {
    flex: 1,
    width: 340,
    borderWidth: 0,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#FEFEFE',
  },
  formField: {
    flex: 0,
    rowGap: 8,
    left: 20,
    marginTop: 20,
    
  },
  formText: {
    color: '#F95609',
    left: 5,
    fontSize: 15,
    fontWeight: 'bold',
  },
  formTextInput: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#CDCDCD',
    width: 300,
    color: 'black',
    fontSize: 14,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#F95609',
    borderRadius: 10,
   
    height: 50,
    width: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  formBtn:{
    borderWidth:0,
    alignSelf:'center',
    justifyContent:'center',
    marginTop:10
  }
});
