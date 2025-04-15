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

const spendingData = {
  Week: [1200, 1500, 1400, 1700, 1650, 1800, 1950],
  Month: [4500, 5000, 5300, 5100, 5400, 5700],
  Year: [60000, 65000, 67000, 63000, 68000, 70000],
};

const predictionText = {
  Week: "You're likely to spend ₹400 more this week based on recent activity.",
  Month: "Your expenses have increased 12% this month. Try cutting down on dining.",
  Year: "You’re trending towards ₹72,000 by year-end. Consider saving 10% monthly.",
};

const topSpending = [
  { name: 'Food & Dining', amount: '₹4,500' },
  { name: 'Bills & Utilities', amount: '₹3,200' },
  { name: 'Shopping', amount: '₹2,100' },
];

export default function RealExpensePredictionScreen() {
  const [range, setRange] = useState('Month');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Predictions</Text>

      {/* Toggle */}
      <View style={styles.toggleRow}>
        {['Week', 'Month', 'Year'].map((r) => (
          <TouchableOpacity
            key={r}
            onPress={() => setRange(r)}
            style={[styles.toggleBtn, range === r && styles.activeToggle]}
          >
            <Text style={[styles.toggleText, range === r && styles.activeText]}>{r}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Chart */}
      <View style={styles.card}>
        <Text style={styles.chartTitle}>Spending Trend</Text>
        <LineChart
          style={{ height: 160, marginVertical: 8 }}
          data={spendingData[range]}
          svg={{ stroke: '#00C853', strokeWidth: 2 }}
          contentInset={{ top: 20, bottom: 20 }}
        />
      </View>

      {/* Prediction */}
      <View style={styles.predictionCard}>
        <Text style={styles.predictionText}>{predictionText[range]}</Text>
      </View>

      {/* Top Categories */}
      <Text style={styles.sectionTitle}>Top Spending Categories</Text>
      <FlatList
        data={topSpending}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <Text style={styles.categoryName}>{item.name}</Text>
            <Text style={styles.categoryAmount}>{item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8', padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20, color: '#222' },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  toggleBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  activeToggle: {
    backgroundColor: '#00C853',
  },
  toggleText: {
    color: '#333',
    fontWeight: '600',
  },
  activeText: {
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  predictionCard: {
    backgroundColor: '#e8f5e9',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
  },
  predictionText: {
    color: '#388e3c',
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  categoryItem: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 1,
  },
  categoryName: { fontSize: 15, color: '#333' },
  categoryAmount: { fontSize: 15, fontWeight: '600', color: '#d32f2f' },
});
