import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { API_BASE_URL } from '../src/env'; // Ensure this points to your API server

const EditProfileScreenP = ({ route, navigation }) => {
  const { user } = route.params;

  if (!user) {
    Alert.alert("Error", "User data is missing.");
    return null;
  }

  const [profileImage, setProfileImage] = useState(user?.photo || 'https://via.placeholder.com/150');
  const [firstName, setFirstName] = useState(user?.name || '');
  const [identity, setIdentity] = useState(user?.identity || '');
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/passenger/${user.pid}`);
        const { name, identity, photo } = response.data;
        setFirstName(name);
        setIdentity(identity);
        setProfileImage(photo || 'https://via.placeholder.com/150');
      } catch (error) {
        console.error('Failed to fetch passenger data:', error);
        Alert.alert('Error', 'Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user.pid]);

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
    if (!firstName || !identity) {
      Alert.alert('Error', 'Name and identity fields are required.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(`${API_BASE_URL}/passenger/${user.pid}`, {
        name: firstName,
        identity: identity,
        photo: profileImage
      });
      if (response.data) {
        Alert.alert('Success', 'Profile updated successfully');
        setEditMode(false);
        navigation.navigate('Dashboard', { user: { ...user, name: firstName, identity, photo: profileImage } });
      }
    } catch (error) {
      console.error('Failed to update passenger data:', error);
      Alert.alert('Error', 'Failed to update profile');
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
      const localUri = result.uri;
      const filename = localUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      const formData = new FormData();
      formData.append('photo', { uri: localUri, name: filename, type });

      try {
        setLoading(true);
        const uploadResponse = await axios.post(`${API_BASE_URL}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (uploadResponse.data && uploadResponse.data.url) {
          setProfileImage(uploadResponse.data.url);
          Alert.alert('Success', 'Picture updated successfully');
        }
      } catch (error) {
        console.error('Failed to upload image:', error);
        Alert.alert('Error', 'Failed to upload image');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditProfileImage = () => {
    if (editMode) {
      Alert.alert(
        'Change Profile Picture',
        'Select source:',
        [
          { text: 'Camera', onPress: () => handleImageSelection('camera') },
          { text: 'Gallery', onPress: () => handleImageSelection('gallery') },
          { text: 'Cancel', style: 'cancel' },
        ],
        { cancelable: true }
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0066cc" />}
      <Text style={styles.title}>{editMode ? 'Edit Profile' : 'Profile'}</Text>
      <View style={styles.profileImageContainer}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        {editMode && (
          <TouchableOpacity onPress={handleEditProfileImage} style={styles.editIcon}>
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
            placeholder="Identity"
            value={identity}
            onChangeText={setIdentity}
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
          <Text style={styles.infoText}>Identity: {identity}</Text>
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

export default EditProfileScreenP;
