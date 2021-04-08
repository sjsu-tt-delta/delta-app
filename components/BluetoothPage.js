import React from 'react';

import { StyleSheet, Text, View, Image, Button, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BleManager } from 'react-native-ble-plx';
import base64 from 'react-native-base64';

export default class BluetoothPage extends React.Component {
    constructor() {
        super()
        this.manager = new BleManager()
        this.state = {
            deviceID: "",
            Append: "a",
            inputString: "",
            base64Data: "",
        };
        //set initial state to an empty string
        this.handleUserInput = this.handleUserInput.bind(this)
        this.scanAndConnect();
    }

    handleUserInput(input) { //function to update the state after user input
        this.setState({
            inputString: input,
        })
        console.log(input);
    }


    handleConfirm = () => {
        const {inputString} = this.state;
        //Encode the input string to base64
        let base64Data = base64.encode(this.state.Append+this.state.inputString.substring(0,18));
        if (base64Data == "AA==") //If empty string, send space
            base64Data = "IA==";
        this.writeToDevice(base64Data);
        Alert.alert(inputString + " String will be encoded as \n" + base64Data + " and will be sent to the LED board");
    }

    clearBoard = () => {
        this.setState({
            inputString: " "
        })
        this.handleConfirm();
    }

    writeToDevice(b64dat) {
        //If not connected, reconnect
        if (!this.state.deviceID || !this.manager.isDeviceConnected(this.state.deviceID)) {
            this.scanAndConnect();
        }
        //Write BLE data
        this.manager.writeCharacteristicWithResponseForDevice(this.state.deviceID, '0000ffe0-0000-1000-8000-00805f9b34fb', '0000ffe1-0000-1000-8000-00805f9b34fb', b64dat)
    }

    /*
    //Use for iOS, not needed for Android
    UNSAFE_componentWillMount() {
        console.log("Mounted")
        const subscription = this.manager.onStateChange((state) => {
            if (state === 'PoweredOn') {
                this.scanAndConnect();
                subscription.remove();
            }
        }, true);
    }
    */

    scanAndConnect() {
        this.manager.startDeviceScan(null, null, (error, device) => {
          console.log("Scanning...");
          
          console.log(device);
          if (error) {
            console.log(error.message);
            return;
          }
    
          if (device.name === 'TTSign' || device.id == '0000ffe0-0000-1000-8000-00805f9b34fb') {
            console.log("Connecting to LED Board");
            this.manager.stopDeviceScan();
    
            device.connect()
              .then(device => {
                console.log("Discovering services and characteristics")
                return device.discoverAllServicesAndCharacteristics()
              })
              .then(device => {
                console.log(device.id);
                  this.state.deviceID = device.id;
                  console.log("Setting notifications")
                  return this.setupNotifications(device)
              })
              .catch(error => {
                console.log('Error in Writing Data');
                console.log(error.message);
              })
           }
       })
       
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding">

                <Text style={styles.base}>
                    Enter a word:
                </Text>

                {/* Logic to have a input for users and onChange text will update the state by calling the handleUserInput function */}
                <TextInput
                    style={styles.input}
                    placeholder='e.g. Hello'
                    placeholderTextColor='white'
                    id='inputString'
                    value={this.state.inputString}
                    onChangeText={(inputString => this.handleUserInput(inputString))}
                />

                <Text>{'\n'}</Text>

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={.5}
                    onPress={this.handleConfirm}>
                    <Text style={styles.text}> Change display </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={.5}
                    onPress={this.clearBoard}>
                    <Text style={styles.text}> Clear board </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginTop: 15,
        paddingTop: 15,
        paddingBottom: 15,
        width: 300,
        backgroundColor: 'maroon',
        borderRadius: 25
    },
    input: {
        borderWidth: 1,
        borderColor: '#ffffff',
        padding: 8,
        margin: 10,
        width: 200,
        color: '#ffffff'
    },
    base: {
        marginTop: 250,
        color: 'white'
    },
    text: {
        color: "white",
        textAlign: 'center',
    }
});
