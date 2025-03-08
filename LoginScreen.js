// LoginScreen.js
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <Icon name="account-circle" size={100} />
            <Text style={styles.header}>Welcome to C2G</Text>
            <Text style={styles.subheader}>Your Smart Financial Partner</Text>

            <TextInput style={styles.input} placeholder="Mobile Number" keyboardType="phone-pad" />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Sign In with Biometric</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 10,
    },
    subheader: {
        fontSize: 16,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        width: '100%',
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#6200ee',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    signUpText: {
        marginTop: 10,
        color: '#6200ee',
    },
});

export default LoginScreen;