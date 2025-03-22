import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const MoneyExchange = () => {
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('INR');
    const [amount, setAmount] = useState('');
    const [exchangeRate, setExchangeRate] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [transactionFee, setTransactionFee] = useState(0);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchExchangeRate();
    }, [fromCurrency, toCurrency]);

    useEffect(() => {
        if (amount) {
            const fee = (parseFloat(amount) * 0.02).toFixed(2);
            setTransactionFee(fee);
            const result = (parseFloat(amount) * exchangeRate - parseFloat(fee)).toFixed(2);
            setConvertedAmount(result);
        }
    }, [amount, exchangeRate]);

    const fetchExchangeRate = async () => {
        try {
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
            const data = await response.json();
            setExchangeRate(data.rates[toCurrency]);
        } catch (error) {
            console.error("Error fetching exchange rate:", error);
        }
    };

    const handleExchange = () => {
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            alert("Please enter a valid amount");
            return;
        }
        const newTransaction = {
            from: fromCurrency,
            to: toCurrency,
            amount,
            exchanged: convertedAmount,
            rate: exchangeRate,
            date: new Date().toLocaleString()
        };
        setHistory([newTransaction, ...history]);
        setAmount('');
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Money Exchange</Text>
            <View style={styles.row}>
                <View style={styles.pickerContainer}>
                    <Text>From</Text>
                    <Picker selectedValue={fromCurrency} onValueChange={setFromCurrency}>
                        <Picker.Item label="USD" value="USD" />
                        <Picker.Item label="EUR" value="EUR" />
                        <Picker.Item label="INR" value="INR" />
                        <Picker.Item label="GBP" value="GBP" />
                        <Picker.Item label="CAD" value="CAD" />
                        <Picker.Item label="AUD" value="AUD" />
                        <Picker.Item label="JPY" value="JPY" />
                        <Picker.Item label="CNY" value="CNY" />
                        <Picker.Item label="KRW" value="KRW" />
                        <Picker.Item label="KWD" value="KWD" />
                        <Picker.Item label="RUB" value="RUB" />
                    </Picker>
                </View>
                <View style={styles.pickerContainer}>
                    <Text>To</Text>
                    <Picker selectedValue={toCurrency} onValueChange={setToCurrency}>
                        <Picker.Item label="USD" value="USD" />
                        <Picker.Item label="EUR" value="EUR" />
                        <Picker.Item label="INR" value="INR" />
                        <Picker.Item label="GBP" value="GBP" />
                        <Picker.Item label="CAD" value="CAD" />
                        <Picker.Item label="AUD" value="AUD" />
                        <Picker.Item label="JPY" value="JPY" />
                        <Picker.Item label="CNY" value="CNY" />
                        <Picker.Item label="KRW" value="KRW" />
                        <Picker.Item label="KWD" value="KWD" />
                        <Picker.Item label="RUB" value="RUB" />
                    </Picker>
                </View>
            </View>
            <TextInput 
                style={styles.inputLarge}
                placeholder="Enter amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />
            <Text style={styles.text}>Exchange Rate: 1 {fromCurrency} = {exchangeRate} {toCurrency}</Text>
            <Text style={styles.text}>Converted Amount: {convertedAmount} {toCurrency}</Text>
            <Text style={styles.feeText}>Transaction Fee: {transactionFee} {fromCurrency}</Text>
            <TouchableOpacity onPress={handleExchange} style={styles.button}>
                <Text style={styles.buttonText}>Exchange</Text>
            </TouchableOpacity>
            <Text style={styles.historyTitle}>Transaction History</Text>
            {history.length > 0 ? history.map((item, index) => (
                <View key={index} style={styles.historyItem}>
                    <Text>{item.date}</Text>
                    <Text>{item.amount} {item.from} → {item.exchanged} {item.to}</Text>
                    <Text>Rate: {item.rate}</Text>
                </View>
            )) : <Text style={styles.noHistory}>No transactions yet</Text>}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#E3F2FD',
        flex: 1,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1565C0',
        marginBottom: 16,
    },
    text: {
        fontSize: 18,
        color: '#1B5E20',
        marginBottom: 4,
    },
    feeText: {
        fontSize: 14,
        color: '#2E7D32',
    },
    inputLarge: {
        fontSize: 20,
        padding: 12,
        borderWidth: 1,
        borderColor: '#1B5E20',
        borderRadius: 8,
        marginBottom: 12,
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: '#43A047',
        padding: 14,
        borderRadius: 8,
        marginTop: 16,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default MoneyExchange;


