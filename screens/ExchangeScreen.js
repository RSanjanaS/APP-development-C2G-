import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ExchangeScreen = () => {
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
      date: new Date().toLocaleString(),
    };

    setHistory([newTransaction, ...history]);
    setAmount('');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Money Exchange</Text>

      <View style={styles.row}>
        <View style={styles.pickerWrapper}>
          <Text style={styles.label}>From</Text>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={fromCurrency}
              onValueChange={setFromCurrency}
              style={styles.picker}
              dropdownIconColor="#333"
            >
              {currencies.map((c) => (
                <Picker.Item key={c} label={c} value={c} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.pickerWrapper}>
          <Text style={styles.label}>To</Text>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={toCurrency}
              onValueChange={setToCurrency}
              style={styles.picker}
              dropdownIconColor="#333"
            >
              {currencies.map((c) => (
                <Picker.Item key={c} label={c} value={c} />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <View style={styles.resultBox}>
        <Text style={styles.resultText}>Exchange Rate:</Text>
        <Text style={styles.resultValue}>1 {fromCurrency} = {exchangeRate} {toCurrency}</Text>

        <Text style={styles.resultText}>Converted Amount:</Text>
        <Text style={styles.resultValue}>{convertedAmount} {toCurrency}</Text>

        <Text style={styles.resultText}>Transaction Fee:</Text>
        <Text style={styles.resultValue}>{transactionFee} {fromCurrency}</Text>
      </View>

      <TouchableOpacity onPress={handleExchange} style={styles.button}>
        <Text style={styles.buttonText}>Exchange</Text>
      </TouchableOpacity>

      <Text style={styles.historyTitle}>Transaction History</Text>

      {history.length > 0 ? (
        history.map((item, index) => (
          <View key={index} style={styles.historyCard}>
            <Text style={styles.historyDate}>{item.date}</Text>
            <Text style={styles.historyLine}>
              {item.amount} {item.from} → {item.exchanged} {item.to}
            </Text>
            <Text style={styles.historyRate}>Rate: {item.rate}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noHistory}>No transactions yet</Text>
      )}
    </ScrollView>
  );
};

const currencies = ['USD', 'EUR', 'INR', 'GBP', 'CAD', 'AUD', 'JPY', 'CNY', 'KRW', 'KWD', 'RUB'];

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 16,
  },
  pickerWrapper: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
  },
  pickerBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
  },
  picker: {
    height: 44,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
  },
  resultBox: {
    backgroundColor: '#f1f9f8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderColor: '#d0ebe5',
    borderWidth: 1,
  },
  resultText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#00aa5b',
  },
  button: {
    backgroundColor: '#00aa5b',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  historyCard: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e6e6e6',
  },
  historyDate: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  historyLine: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  historyRate: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  noHistory: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 12,
  },
});

export default ExchangeScreen;
