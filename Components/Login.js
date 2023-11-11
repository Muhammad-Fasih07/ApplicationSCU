import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Login = () => {
  return (
    <SafeAreaView>
      <View
        style={{
          padding: 20,
          marginTop: 20,
          // backgroundColor:'rgb(147, 177, 166)'
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 40,
              color: 'rgb(24, 61, 61)',
              fontWeight: 'bold',
              marginVertical: 30,
            }}
          >
            SCU
          </Text>
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
          <Text
            style={{
              fontWeight: 'bold',

              color: 'rgb(24, 61, 61)',
              alignSelf: 'flex-end',
            }}
          >
            Forget your password?
          </Text>
        </View>
        <TouchableOpacity
          style={{
            padding: 15,
            backgroundColor: 'rgb(24,61,61)',
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
          style={{
            padding: 15,
          }}
        >
          <Text
            style={{
              color: 'rgb(24,61,61)',
              textAlign: 'center',
              fontSize: 15,
              fontWeight: 'bold',
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
              color: 'rgb(24,61,61)',
              textAlign: 'center',
              fontSize: 15,
              fontWeight: 'bold',
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
                backgroundColor: 'gray',
                borderRadius: 20,
                marginHorizontal: 10,
              }}
            >
              <Ionicons name="logo-google" color={Colors.text} size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: 'gray',
                borderRadius: 20,
                marginHorizontal: 10,
              }}
            >
              <Ionicons name="logo-apple" color={Colors.text} size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: 'gray',
                borderRadius: 20,
                marginHorizontal: 10,
              }}
            >
              <Ionicons name="logo-facebook" color={Colors.text} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
