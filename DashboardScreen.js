// DashboardScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const DashboardScreen = () => {
    const transactions = [
        { id: '1', title: 'Sent to Rajesh', amount: '-₹150.00', time: 'Today, 10:45 AM' },
        { id: '2', title: 'Received from Meera', amount: '+₹280.00', time: 'Yesterday, 2:30 PM' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome back Arjun Patel</Text>
            <Text style={styles.balanceText}>Total Balance: ₹24,562.80</Text>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text>Transfer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text>Schedule</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text>Exchange</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text>Analytics</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.transactionsHeader}>Recent Transactions</Text>
            <FlatList
                data={transactions}
                renderItem={({ item }) => (
                    <View style={styles.transactionItem}>
                        <Text>{item.title} {item.amount}</Text>
                        <Text>{item.time}</Text>
                    </View>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    welcomeText: {
        fontSize: 20,
    },
    balanceText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    button: {
        padding: 15,
        backgroundColor: '#6200ee',
        width: '22%',
        alignItems: 'center',
        borderRadius: 5,
    },
    transactionsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    transactionItem: {
        padding: 10,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
    },
});

export default DashboardScreen;