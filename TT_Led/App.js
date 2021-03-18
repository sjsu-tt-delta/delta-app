import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import logo from './tt.png'
export default function App() {
  return (
    <View style={styles.container}>
      <Image source = {logo} />
      <Text></Text>
      <Text style = {styles.baseText}>Delta Class is Dope</Text>
      <Text></Text>
      <Text></Text>
      <View style={styles.buttonContainer}>
        <Button title = 'No Shit' />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30
  },
  baseText: {
    fontWeight: 'bold', 
    fontSize: 30, 
    
  },
  buttonContainer: {
    elevation: 8,
    backgroundColor: "black",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  }
  
});
