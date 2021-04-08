import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ledstring from '../images/ledstring.png';
import ledtimer from '../images/ledtimer.png';

export default function NavScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>{'\n'}</Text>
      <Text style={styles.text}> Type a String and display it on the LED matrix. </Text>
      <Image style={styles.image} source={ledstring} />
      <TouchableOpacity
        style={styles.button}
        activeOpacity={.5}
        onPress={() => navigation.navigate('Bluetooth')}>
        <Text style={styles.text}> LED Display </Text>
      </TouchableOpacity>
      <Text>{'\n'}</Text>
      <View style={{ marginTop: 10, borderBottomColor: 'white', borderBottomWidth: .5, width: '100%' }} />
      <Text>{'\n'}</Text>
      <Text style={styles.text}> Set a timer and watch the countdown on the LED matrix. </Text>
      <Image style={styles.image} source={ledtimer} />
      <TouchableOpacity
        style={styles.button}
        activeOpacity={.5}
        onPress={() => navigation.navigate('Timer')}>
        <Text style={styles.text}> Timer </Text>
      </TouchableOpacity>
      <Text>{'\n'}</Text>
      <View style={{ marginTop: 10, borderBottomColor: 'white', borderBottomWidth: .5, width: '100%' }} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 0,
  },
  image: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
  },
  button: {
    marginTop: 15,
    paddingTop: 15,
    paddingBottom: 15,
    width: 300,
    backgroundColor: 'maroon',
    borderRadius: 25,
  },
  text: {
    color: "white",
    textAlign: 'center',
  }
});
