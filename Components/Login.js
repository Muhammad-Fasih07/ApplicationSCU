import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Login = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View
        style={{
          padding: 20,
          marginTop: 20,
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../assets/logoscu.png')}
            style={{
              width: '30%', // Use 100% width to make it responsive
              height: 80,
              marginBottom: 20, // Adjust margin as needed
              borderRadius: 20,
              backgroundColor: 'rgb(24,61,61)',
            }}
          />

          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              maxWidth: '60%',
              textAlign: 'center',
            }}
          >
            Welcome back you've been missed!
          </Text>
        </View>
        <View
          style={{
            marginVertical: 30,
          }}
        >
          <TextInput
            placeholder="Email"
            placeholderTextColor={Colors.darkText}
            style={{
              fontSize: 15,
              padding: 20,
              backgroundColor: 'rgba(207,216,220,1.0)',
              borderRadius: 5,
              marginVertical: 5,
            }}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={Colors.darkText}
            secureTextEntry
            style={{
              fontSize: 15,
              padding: 20,
              backgroundColor: 'rgba(207,216,220,1.0)',
              borderRadius: 5,
              marginVertical: 5,
            }}
          />
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Forgetpassword')}>
            <Text
              style={{
                fontWeight: '400',

                color: 'black',
                alignSelf: 'flex-end',
              }}
            >
              Forget your password?
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Dashboard')}
          style={{
            padding: 15,
            backgroundColor: '#022B42',
            marginVertical: 30,
            borderRadius: 5,
            shadowColor: 'rgb(147, 177, 166)',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.3,
          }}
        >
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Selection')}
          style={{
            padding: 15,
          }}
        >
          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              fontSize: 15,
              fontWeight: '400',
            }}
          >
            Create new account
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginVertical: 30,
          }}
        >
          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              fontSize: 15,
              fontWeight: '400',
            }}
          >
            Or continue with
          </Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: '#022B42',
                borderRadius: 20,
                marginHorizontal: 10,
              }}
            >
              <Ionicons name="logo-google" color={Colors.white} size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: '#022B42',
                borderRadius: 20,
                marginHorizontal: 10,
              }}
            >
              <Ionicons name="logo-apple" color={Colors.white} size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: '#022B42',
                borderRadius: 20,
                marginHorizontal: 10,
              }}
            >
              <Ionicons name="logo-facebook" color={Colors.white} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
