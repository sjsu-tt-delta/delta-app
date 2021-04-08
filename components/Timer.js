import React from 'react';

import { StyleSheet, Text, View, Image, Button,TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import base64 from 'react-native-base64';

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.manager = new BleManager()
        this.state = {
            deviceID: "",
            Append: "b",
            Minutes : 0,
            Seconds: 0,
            totalSec: 0, 
            base64Data: "",
        }
        this.decrementMinutes = this.decrementMinutes.bind(this);
        this.decrementSeconds = this.decrementSeconds.bind(this);
        this.incrementMinutes = this.incrementMinutes.bind(this);
        this.incrementSeconds = this.incrementSeconds.bind(this);
        
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
      
        const TriangleLeft = () => {
            return <Triangle style={styles.triangleLeft} />;
        };

        this.scanAndConnect();
    }

    writeToDevice(b64dat) {
        //If not connected, reconnect
        if (!this.state.deviceID || !this.manager.isDeviceConnected(this.state.deviceID)) {
            this.scanAndConnect();
        }
        //Write BLE data
        this.manager.writeCharacteristicWithResponseForDevice(this.state.deviceID, '0000ffe0-0000-1000-8000-00805f9b34fb', '0000ffe1-0000-1000-8000-00805f9b34fb', b64dat)
    }
   
    decrementMinutes(){
        if(this.state.Minutes>0) 
            this.setState({Minutes: this.state.Minutes -1});
            this.setState({totalSec : this.state.totalSec - 60 })
        // if(this.state.Minutes ==0)
        //     this.setState({Minutes: 99})
    }
    decrementSeconds(){
        if(this.state.Seconds>0) 
            this.setState({Seconds: this.state.Seconds -1});
        // if(this.state.Seconds ==0)
        //     this.setState({Seconds: 59})
    }
    incrementMinutes(){
        if(this.state.Minutes < 99)
            this.setState({Minutes: this.state.Minutes +1});
        // if(this.state.Minutes == 99)
        //     this.setState({Minutes: 0});
    }
    incrementSeconds(){
        if(this.state.Seconds < 59)
            this.setState({Seconds: this.state.Seconds +1});
        // if(this.state.Seconds == 59) 
        //     this.setState({Seconds: 0});
    }

    startTimer = () => {
        this.setState(currentState => ({ totalSec: (currentState.Minutes * 60 + currentState.Seconds) }), () => {
            const {totalSec} = this.state;
            const base64Data = base64.encode(this.state.Append+this.state.totalSec.toString());
            this.writeToDevice(base64Data)
            Alert.alert(totalSec + " will be encoded as \n" + base64Data + " and will be sent to the LED board");
            console.log("total sec = " + this.state.totalSec);
        });
    }

    stopTimer = () => {
        this.setState(currentState => ({totalSec: 0}), () => {
            const {totalSec} = this.state;
            const base64Data = base64.encode(this.state.Append+this.state.totalSec.toString());
            this.writeToDevice(base64Data)
            Alert.alert(totalSec + " will be encoded as \n" + base64Data + " and will be sent to the LED board");
            console.log("total sec = " + this.state.totalSec);
        });
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
            <KeyboardAvoidingView style={styles.container}
                behavior="padding">
                <View style={styles.timerElements}>
                    <Text style={styles.text}> Minutes </Text>
                    <Text style={styles.text}> Seconds </Text>
                </View>
                <View style={styles.timerElements1}>
                    <View style={styles.minutesContainer}>
                        <TouchableOpacity
                            style={styles.triangleUp}
                            activeOpacity={.5}
                            onPress={this.incrementMinutes}>
                        </TouchableOpacity>
                        <Text style={styles.timeText}> {this.state.Minutes} </Text>
                        <TouchableOpacity
                            style={styles.triangleDown}
                            activeOpacity={.5}
                            onPress={this.decrementMinutes}>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.secondsContainer}>
                        <TouchableOpacity
                            style={styles.triangleUp}
                            activeOpacity={.5}
                            onPress={this.incrementSeconds}>
                        </TouchableOpacity>

                        <Text style={styles.timeText}> {this.state.Seconds} </Text>

                        <TouchableOpacity
                            style={styles.triangleDown}
                            activeOpacity={.5}
                            onPress={this.decrementSeconds}>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.buttonContainer}>

                    <TouchableOpacity style={styles.stopButton} onPress={this.stopTimer}>
                        <Text style = {styles.text}>STOP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.startButton} onPress={this.startTimer}>
                        <Text style = {styles.text}>START</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    stopButton: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'red',
    },
    startButton: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'green',
    },
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#303030',
    },
    timeText: {
        color: "white",
        fontSize: 80
    },
    text: {
        color: "white",
        fontSize: 20
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#303030'
    },
    timerElements: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 100,
    },
    timerElements1: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
    },
    minutesContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 15,
        marginBottom: 100
    },
    secondsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 15,
        marginBottom: 100
    },
    triangleUp: {
        borderStyle: "solid",
        borderLeftWidth: 15,
        borderRightWidth: 15,
        borderBottomWidth: 25,
        backgroundColor: "transparent",
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "gray"
    },
    triangleDown: {
        borderStyle: "solid",
        borderLeftWidth: 15,
        borderRightWidth: 15,
        borderBottomWidth: 25,
        backgroundColor: "transparent",
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "gray",
        transform: [{ rotate: "180deg" }],
    },
});