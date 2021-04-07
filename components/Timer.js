import React from 'react';
import { StyleSheet, Text, View, Image, Button,TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import base64 from 'react-native-base64';

export default class Timer extends React.Component {
    constructor(props){
        super(props);
        this.manager = new BleManager()
        this.state = {
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
        if(this.state.Seconds ==0)
            this.setState({Seconds: 59})
    }
    incrementMinutes(){
        if(this.state.Minutes < 99)
            this.setState({Minutes: this.state.Minutes +1});
        if(this.state.Minutes == 99)
            this.setState({Minutes: 0});
    }
    incrementSeconds(){
        if(this.state.Seconds < 59)
            this.setState({Seconds: this.state.Seconds +1});
        if(this.state.Seconds == 59) 
            this.setState({Seconds: 0});
    }

    startTimer = () => {
        this.setState({
            totalSec: this.state.Minutes * 60 + this.state.Seconds
        })
        console.log("total sec = " + this.state.totalSec);
        const {totalSec} = this.state;
        const base64Data = base64.encode(this.state.totalSec.toString()); 
        Alert.alert(totalSec + " will be encoded as \n" + base64Data + " and will be sent to the LED board");
    }

    stopTimer = () => {
        this.setState({
            totalSec: 0
        })
        console.log("total sec = " + this.state.totalSec);
        const {totalSec} = this.state;
        const base64Data = base64.encode(this.state.totalSec.toString()); 
        Alert.alert(totalSec + " will be encoded as \n" + base64Data + " and will be sent to the LED board");
    }

    UNSAFE_componentWillMount() {
        console.log("Mounted")
        const subscription = this.manager.onStateChange((state) => {
            if (state === 'PoweredOn') {
                this.scanAndConnect();
                subscription.remove();
            }
        }, true);
    }

    scanAndConnect() {
        this.manager.startDeviceScan(null, null, (error, device) => {
          console.log("Scanning...");
          
          console.log(device);
          if (error) {
            console.log(error.message);
            return;
          }
    
          if (device.name ===  "TTSign") {
            console.log("Connecting to LED Board");
            this.manager.stopDeviceScan();
    
            device.connect()
              .then((device) => {
                console.log("Discovering services and characteristics");
                return device.discoverAllServicesAndCharacteristics()
              })
              .then((device) => {
                console.log(device.id);
                                
                device.writeCharacteristicWithResponseForService('00001101-0000-1000-8000-00805F9B34FB', 'UUIDcharc', base64Data) 
                  .then((characteristic) => { 
                    console.log(characteristic.value);
                    return 
                  })
              })
              .catch((error) => {
                console.log('Error in Writing Data');
                console.log(error.message);
              })
           }
       })
    }

    render(){
        return(
            <KeyboardAvoidingView 
            style={styles.container} 
            behavior = "padding">
                <View style={styles.timerElements}>
                    <Button onPress = {this.decrementMinutes} color = "red" title = "-" />
                    <Text style = {styles.text}> {this.state.Minutes} Min</Text>
                    <Button onPress = {this.incrementMinutes} color = "red" title = "+" />
                    <Button onPress = {this.decrementSeconds} color = "red" title = "-" />
                    <Text style = {styles.text}> {this.state.Seconds} Sec</Text>
                    <Button onPress = {this.incrementSeconds} color = "red" title = "+"/>
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
        backgroundColor: '#000000',
    },
    text: {
        color: "white",
        margin: 3,
        fontSize: 20
    },
    numberText: {
     color: "white",
     marginRight: 3,
     fontSize: 20,
    },
    timeAndButtonContainer: {
        flex: 2,
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginTop: '20%',
    },
    buttonContainer: {
        flex: 1,
        flexDirection:'row',
        backgroundColor: 'black',
        justifyContent: 'space-evenly',
    },

    timerElements: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 45,
        marginTop: 300, 
        marginBottom: 50,
    },
    spaceEvenlyContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    timeUnit: {
        flexWrap: "wrap",
        flexDirection: 'row',
        justifyContent: 'space-around',
        //marginTop: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    spaceTimeEvenly: {
        flexWrap: "wrap",
        flex: 1,
        flexDirection: 'column'
    },
});