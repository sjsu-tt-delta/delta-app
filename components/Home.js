import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import logo from '../images/tt_logo.png';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Home({ navigation }) {


    return (
        <View style={styles.container}>
            <Text>{'\n'}</Text>
            <Text>{'\n'}</Text>
            <Image style={styles.image} source={logo} />
            <Text>{'\n'}</Text>
            <Text style={styles.TTLED}>TT LED</Text>
            <Text style={styles.openMotto}>"Whatsoever thy hand findeth to do, do it with thy might;..."--Ecclesiastes 9:10</Text>
            <Text>{'\n'}</Text>
            <TouchableOpacity
                style={styles.button}
                activeOpacity={.5}
                onPress={() => navigation.navigate('NavScreen')}>
                <Text style={styles.text}> Get Started </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#303030',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    TTLED: {
        color: "white",
        fontSize: 70,
        fontFamily: "Times New Roman",
        shadowColor: 'black',
        shadowOpacity: 0,
        shadowRadius: 15,
    },
    openMotto: {
        color: "white",
        padding: 70,
        fontFamily: "Georgia",
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