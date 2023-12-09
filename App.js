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
import Bus from './Components/Bus';
import Van from './Components/Van';
import Dashboard2 from './Components/Dashboard2';

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
        <Stack.Screen name="Car" component={Car}/>
        <Stack.Screen name="Van" component={Van}/>
        <Stack.Screen name="Bus" component={Bus}/>
        <Stack.Screen name="Dashboard2" component={Dashboard2}/>
        
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
 
const styles = StyleSheet.create({});
