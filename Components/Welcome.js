import {  StyleSheet, Text, View, SafeAreaView, ImageBackground, Dimensions,TouchableOpacity } from 'react-native';
import React from 'react';



const { height } = Dimensions.get('window');

const Welcome = ({ navigation }) => {

    
          
       

  return (
    <SafeAreaView>
      <View style={{backgroundColor:'rgb(94, 147, 177)'}}>
        <ImageBackground
          style={{
            height: height / 1.6,
          }}
          resizeMode="center"
          source={require('../assets/images/logo.png')}
        />
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 4,
            
          }}
        >
          <Text
            style={{
              fontSize: 40,
              fontWeight: 'bold',
              
              textAlign: 'center',
              marginTop: -50,
            }}
          >
            EMpower Her
          </Text>
        </View>

        <View style={{ paddingHorizontal: 8, 
            paddingVertical: 36, 
          
            }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{
              paddingVertical: 9.5,
              paddingHorizontal: 10,
              width: '80%',
              borderRadius: 4,
              backgroundColor: 'rgb(24,61,61)',
              marginLeft: 34,
              alignContent: 'center',
              marginVertical:120,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Get started
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
