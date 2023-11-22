import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const TermsAndConditionsScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View
        style={{
          marginTop: 50,
          backgroundColor: 'rgb(24,61,61)',
          paddingVertical: 20,
          paddingHorizontal: 24,
          borderBottomWidth: 1,
          borderBottomColor: '#383838',
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff',
          }}
        >
          Terms and Conditions
        </Text>
      </View>
      <ScrollView
        style={{
          flex: 1,
          paddingTop: 20,
          paddingHorizontal: 24,
        }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 9,
            elevation: 5,
            marginBottom: 20,
            padding: 16,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              lineHeight: 24,
              color: '#333',
            }}
          >
            {'\n'}
            Conditions:{'\n'}
            1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.{'\n'}
            2. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.{'\n'}
            3. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.{'\n'}
            4. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            {'\n'}
            5. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.{'\n'}
            6. Lorem ipsum dolor sit amet, consectetur adipiscing elit.{'\n'}
            7. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default TermsAndConditionsScreen;
