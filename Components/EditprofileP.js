import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { API_BASE_URL } from '../src/env'; // Ensure this points to your API server

const EditProfileScreen = ({ route }) => {
  const { user } = route.params; // Assuming user object is passed in params with id

  const [profileImage, setProfileImage] = useState(user?.photo || 'https://via.placeholder.com/150');
  const [firstName, setFirstName] = useState(user?.name || '');
  const [identity, setIdentity] = useState(user?.identity || '');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/passenger/${user.pid}`);
        const { name, identity, photo } = response.data;
        setFirstName(name);
        setIdentity(identity);
        setProfileImage(photo || 'https://via.placeholder.com/150');
      } catch (error) {
        console.error('Failed to fetch passenger data:', error);
        Alert.alert('Error', 'Failed to fetch profile data');
      }
    };

    fetchProfile();
  }, [user.pid]);

  useEffect(() => {
    (async () => {
      const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (libraryStatus.status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant photo library permissions to use this feature');
      }
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus.status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant camera permissions to use this feature');
      }
    })();
  }, []);

  const handleUpdateProfile = async () => {
    if (!firstName || !identity) {
      Alert.alert('Error', 'Name and identity fields are required.');
      return;
    }

    try {
      const response = await axios.put(`${API_BASE_URL}/passenger/${user.pid}`, {
        name: firstName,
        identity: identity,
        photo: profileImage
      });
      if (response.data) {
        Alert.alert('Success', 'Profile updated successfully');
        setEditMode(false);
      }
    } catch (error) {
      console.error('Failed to update passenger data:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleTakePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.uri) {
      setProfileImage(result.uri);
    }
  };

  const handleChooseFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.uri) {
      setProfileImage(result.uri);
    }
  };

  const handleEditProfileImage = () => {
    if (editMode) {
      Alert.alert(
        'Change Profile Picture',
        'Select source:',
        [
          { text: 'Camera', onPress: handleTakePhoto },
          { text: 'Gallery', onPress: handleChooseFromGallery },
          { text: 'Cancel', style: 'cancel' },
        ],
        { cancelable: true }
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{editMode ? 'Edit Profile' : 'Profile'}</Text>
      
      <View style={styles.profileImageContainer}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        {editMode && (
          <TouchableOpacity onPress={handleEditProfileImage} style={styles.editIcon}>
            <MaterialCommunityIcons name="pencil" size={24} color="#fff" />
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
          />
         
          <TextInput
            style={styles.input}
            placeholder="Identity"
            value={identity}
            onChangeText={setIdentity}
            autoCapitalize="none"
          />
          
          <TouchableOpacity onPress={handleUpdateProfile} style={styles.button}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.infoText}>First Name: {firstName}</Text>
          <Text style={styles.infoText}>Identity: {identity}</Text>
          <TouchableOpacity onPress={() => setEditMode(true)} style={styles.button}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </>
      )}
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
