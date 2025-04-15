import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-svg-charts';

const screenWidth = Dimensions.get('window').width;

const sampleData = {
  Day: [10, 12, 9, 11, 13],
  Week: [5, 10, 6, 20, 18, 12, 15],
  Month: [120, 150, 140, 130, 170, 160, 155, 165, 180, 190, 175, 160],
  Year: [1500, 1600, 1400, 1700, 1800, 2100, 2200, 1900, 2000, 2300, 2500, 2700],
};

const transactions = [
  { name: 'Jenny Wilson', amount: '-₹190' },
  { name: 'Wade Warren', amount: '+₹870' },
  { name: 'Cameron Williamson', amount: '-₹1200' },
];

export default function PredictionScreen() {
  const [range, setRange] = useState('Week');

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Predictions</Text>

      {/* Toggle Range */}
      <View style={styles.toggleRow}>
        {['Day', 'Week', 'Month', 'Year'].map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setRange(item)}
            style={[styles.toggleBtn, range === item && styles.activeBtn]}
          >
            <Text
              style={[
                styles.toggleText,
                range === item && styles.activeText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Line Chart */}
      <LineChart
        style={styles.chart}
        data={sampleData[range]}
        svg={{ stroke: '#4caf50' }}
        contentInset={{ top: 20, bottom: 20 }}
      />

      {/* Summary */}
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Balance: ₹12,635</Text>
        <Text style={styles.summaryText}>Debits: ₹8,900</Text>
      </View>

      {/* Transactions */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.transaction}>
            <Text>{item.name}</Text>
            <Text style={{ color: item.amount.includes('+') ? '#4caf50' : '#e53935' }}>
              {item.amount}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  toggleBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeBtn: {
    backgroundColor: '#4caf50',
    borderColor: '#4caf50',
  },
  toggleText: {
    color: '#555',
    fontWeight: '500',
  },
  activeText: {
    color: '#fff',
  },
  chart: {
    height: 200,
    marginVertical: 16,
    width: screenWidth - 40,
    alignSelf: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '500',
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
});
