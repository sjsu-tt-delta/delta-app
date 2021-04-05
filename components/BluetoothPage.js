import React from 'react';
import { StyleSheet, Text, View, Image, Button,TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import base64 from 'react-native-base64';

export default class BluetoothPage extends React.Component {
    constructor() {
        super()
        this.manager = new BleManager()
        this.state = {
            inputString: "",
            base64Data: "",
    
    }; //set initial state to an empty string
    
        this.handleUserInput = this.handleUserInput.bind(this)
    }

    handleUserInput(input){ //function to update the state after user input
       this.setState({
            inputString: input, 
        })
        console.log(input);
    }


    handleConfirm = () => {
        const {inputString} = this.state;
        const base64Data = base64.encode(this.state.inputString); //encode the input string
        Alert.alert(inputString + "String will be encoded as \n" + base64Data + " and will be sent to the LED board");

        Alert.alert(inputString + " String will be encoded as \n" + base64Data + " and will be sent to the LED board");
    }
    
    clearBoard = () =>{
        this.setState({
            inputString: " "
        })
    }

    componentWillMount() {
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
                
                <Text style = {styles.base}>
                    Enter a word:
                </Text>

                {/* Logic to have a input for users and onChange text will update the state by calling the handleUserInput function */}
                <TextInput 
                    style ={styles.input}
                    placeholder = 'e.g. Hello'
                    placeholderTextColor = 'white'
                    id = 'inputString'
                    value = {this.state.inputString}
                    onChangeText = {(inputString => this.handleUserInput(inputString))}
                />
                
                <Text>{'\n'}</Text>
                
  
            <View style={styles.buttons}>
                <View style = {styles.clearButton}>
                    <Button color = 'gray' title = "Clear board" onPress = {this.clearBoard}/>
                </View>
                <View style = {styles.changeButton}>
                    <Button color = 'gray' title = "Change display" onPress={this.handleConfirm}/> 
                </View>
                
            </View>
            </KeyboardAvoidingView>
        ) 
    
}}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000000',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    buttons: {
        flex: 2,
        flexDirection:'row',
        backgroundColor: 'black',
        justifyContent: 'space-between',
    },
    changeButton: {
        flex:1,
        marginLeft: 5
    },
    clearButton: {
        flex: 1, 
        marginRight:5
    },
   
    input:{
        borderWidth: 1,
        borderColor: '#ffffff',
        padding: 8,
        margin: 10,
        width: 200,
        color: '#ffffff'
        

    },
    base:{
        marginTop: 450,
        color: 'white'
    }
   

});
