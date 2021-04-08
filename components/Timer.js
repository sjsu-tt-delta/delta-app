import React from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Minutes: 0,
            Seconds: 0,

        }
        this.decrementMinutes = this.decrementMinutes.bind(this);
        this.decrementSeconds = this.decrementSeconds.bind(this);
        this.incrementMinutes = this.incrementMinutes.bind(this);
        this.incrementSeconds = this.incrementSeconds.bind(this);
        const TriangleLeft = () => {
            return <Triangle style={styles.triangleLeft} />;
        };
    }

    decrementMinutes() {
        if (this.state.Minutes > 0)
            this.setState({ Minutes: this.state.Minutes - 1 });
        if (this.state.Minutes == 0)
            this.setState({ Minutes: 99 })
    }
    decrementSeconds() {
        if (this.state.Seconds > 0)
            this.setState({ Seconds: this.state.Seconds - 1 });
        if (this.state.Seconds == 0)
            this.setState({ Seconds: 59 })
    }
    incrementMinutes() {
        if (this.state.Minutes < 99)
            this.setState({ Minutes: this.state.Minutes + 1 });
        if (this.state.Minutes == 99)
            this.setState({ Minutes: 0 });
    }
    incrementSeconds() {
        if (this.state.Seconds < 59)
            this.setState({ Seconds: this.state.Seconds + 1 });
        if (this.state.Seconds == 59)
            this.setState({ Seconds: 0 });
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
                            style={styles.triangleLeft}
                            activeOpacity={.5}
                            onPress={this.decrementMinutes}>
                        </TouchableOpacity>
                        <Text style={styles.timeText}> {this.state.Minutes} </Text>
                        <TouchableOpacity
                            style={styles.triangleRight}
                            activeOpacity={.5}
                            onPress={this.incrementMinutes}>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.secondsContainer}>
                        <TouchableOpacity
                            style={styles.triangleLeft}
                            activeOpacity={.5}
                            onPress={this.decrementSeconds}>
                        </TouchableOpacity>
                        <Text style={styles.timeText}> {this.state.Seconds} </Text>
                        <TouchableOpacity
                            style={styles.triangleRight}
                            activeOpacity={.5}
                            onPress={this.incrementSeconds}>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.stopButton}>
                        <Text style={styles.text}>STOP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.startButton}>
                        <Text style={styles.text}>START</Text>
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
        fontSize: 50
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
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 100
    },
    secondsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 100
    },
    triangleLeft: {
        borderStyle: "solid",
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 20,
        backgroundColor: "transparent",
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "gray",
        transform: [{ rotate: "-90deg" }],
    },
    triangleRight: {
        borderStyle: "solid",
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 20,
        backgroundColor: "transparent",
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "gray",
        transform: [{ rotate: "90deg" }],
    },
});