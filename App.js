import 'react-native-gesture-handler';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Components/Login';
import Splash from './Components/Splash';

const Stack = createStackNavigator();

const App = () => {
  return (
    
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown:false}}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login"   component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
        
   
  )
}

export default App

const styles = StyleSheet.create({})