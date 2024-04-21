import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Animated, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CarpoolingScreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isPickTimeVisible, setPickTimeVisibility] = useState(false);
  const [isDropTimeVisible, setDropTimeVisibility] = useState(false);
  // Initialize startDate, pickTime, and dropTime with new Date() as default values
  const [startDate, setStartDate] = useState(null); // Set initial value to null
  const [pickTime, setPickTime] = useState(null); // Set initial value to null
  const [dropTime, setDropTime] = useState(null); // Set initial value to null
  const [pickLocation, setPickLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [activeDays, setActiveDays] = useState({
    S: true,
    M: false,
    T: false,
    W: false,
    Th: false,
    F: false,
    SA: true,
  });
  const [preference, setPreference] = useState(0); // 0 for One Way, 1 for Two Way
  const animation = useRef(new Animated.Value(0)).current;

  const [choosedPreference, setChoosedPreference] = useState('');
  const [maleQuantity, setMaleQuantity] = useState(0);
  const [femaleQuantity, setFemaleQuantity] = useState(0);
  const formatDate = (date) => date ? date.toLocaleDateString() : '';
  const formatTime = (time) => time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
  useEffect(() => {
    Animated.timing(animation, {
      toValue: preference,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [preference]);

  const sliderPosition = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '50%'],
  });

  const toggleDayButton = (day) => {
    setActiveDays((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleDateChange = (event, selectedDate) => {
    setDatePickerVisibility(Platform.OS === 'ios');
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handlePickTimeChange = (event, selectedTime) => {
    setPickTimeVisibility(Platform.OS === 'ios');
    if (selectedTime) {
      setPickTime(selectedTime);
    }
  };

  const handleDropTimeChange = (event, selectedTime) => {
    setDropTimeVisibility(Platform.OS === 'ios');
    if (selectedTime) {
      setDropTime(selectedTime);
    }
  };

  // Adjust male/female quantities according to preferences
  const changeMaleQuantity = (amount) => {
    if (choosedPreference === 'Mixed' && maleQuantity + amount <= 2 && maleQuantity + amount + femaleQuantity <= 4) {
      setMaleQuantity(maleQuantity + amount);
    } else if (choosedPreference === 'Separate' && maleQuantity + amount <= 4) {
      setMaleQuantity(maleQuantity + amount);
      setFemaleQuantity(0);
    }
  };

  const changeFemaleQuantity = (amount) => {
    if (choosedPreference === 'Mixed' && femaleQuantity + amount <= 2 && maleQuantity + femaleQuantity + amount <= 4) {
      setFemaleQuantity(femaleQuantity + amount);
    } else if (choosedPreference === 'Separate' && femaleQuantity + amount <= 4) {
      setFemaleQuantity(femaleQuantity + amount);
      setMaleQuantity(0);
    }
  };

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Check if the form has already been submitted
    if (submitted) {
      Alert.alert('Error', 'Form already submitted');
      return;
    }

    // Check if any field is empty
    if (
      !startDate ||
      !pickTime ||
      !dropTime ||
      !pickLocation ||
      !dropLocation ||
      !choosedPreference ||
      (maleQuantity === 0 && femaleQuantity === 0)
    ) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Filter out only the selected days (highlighted in blue)
    const selectedDays = Object.keys(activeDays).filter((day) => activeDays[day]);

    // Prepare data for API request
    const data = {
      type: preference === 0 ? 'One Way' : 'Two Way',
      days: selectedDays,
      startDate,
      pickLocation,
      dropLocation,
      pickTime,
      dropTime,
      preference,
      maleQuantity,
      femaleQuantity,
    };

    // Send POST request to API
    fetch('http://192.168.100.12:8082/api/carpooling', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((data) => {
        // Handle success response
        console.log(data);
        Alert.alert('Success', 'Carpooling request added successfully');
        // Set submitted to true to prevent further submissions
        setSubmitted(true);
      })
      .catch((error) => {
        // Handle error
        console.error('Error:', error);
        Alert.alert('Error', 'Failed to add carpooling request');
      });
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5DC',
        position: 'relative',
      }}
    >
      {/* Preference Toggle Switch */}
      <View
        style={{
          flexDirection: 'row',
          width: 325,
          height: 60,
          borderRadius: 20,
          backgroundColor: '#ccc',
          position: 'relative',
          justifyContent: 'center',
          marginBottom: 50,
          overflow: 'hidden',
        }}
      >
        <Animated.View
          style={{
            position: 'absolute',
            width: '50%',
            height: '100%',
            backgroundColor: '#022B42',
            borderRadius: 20,
            left: sliderPosition,
          }}
        />
        <TouchableOpacity
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => setPreference(0)}
        >
          <Text style={{ color: preference === 0 ? 'white' : 'black' }}>ONE WAY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => setPreference(1)}
        >
          <Text style={{ color: preference === 1 ? 'white' : 'black' }}>TWO WAY</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          padding: 15,
          backgroundColor: '#fff',
          borderRadius: 10,

          shadowColor: '#022B42',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
          marginBottom: 40,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {Object.keys(activeDays).map((day) => (
            <TouchableOpacity
              key={day}
              onPress={() => toggleDayButton(day)}
              disabled={day === 'S' || day === 'SA'}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                marginHorizontal: 1,
                backgroundColor: activeDays[day] ? 'white' : '#022B42',
                borderRadius: 20,
                borderColor: day === 'S' || day === 'SA' ? '#022B42' : activeDays[day] ? '#022B42' : 'white',
                borderWidth: 1,
              }}
            >
              <Text
                style={{
                  color: activeDays[day] || day === 'S' || day === 'SA' ? '#022B42' : 'white',
                }}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* DatePicker for selecting the date */}
      <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={{ marginBottom: 20 ,borderRadius: 8,
            padding: 12,backgroundColor:'#022B42'}}>
        <Text style={{ fontSize: 16 ,color: 'white'}}>
          {startDate ? formatDate(startDate) : 'Start ASAP'}
        </Text>
      </TouchableOpacity>
      {isDatePickerVisible && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setStartDate(selectedDate);
            setDatePickerVisibility(false);
          }}
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginBottom: 20,

          width: 360,
        }}
      >
        <TextInput
          style={{
            height: 40,
            width: '60%',
            borderColor: '#022B42',
            borderWidth: 2,
            borderRadius: 5,
            marginBottom: 5,
            paddingHorizontal: 20,
          }}
          placeholder="Pick Location"
          value={pickLocation}
          onChangeText={setPickLocation}
        />

        {/* TimePicker for selecting the pick time */}
        
        <TouchableOpacity onPress={() => setPickTimeVisibility(true)} style={{ marginBottom: 5,borderRadius: 5,
            padding: 10,backgroundColor:'#FDD387' }}>
        <Text style={{ fontSize: 16 }}>
          {pickTime ? formatTime(pickTime) : 'Pick Time'}
        </Text>
      </TouchableOpacity>
      {isPickTimeVisible && (
        <DateTimePicker
          value={pickTime || new Date()}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setPickTime(selectedTime);
            setPickTimeVisibility(false);
          }}
        />
      )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginBottom: 20,
          borderRadius: 10,
          width: 360,
        }}
      >
        <TextInput
          style={{
            height: 40,
            width: '60%',
            borderColor: '#022B42',
            borderWidth: 2,
            borderRadius: 5,
            marginBottom: 10,
            paddingHorizontal: 20,
          }}
          placeholder="Drop Location"
          value={dropLocation}
          onChangeText={setDropLocation}
        />
        {/* TimePicker for selecting the drop time */}
        <TouchableOpacity onPress={() => setDropTimeVisibility(true)} style={{ marginBottom: 10,  borderRadius: 5,
            padding: 10,backgroundColor:'#FDD387' }}>
        <Text style={{ fontSize: 16 }}>
          {dropTime ? formatTime(dropTime) : 'Drop Time'}
        </Text>
      </TouchableOpacity>
      {isDropTimeVisible && (
        <DateTimePicker
          value={dropTime || new Date()}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setDropTime(selectedTime);
            setDropTimeVisibility(false);
          }}
        />
      )}
      </View>
      {/* Preference for Passenger Type (Mixed, Separate) */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ color: 'white', backgroundColor: '#022B42', borderRadius: 5, padding: 10, marginRight: 65 }}>
          Preferences
        </Text>

        <TouchableOpacity
          onPress={() => setChoosedPreference('Mixed')}
          style={{
            backgroundColor: choosedPreference === 'Mixed' ? '#022B42' : '#FDD387',
            borderRadius: 5,
            padding: 10,
            marginRight: 20,
          }}
        >
          <Text style={{ color: choosedPreference === 'Mixed' ? 'white' : '#022B42' }}>Mixed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setChoosedPreference('Separate')}
          style={{
            backgroundColor: choosedPreference === 'Separate' ? '#022B42' : '#FDD387',
            borderRadius: 5,
            padding: 10,
          }}
        >
          <Text style={{ color: choosedPreference === 'Separate' ? 'white' : '#022B42' }}>Separate</Text>
        </TouchableOpacity>
      </View>
      {/* Passenger Quantity Adjustment */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
          backgroundColor: '#fff',
          padding: 15,
          borderRadius: 15,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
        }}
      >
        {/* Male Passenger Adjustment */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
          <TouchableOpacity
            onPress={() => changeMaleQuantity(-1)}
            disabled={maleQuantity === 0}
            style={{ marginRight: 5, backgroundColor: '#ddd', borderRadius: 5, padding: 8 }}
          >
            <Icon name="minus" size={20} color={maleQuantity === 0 ? '#ccc' : '#000'} />
          </TouchableOpacity>
          <Icon name="male" size={40} color="#000" style={{ marginHorizontal: 10 }} />
          <Text style={{ marginRight: 8 }}>{maleQuantity}</Text>
          <TouchableOpacity
            onPress={() => changeMaleQuantity(1)}
            disabled={maleQuantity >= 4}
            style={{ marginRight: 5, backgroundColor: '#ddd', borderRadius: 5, padding: 8 }}
          >
            <Icon name="plus" size={20} color={maleQuantity >= 4 ? '#ccc' : '#000'} />
          </TouchableOpacity>
        </View>

        {/* Female Passenger Adjustment */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => changeFemaleQuantity(-1)}
            disabled={femaleQuantity === 0}
            style={{ marginRight: 5, backgroundColor: '#ddd', borderRadius: 5, padding: 8 }}
          >
            <Icon name="minus" size={20} color={femaleQuantity === 0 ? '#ccc' : '#000'} />
          </TouchableOpacity>
          <Icon name="female" size={40} color="pink" style={{ marginHorizontal: 10 }} />
          <Text style={{ marginRight: 8 }}>{femaleQuantity}</Text>
          <TouchableOpacity
            onPress={() => changeFemaleQuantity(1)}
            disabled={femaleQuantity >= 4}
            style={{ marginLeft: 5, backgroundColor: '#ddd', borderRadius: 5, padding: 8 }}
          >
            <Icon name="plus" size={20} color={femaleQuantity >= 4 ? '#ccc' : '#000'} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          width: 200,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
          padding: 13,
          backgroundColor: '#022B42',
          borderRadius: 7,
        }}
      >
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CarpoolingScreen;