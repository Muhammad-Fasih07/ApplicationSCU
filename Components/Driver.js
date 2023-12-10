import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Screen = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgb(177, 201, 239)',
      }}
    >
      <View style={{ position: 'relative', width: '90%' }}>
        <Text
          style={{
            borderRadius: 5,
            borderColor: 'rgb(57, 88, 134)',
            borderWidth: 5,
            backgroundColor: '#022B42',
            zIndex: 2,
            marginTop: 50,
            textAlign: 'center',
            paddingTop: 10,
            fontSize: 22,
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          Going to work as
        </Text>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      </View>

      <TouchableOpacity
        style={{
          alignItems: 'center',
          backgroundColor: '#022B42',
          padding: 10,
          marginTop: 230,
          width: '90%',
          flexDirection: 'row',
          justifyContent: 'center',
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate('Car')}
      >
        <MaterialCommunityIcons name="car" size={20} color="white" style={{ marginRight: 10 }} />
        <Text style={{ fontSize: 18, color: 'white' }}>Car</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          alignItems: 'center',
          backgroundColor: '#022B42',
          padding: 10,
          marginTop: 10,
          width: '90%',
          flexDirection: 'row',
          justifyContent: 'center',
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate('Van')}
      >
        <MaterialCommunityIcons name="van-passenger" size={20} color="white" style={{ marginRight: 10 }} />
        <Text style={{ fontSize: 18, color: 'white' }}>Van</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          alignItems: 'center',
          backgroundColor: '#022B42',
          padding: 10,
          marginTop: 10,
          width: '90%',
          flexDirection: 'row',
          justifyContent: 'center',
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate('Bus')}
      >
        <MaterialCommunityIcons
          name="bus"
          size={20}
          color="white"
          style={{
            marginRight: 10,
          }}
        />
        <Text
          style={{
            fontSize: 18,
            color: 'white',
          }}
        >
          Bus
        </Text>
      </TouchableOpacity>
      <View>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            fontSize: 15,
            fontWeight: '400',
            marginTop:100
          }}
        >
          By creating SCU account you agree with SCU's
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        {/* Terms & Conditions, Privacy Policy options */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Termcondition')}
          style={{ marginRight: 5 }}
        >
          <Text
            style={{
              color: '#022B42',
              fontSize: 15,
              fontWeight: '400',
            }}
          >
            Terms & Conditions
          </Text>
        </TouchableOpacity>
        <Text style={{ color: 'black' }}>•</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Privacypolicy')}
          style={{ marginLeft: 5 }}
        >
          <Text
            style={{
              color: '#022B42',
              fontSize: 15,
              fontWeight: '400',
            }}
          >
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default Screen;
