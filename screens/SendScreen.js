import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';

const SendScreen = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([
    { id: '1', title: 'Sent to Rajesh', amount: '-₹150.00', time: 'Today, 10:45 AM' },
    { id: '2', title: 'Received from Meera', amount: '+₹280.00', time: 'Yesterday, 2:30 PM' },
    { id: '3', title: 'Sent to Amit', amount: '-₹500.00', time: 'Mar 20, 5:00 PM' },
    { id: '4', title: 'Received from Suresh', amount: '+₹1,200.00', time: 'Mar 19, 3:15 PM' },
    { id: '5', title: 'Sent to PayTM Wallet', amount: '-₹750.00', time: 'Mar 18, 8:45 AM' },
    { id: '6', title: 'Received from Ramesh', amount: '+₹950.00', time: 'Mar 17, 11:30 AM' },
    { id: '7', title: 'Sent to Uber', amount: '-₹220.00', time: 'Mar 16, 9:00 PM' },
  ]);

  const handleSendMoney = () => {
    if (!recipient || !amount) {
      Alert.alert('Error', 'Please enter both recipient and amount.');
      return;
    }

    const newTransaction = {
      id: Math.random().toString(),
      title: `Sent to ${recipient}`,
      amount: `-₹${amount}`,
      time: 'Just now',
    };

    setTransactions([newTransaction, ...transactions]);
    setRecipient('');
    setAmount('');
  };

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.transactionTitle}>{item.title}</Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      <Text
        style={[
          styles.amountText,
          { color: item.amount.startsWith('+') ? '#00aa5b' : '#d32f2f' },
        ]}
      >
        {item.amount}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Transfer Money</Text>

        <TextInput
          style={styles.input}
          placeholder="Recipient name or number"
          value={recipient}
          onChangeText={setRecipient}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount (INR)"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        {recipient && amount ? (
          <View style={styles.preview}>
            <Text style={styles.previewText}>Sending ₹{amount} to {recipient}</Text>
          </View>
        ) : null}

        <TouchableOpacity style={styles.sendBtn} onPress={handleSendMoney}>
          <Text style={styles.sendText}>Send Money</Text>
        </TouchableOpacity>

        <Text style={styles.transactionsHeader}>Recent Transactions</Text>

        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={renderTransaction}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  preview: {
    backgroundColor: '#e0f7fa',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  previewText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00796b',
  },
  sendBtn: {
    backgroundColor: '#00aa5b',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  sendText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionsHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e6e6e6',
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '700',
    alignSelf: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
});

export default SendScreen;
