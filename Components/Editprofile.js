import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { API_BASE_URL } from '../src/env';

const EditProfileScreen = ({ route, navigation }) => {
  const { user } = route.params;

  if (!user) {
    Alert.alert("Error", "User data is missing.");
    return null;
  }

  const [profileImage, setProfileImage] = useState(user?.driverphoto || 'https://via.placeholder.com/150');
  const [firstName, setFirstName] = useState(user?.name || '');
  const [lastName, setLastName] = useState(user?.lastname || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/driver/${user.d_id}`);
        const { name, lastname, gender, driverphoto } = response.data;
        setFirstName(name);
        setLastName(lastname);
        setGender(gender);
        setProfileImage(driverphoto);
      } catch (error) {
        console.error('Failed to fetch driver data:', error);
        Alert.alert('Error', `Failed to fetch profile data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user.d_id]);

  useEffect(() => {
    (async () => {
      const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      if (libraryStatus.status !== 'granted' || cameraStatus.status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant camera and photo library permissions to use this feature');
      }
    })();
  }, []);

  const handleUpdateProfile = async () => {
    const alphabetRegex = /^[a-zA-Z]+$/;
    if (!alphabetRegex.test(firstName) || !alphabetRegex.test(lastName)) {
      Alert.alert('Error', 'Names should contain only alphabets');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(`${API_BASE_URL}/driver/${user.d_id}`, {
        name: firstName,
        lastname: lastName,
        gender: gender,
        driverphoto: profileImage
      });
      if (response.data) {
        Alert.alert('Success', 'Profile updated successfully');
        setEditMode(false);
        // Navigate back to Dashboard with updated user data
        navigation.navigate('DashboardD', { user: { ...user, name: firstName, lastname: lastName, gender, driverphoto: profileImage } });
      }
    } catch (error) {
      console.error('Failed to update driver data:', error);
      Alert.alert('Error', `Failed to update profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelection = async (type) => {
    let result;
    if (type === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0066cc" />}
      <Text style={styles.title}>{editMode ? 'Edit Profile' : 'Profile'}</Text>
      <View style={styles.profileImageContainer}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        {editMode && (
          <TouchableOpacity onPress={() => handleImageSelection('camera')} style={styles.editIcon}>
            <MaterialCommunityIcons name="camera" size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
      {editMode ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="none"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="none"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Gender"
            value={gender}
            onChangeText={setGender}
            autoCapitalize="none"
            placeholderTextColor="#888"
          />
          <TouchableOpacity onPress={handleUpdateProfile} style={styles.button}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setEditMode(false)} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.infoText}>First Name: {firstName}</Text>
          <Text style={styles.infoText}>Last Name: {lastName}</Text>
          <Text style={styles.infoText}>Gender: {gender}</Text>
          <TouchableOpacity onPress={() => setEditMode(true)} style={styles.button}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#022B42',
    marginBottom: 20,
  },
  profileImageContainer: {
    marginBottom: 30,
    position: 'relative',
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#022B42',
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    padding: 5,
  },
  input: {
    width: '90%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#022B42',
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  infoText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#022B42',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: '#F44336',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
