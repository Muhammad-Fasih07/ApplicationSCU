import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { API_BASE_URL } from '../src/env'; // Ensure this points to your API server

const EditProfileScreen = ({ route }) => {
  const { user } = route.params; // Assuming user object is passed in params with id

  const [profileImage, setProfileImage] = useState(user?.profileImageUrl || 'https://via.placeholder.com/150');
  const [username, setUsername] = useState(user?.name || '');
  const [lastName, setLastName] = useState(user?.lastname || '');
  const [type, setType] = useState(user?.type || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [editMode, setEditMode] = useState(false);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/driver/${user.id}`);
        const { name, lastname, type, gender, profileImageUrl } = response.data;
        setUsername(name);
        setLastName(lastname);
        setType(type);
        setGender(gender);
        setProfileImage(profileImageUrl);
      } catch (error) {
        console.error('Failed to fetch driver data:', error);
        Alert.alert('Error', 'Failed to fetch profile data');
      }
    };

    fetchProfile();
  }, [user.id]);

 

  useEffect(() => {
    // Request permissions to access the media library and camera
    (async () => {
      const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      if (libraryStatus.status !== 'granted' || cameraStatus.status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant camera and photo library permissions to use this feature');
      }
    })();
  }, []);

  const handleUpdateProfile = async () => {
    // Update profile details
    try {
      const response = await axios.put(`${API_BASE_URL}/driver/${user.id}`, {
        name: username,
        lastname: lastName,
        type: type,
        gender: gender
      });
      if (response.data) {
        Alert.alert('Success', 'Profile updated successfully');
        setEditMode(false);
      }
    } catch (error) {
      console.error('Failed to update driver data:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleTakePhoto = async () => {
    // Take photo with camera
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  const handleChooseFromGallery = async () => {
    // Choose photo from gallery
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{editMode ? 'Edit Profile' : 'Profile'}</Text>
      
      <View style={styles.profileImageContainer}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        {editMode && (
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleTakePhoto} style={styles.icon}>
              <MaterialCommunityIcons name="camera" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleChooseFromGallery} style={styles.icon}>
              <MaterialCommunityIcons name="image" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {editMode ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Type (e.g., Driver)"
            value={type}
            onChangeText={setType}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Gender"
            value={gender}
            onChangeText={setGender}
            autoCapitalize="none"
          />
        </>
      ) : (
        <>
          <Text style={styles.infoText}>Username: {username}</Text>
          <Text style={styles.infoText}>Last Name: {lastName}</Text>
          <Text style={styles.infoText}>Type: {type}</Text>
          <Text style={styles.infoText}>Gender: {gender}</Text>
        </>
      )}

      <TouchableOpacity onPress={editMode ? handleUpdateProfile : () => setEditMode(true)} style={styles.button}>
        <Text style={styles.buttonText}>{editMode ? 'Save Changes' : 'Edit Profile'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
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
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    position: 'absolute',
    bottom: -20,
  },
  icon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 25,
    padding: 8,
  },
  input: {
    width: '90%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    fontSize: 16,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#0066cc',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default EditProfileScreen;
