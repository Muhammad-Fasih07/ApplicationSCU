import 'react-native-gesture-handler';
import { Link } from 'react-router-dom';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Components/Login';
import Splash from './Components/Splash';
import Welcome from './Components/Welcome';
import PassengerRegNo from './Components/PassengerRegNo';
import PassengerRegname from './Components/PassengerRegname';
import Termcondition from './Components/Termcondition';
import Privacypolicy from './Components/Privacypolicy';
import PassengerPassword from './Components/PassengerPassword';
import Dashboard from './Components/Dashboard';
import Driverdetails from './Components/Driverdetails';
import Driver from './Components/Driver';
import DriverPassword from './Components/DriverPassword';
import Dashboard2 from './Components/Dashboard2';
import Driverdoc from './Components/Driverdoc';
import Selection from './Components/Selection';
import DriverPhonenumber from './Components/DriverPhonenumber';
import Forgetpassword from './Components/Forgetpassword';
import Contactus from './Components/Contactus';
import Complaint from './Components/Complaint';
import Privacycenter from './Components/Privacycenter';
import DriverRoute from './Components/DriverRoute';
import PassengerRoute from './Components/PassengerRoute';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="PassengerRegNo" component={PassengerRegNo} />
        <Stack.Screen name="PassengerRegname" component={PassengerRegname} />
        <Stack.Screen name="Termcondition" component={Termcondition} />
        <Stack.Screen name="Privacypolicy" component={Privacypolicy} />
        <Stack.Screen name="PassengerPassword" component={PassengerPassword} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Driverdetails" component={Driverdetails} />
        <Stack.Screen name="Driver" component={Driver} />
        <Stack.Screen name="DriverPassword" component={DriverPassword} />
        <Stack.Screen name="Dashboard2" component={Dashboard2} />
        <Stack.Screen name="Driverdoc" component={Driverdoc} />
        <Stack.Screen name="Selection" component={Selection} />
        <Stack.Screen name="DriverPhonenumber" component={DriverPhonenumber} />
        <Stack.Screen name="Forgetpassword" component={Forgetpassword} />
        <Stack.Screen name="Contactus" component={Contactus} />
        <Stack.Screen name="Complaint" component={Complaint} />
        <Stack.Screen name="Privacycenter" component={Privacycenter} />
        <Stack.Screen name="DriverRoute" component={DriverRoute} />
        <Stack.Screen name="PassengerRoute" component={PassengerRoute} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
