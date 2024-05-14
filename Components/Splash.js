import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Welcome');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.View animation="zoomIn" duration={1500} style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Image
            source={require('../assets/logoscu.png')}
            style={styles.logoImage}
          />
        </View>
        <Animatable.Text
          animation="fadeIn"
          duration={1500}
          style={styles.logoText}
        >
          SCU
        </Animatable.Text>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#022B42', // Circle background color
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  logoText: {
    color: '#022B42', // Blue text color
    fontSize: 50,
    fontWeight: '900', // Extra bold
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});

export default Splash;
