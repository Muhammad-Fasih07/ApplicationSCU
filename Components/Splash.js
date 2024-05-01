import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Welcome');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      {[...Array(4)].map((_, index) => (
        <Animatable.Text
          key={index}
          style={styles.logo}
          duration={2000 + index * 200}
          animation={{
            from: { translateY: -800 }, // Start from above the screen
            to: { translateY: 60 }, // End at original position
          }}
        >
          SCU
        </Animatable.Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#022B42',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    color: '#FFDE59',
    fontStyle: 'italic',
    fontSize: 70,
    fontWeight: '800',
    marginBottom: 20, // Add some spacing between the texts
  },
});

export default Splash;
