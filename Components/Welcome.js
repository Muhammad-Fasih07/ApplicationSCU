import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';

const { height } = Dimensions.get('window');

const Welcome = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
          resizeMode="cover"
          source={require('../assets/logo.png')}
        />
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>EMpower Her</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.getStartedButton}
          >
            <Text style={styles.getStartedButtonText}>Get started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#5E93B1',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  imageBackground: {
    height: height / 1.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginTop: -50,
    paddingHorizontal: 16,
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 16,
    marginTop: 30,
    alignItems: 'center',
  },
  getStartedButton: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 25,
    backgroundColor: '#022B42',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  getStartedButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
