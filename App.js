import 'react-native-gesture-handler';
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
import DashboardD from './Components/DashboardD';
import Driverdoc from './Components/Driverdoc';
import Selection from './Components/Selection';
import DriverPhonenumber from './Components/DriverPhonenumber';
import Forgetpassword from './Components/Forgetpassword';
import Contactus from './Components/Contactus';
import Complaint from './Components/Complaint';
import Privacycenter from './Components/Privacycenter';
import DriverRoute from './Components/DriverRoute';
import PassengerRoute from './Components/PassengerRoute';
import PassengerRrequest from './Components/PassengerRrequest';
import DriverRrequest from './Components/DriverRrequest';
import CarpoolingD from './Components/CarpoolingD';
import Carpooling from './Components/Carpooling';
import Carpoolingpreq from './Components/Carpoolingpreq';
import Editprofile from './Components/Editprofile';
import Vehicleinfo from './Components/Vehicleinfo';
import EditprofileP from './Components/EditprofileP';
import ComplaintD from './Components/ComplaintD';
import ContactusD from './Components/ContactusD';
import Pick from './Components/Pick';
import RouteScreen from './Components/RouteScreen';
import Passengerpickroute from './Components/Passengerpickroute';
import Passengerdroproute from './Components/Passengerdroproute';
import PDbooking from './Components/PDbooking';
import Paymenttype from './Components/Paymenttype';
import Payment from './Components/Payment';
import BookingConfirmation from './Components/BookingConfirmation';
import NotificationsScreen from './Components/NotificationsScreen';
import NotifactionsScreenP from './Components/NotifactionsScreenP';
import ChatScreen from './Components/ChatScreen';
import PassengerBooking from './Components/PassengerBooking';
import DriverAcceptedBookings from './Components/DriverAcceptedBookings';
import Track from './Components/Track';

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
       <Stack.Screen name="DashboardD" component={DashboardD} />
        <Stack.Screen name="Driverdoc" component={Driverdoc} />
        <Stack.Screen name="Selection" component={Selection} />
        <Stack.Screen name="DriverPhonenumber" component={DriverPhonenumber} />
        <Stack.Screen name="Forgetpassword" component={Forgetpassword} />
        <Stack.Screen name="Contactus" component={Contactus} />
        <Stack.Screen name="Complaint" component={Complaint} />
        <Stack.Screen name="Privacycenter" component={Privacycenter} />
        <Stack.Screen name="DriverRoute" component={DriverRoute} />
        <Stack.Screen name="PassengerRoute" component={PassengerRoute} />
        <Stack.Screen name="PassengerRrequest" component={PassengerRrequest} />
        <Stack.Screen name="DriverRrequest" component={DriverRrequest} />
        <Stack.Screen name="CarpoolingD" component={CarpoolingD} />
        <Stack.Screen name="Carpooling" component={Carpooling} />
        <Stack.Screen name="Carpoolingpreq" component={Carpoolingpreq} />
        <Stack.Screen name="Editprofile" component={Editprofile} />
        <Stack.Screen name="Vehicleinfo" component={Vehicleinfo} />
        <Stack.Screen name="EditprofileP" component={EditprofileP} />
        <Stack.Screen name="ComplaintD" component={ComplaintD} />
        <Stack.Screen name="ContactusD" component={ContactusD} />
        <Stack.Screen name="Pick" component={Pick} />
        <Stack.Screen name="RouteScreen" component={ RouteScreen} />
        <Stack.Screen name="Passengerpickroute" component={Passengerpickroute} />
        <Stack.Screen name="Passengerdroproute" component={Passengerdroproute} />
        <Stack.Screen name="PDbooking" component={PDbooking} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Paymenttype" component={Paymenttype} />
        <Stack.Screen name="BookingConfirmation" component={BookingConfirmation} />
        <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
        <Stack.Screen name="NotificationsScreenP" component={NotifactionsScreenP} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="PassengerBooking" component={PassengerBooking} />
        <Stack.Screen name="DriverAcceptedBookings" component={DriverAcceptedBookings} />
        <Stack.Screen name="Track" component={Track} />
        


        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
