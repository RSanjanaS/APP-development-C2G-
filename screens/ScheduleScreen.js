import React, { useState, useEffect, createContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  ScrollView, StyleSheet, Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'react-native-calendars';

const PaymentContext = createContext();

const categories = ['Recharge', 'Utility', 'Loan Payment', 'Subscription', 'Insurance', 'Credit Payment', 'Rent', 'Investment'];
const frequencies = ['One-Time', 'Monthly', 'Quarterly', 'Yearly'];

const ScheduleScreen = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Recharge');
  const [frequency, setFrequency] = useState('One-Time');
  const [notes, setNotes] = useState('');
  const [scheduledPayments, setScheduledPayments] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState('');
  const [paymentsOnSelectedDate, setPaymentsOnSelectedDate] = useState([]);

  useEffect(() => {
    loadScheduledPayments();
  }, []);

  const loadScheduledPayments = async () => {
    const data = await AsyncStorage.getItem('scheduledPayments');
    if (data) setScheduledPayments(JSON.parse(data));
  };

  const schedulePayment = async () => {
    if (!amount || !date || !title) {
      alert('Title, Amount, and Date are required');
      return;
    }

    const newPayment = {
      title, amount, date, category, frequency, notes, status: 'Scheduled'
    };
    const updatedPayments = [...scheduledPayments, newPayment];
    setScheduledPayments(updatedPayments);
    await AsyncStorage.setItem('scheduledPayments', JSON.stringify(updatedPayments));
    resetFields();
  };

  const resetFields = () => {
    setTitle('');
    setAmount('');
    setDate('');
    setCategory('Recharge');
    setFrequency('One-Time');
    setNotes('');
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setDate(formattedDate);
    }
  };

  const markedDates = scheduledPayments.reduce((acc, payment) => {
    acc[payment.date] = { marked: true, dotColor: '#00aa5b' };
    return acc;
  }, {});

  const handleDayPress = (day) => {
    setSelectedCalendarDate(day.dateString);
    const payments = scheduledPayments.filter(payment => payment.date === day.dateString);
    setPaymentsOnSelectedDate(payments);
  };

  return (
    <PaymentContext.Provider value={{ scheduledPayments, schedulePayment }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Schedule a Payment</Text>

        <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} placeholderTextColor="#aaa" />
        <TextInput style={styles.input} placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" placeholderTextColor="#aaa" />

        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput style={styles.input} placeholder="Select Date" value={date} editable={false} placeholderTextColor="#aaa" />
        </TouchableOpacity>
        {showDatePicker && <DateTimePicker mode="date" value={new Date()} onChange={onDateChange} />}

        <Text style={styles.label}>Category</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
            {categories.map(cat => <Picker.Item key={cat} label={cat} value={cat} />)}
          </Picker>
        </View>

        <Text style={styles.label}>Frequency</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={frequency} onValueChange={setFrequency} style={styles.picker}>
            {frequencies.map(freq => <Picker.Item key={freq} label={freq} value={freq} />)}
          </Picker>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Notes / Description"
          value={notes}
          onChangeText={setNotes}
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity style={styles.button} onPress={schedulePayment}>
          <Text style={styles.buttonText}>Schedule Payment</Text>
        </TouchableOpacity>

        <Text style={styles.header}>Scheduled Payments History</Text>
        {scheduledPayments.length > 0 ? (
          <FlatList
            data={scheduledPayments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardText}>Amount: ₹{item.amount}</Text>
                <Text style={styles.cardText}>Date: {item.date}</Text>
                <Text style={styles.cardText}>Category: {item.category}</Text>
                <Text style={styles.cardText}>Frequency: {item.frequency}</Text>
                <Text style={styles.cardText}>Status: {item.status}</Text>
                {item.notes ? <Text style={styles.cardNote}>Note: {item.notes}</Text> : null}
              </View>
            )}
          />
        ) : (
          <Text style={styles.noHistory}>No scheduled payments yet</Text>
        )}

        <Text style={styles.header}>Payment Calendar</Text>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleDayPress}
          theme={{
            calendarBackground: '#fff',
            textSectionTitleColor: '#00aa5b',
            todayTextColor: '#00aa5b',
            arrowColor: '#00aa5b',
            selectedDayBackgroundColor: '#00aa5b',
            selectedDayTextColor: '#fff',
            monthTextColor: '#000',
            dayTextColor: '#333',
          }}
        />

        {selectedCalendarDate !== '' && (
          <View style={styles.selectedDateBox}>
            <Text style={styles.header}>Payments on {selectedCalendarDate}</Text>
            {paymentsOnSelectedDate.length > 0 ? (
              paymentsOnSelectedDate.map((item, index) => (
                <View key={index} style={styles.card}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardText}>Amount: ₹{item.amount}</Text>
                  <Text style={styles.cardText}>Category: {item.category}</Text>
                  <Text style={styles.cardText}>Frequency: {item.frequency}</Text>
                  <Text style={styles.cardText}>Status: {item.status}</Text>
                  {item.notes ? <Text style={styles.cardNote}>Note: {item.notes}</Text> : null}
                </View>
              ))
            ) : (
              <Text style={styles.noHistory}>No payments scheduled on this date</Text>
            )}
          </View>
        )}
      </ScrollView>
    </PaymentContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', padding: 20, flex: 1 },
  header: { fontSize: 20, fontWeight: 'bold', color: '#00aa5b', marginVertical: 12 },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4, color: '#444' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
    backgroundColor: '#f9f9f9',
    color: '#000',
    fontSize: 16,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    marginVertical: 6,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#000',
  },
  button: {
    backgroundColor: '#00aa5b',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#f1f1f1',
    padding: 14,
    borderRadius: 10,
    marginVertical: 6,
    borderColor: '#e0e0e0',
    borderWidth: 1,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
  },
  cardText: {
    fontSize: 14,
    color: '#444',
  },
  cardNote: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic',
  },
  selectedDateBox: {
    marginTop: 20,
    marginBottom: 40,
  },
  noHistory: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default ScheduleScreen;
