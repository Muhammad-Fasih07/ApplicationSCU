import { StyleSheet, Text, View, SafeArea } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";

const Splash = ({ navigation }) => {
  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate('Login')
    },2000);
  },[]);

  return (
    <View
      style={{
        backgroundColor: "rgb(24, 61, 61)",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animatable.Text
        style={{
          color: "rgb(236, 227, 206)",
          fontStyle: "italic",
          fontSize: 70,
          fontWeight: "800",
        }}
        duration={2000}
        animation="bounceIn"
      >
        SCU
      </Animatable.Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
