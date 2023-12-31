import 'react-native-gesture-handler';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Components/Login';
import Splash from './Components/Splash';
import Welcome from './Components/Welcome';
import Register from './Components/Register';
import RegisterN from './Components/RegisterN';
import Termcondition from './Components/Termcondition';
import Privacypolicy from './Components/Privacypolicy';
import Password from './Components/Password';
import Dashboard from './Components/Dashboard';
import Driver from './Components/Driver';
import Car from './Components/Car';
import Dashboard2 from './Components/Dashboard2';
import Driverdoc from './Components/Driverdoc';
import Selection from './Components/Selection';
import Phonenumber from './Components/Phonenumber';
import Forgetpassword from './Components/Forgetpassword';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="RegisterN" component={RegisterN} />
        <Stack.Screen name="Termcondition" component={Termcondition} />
        <Stack.Screen name="Privacypolicy" component={Privacypolicy} />
        <Stack.Screen name="Password" component={Password} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Driver" component={Driver} />
        <Stack.Screen name="Car" component={Car} />
        <Stack.Screen name="Dashboard2" component={Dashboard2} />
        <Stack.Screen name="Driverdoc" component={Driverdoc} />
        <Stack.Screen name="Selection" component={Selection} />
        <Stack.Screen name="Phonenumber" component={Phonenumber} />
        <Stack.Screen name="Forgetpassword" component={Forgetpassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
