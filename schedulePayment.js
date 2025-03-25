import React, { useState, useEffect, createContext } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Platform, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'react-native-calendars';

const PaymentContext = createContext();

const categories = ['Recharge', 'Utility', 'Loan Payment', 'Subscription', 'Insurance', 'Credit Payment', 'Rent', 'Investment'];
const frequencies = ['One-Time', 'Monthly', 'Quarterly', 'Yearly'];

const ScheduledPaymentsApp = () => {
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
    const newPayment = { title, amount, date, category, frequency, notes, status: 'Scheduled' };
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
    acc[payment.date] = { marked: true, dotColor: '#6200ee' };
    return acc;
  }, {});

  const handleDayPress = (day) => {
    setSelectedCalendarDate(day.dateString);
    const payments = scheduledPayments.filter(payment => payment.date === day.dateString);
    setPaymentsOnSelectedDate(payments);
  };

  return (
    <PaymentContext.Provider value={{ scheduledPayments, schedulePayment }}>
      <ScrollView style={styles.container}>
        
        {/* 📝 Schedule Form */}
        <Text style={styles.header}>Schedule a Payment</Text>
        <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} placeholderTextColor="#aaa" />
        <TextInput style={styles.input} placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" placeholderTextColor="#aaa" />

        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput style={styles.input} placeholder="Select Date" value={date} editable={false} placeholderTextColor="#aaa" />
        </TouchableOpacity>
        {showDatePicker && <DateTimePicker mode="date" value={new Date()} onChange={onDateChange} />}

        <Text style={styles.label}>Category:</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
            {categories.map((cat) => <Picker.Item label={cat} value={cat} key={cat} />)}
          </Picker>
        </View>

        <Text style={styles.label}>Frequency:</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={frequency} onValueChange={setFrequency} style={styles.picker}>
            {frequencies.map((freq) => <Picker.Item label={freq} value={freq} key={freq} />)}
          </Picker>
        </View>

        <TextInput style={styles.input} placeholder="Notes / Description" value={notes} onChangeText={setNotes} placeholderTextColor="#aaa" />

        <TouchableOpacity style={styles.button} onPress={schedulePayment}>
          <Text style={styles.buttonText}>Schedule Payment</Text>
        </TouchableOpacity>

        {/* 📜 Schedule History */}
        <Text style={styles.header}>Scheduled Payments History:</Text>
        <FlatList
          data={scheduledPayments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.paymentItem}>
              <Text style={styles.paymentText}>Title: {item.title}</Text>
              <Text style={styles.paymentText}>Amount: {item.amount}</Text>
              <Text style={styles.paymentText}>Date: {item.date}</Text>
              <Text style={styles.paymentText}>Category: {item.category}</Text>
              <Text style={styles.paymentText}>Frequency: {item.frequency}</Text>
              <Text style={styles.paymentText}>Notes: {item.notes}</Text>
              <Text style={styles.paymentText}>Status: {item.status}</Text>
            </View>
          )}
        />

        {/* 📅 Calendar */}
        <Text style={styles.header}>Payment Calendar:</Text>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleDayPress}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#6200ee',
            todayTextColor: '#6200ee',
            dayTextColor: '#000',
            arrowColor: '#6200ee',
            monthTextColor: '#6200ee',
            selectedDayBackgroundColor: '#6200ee',
            selectedDayTextColor: '#ffffff',
          }}
        />

        {/* 🗓 Payments for Selected Date */}
        {selectedCalendarDate !== '' && (
          <View>
            <Text style={styles.header}>Payments on {selectedCalendarDate}:</Text>
            {paymentsOnSelectedDate.length > 0 ? (
              paymentsOnSelectedDate.map((item, index) => (
                <View key={index} style={styles.paymentItem}>
                  <Text style={styles.paymentText}>Title: {item.title}</Text>
                  <Text style={styles.paymentText}>Amount: {item.amount}</Text>
                  <Text style={styles.paymentText}>Category: {item.category}</Text>
                  <Text style={styles.paymentText}>Frequency: {item.frequency}</Text>
                  <Text style={styles.paymentText}>Notes: {item.notes}</Text>
                  <Text style={styles.paymentText}>Status: {item.status}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.paymentText}>No payments scheduled.</Text>
            )}
          </View>
        )}
      </ScrollView>
    </PaymentContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', padding: 20, flex: 1 },
  header: { fontSize: 22, fontWeight: 'bold', color: '#6200ee', marginVertical: 10 },
  input: { borderWidth: 1, borderColor: '#6200ee', padding: 12, marginVertical: 6, borderRadius: 8, color: '#000' },
  label: { marginTop: 10, fontWeight: 'bold', color: '#6200ee' },
  pickerContainer: { borderWidth: 1, borderColor: '#6200ee', borderRadius: 8, marginVertical: 6 },
  picker: { color: '#000' },
  button: { backgroundColor: '#6200ee', padding: 15, borderRadius: 8, alignItems: 'center', marginVertical: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  paymentItem: { backgroundColor: '#6200ee', padding: 12, borderRadius: 8, marginVertical: 6 },
  paymentText: { color: '#333' },
});

export default ScheduledPaymentsApp;
