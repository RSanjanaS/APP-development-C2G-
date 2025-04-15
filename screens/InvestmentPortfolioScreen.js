import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const investments = [
  { id: 'stocks', name: 'Stocks', symbol: '📈', value: 708000, change: 3.2, type: 'Equity' },
  { id: 'mf', name: 'Mutual Funds', symbol: '💼', value: 530000, change: -1.1, type: 'Equity' },
  { id: 'realestate', name: 'Real Estate', symbol: '🏠', value: 1200000, change: 0.6, type: 'Property' },
  { id: 'gold', name: 'Gold', symbol: '🥇', value: 200000, change: 1.8, type: 'Commodity' },
  { id: 'bonds', name: 'Bonds', symbol: '💵', value: 150000, change: -0.5, type: 'Debt' },
  { id: 'crypto', name: 'Crypto', symbol: '🪙', value: 98000, change: 4.9, type: 'Crypto' },
  { id: 'etfs', name: 'ETFs', symbol: '📊', value: 310000, change: 2.1, type: 'Equity' },
  { id: 'fd', name: 'Fixed Deposits', symbol: '🏦', value: 180000, change: 0.9, type: 'Debt' },
];

const filters = ['All', 'Equity', 'Property', 'Debt', 'Commodity', 'Crypto'];

const InvestmentPortfolioScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredInvestments =
    selectedFilter === 'All'
      ? investments
      : investments.filter((item) => item.type === selectedFilter);

  const totalValue = investments.reduce((sum, i) => sum + i.value, 0);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Investment Portfolio</Text>

      {/* Total Value */}
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total Value</Text>
        <Text style={styles.totalValue}>₱{totalValue.toLocaleString()}</Text>
      </View>

      {/* Line Chart */}
      <Text style={styles.chartTitle}>Gain/Loss Trend (%)</Text>
      <LineChart
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              data: [0, 1.5, 2.3, 2.0, 3.1, 3.5],
              color: (opacity = 1) => `rgba(0, 255, 153, ${opacity})`, // Green
              strokeWidth: 2,
            },
            {
              data: [0, -0.5, -1.2, -1.0, -0.8, -0.4],
              color: (opacity = 1) => `rgba(255, 77, 77, ${opacity})`, // Red
              strokeWidth: 2,
            },
          ],
          legend: ['Gain %', 'Loss %'],
        }}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />

      {/* Filters */}
      <View style={styles.filterRow}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => setSelectedFilter(filter)}
            style={[
              styles.filterBtn,
              selectedFilter === filter && styles.activeFilter,
            ]}
          >
            <Text
              style={{
                color: selectedFilter === filter ? '#000' : '#fff',
                fontWeight: 'bold',
              }}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Investment Cards */}
      <FlatList
        data={filteredInvestments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.symbol}>{item.symbol}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.sub}>
                ₱{item.value.toLocaleString()} —{' '}
                <Text style={{ color: item.change >= 0 ? '#00ff99' : '#ff4d4d' }}>
                  {item.change >= 0 ? '+' : ''}
                  {item.change}%
                </Text>
              </Text>
            </View>
          </View>
        )}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#1c1c1e',
  backgroundGradientTo: '#1c1c1e',
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(0, 255, 153, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#00ff99',
  },
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#0d0d0d' },
  header: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 16 },
  totalCard: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  totalLabel: { fontSize: 16, color: '#888' },
  totalValue: { fontSize: 28, fontWeight: 'bold', color: '#00ff99' },
  chartTitle: { marginTop: 16, fontSize: 16, fontWeight: 'bold', color: '#fff' },
  chart: { borderRadius: 10, marginTop: 10 },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    marginBottom: 10,
    justifyContent: 'center',
  },
  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 6,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 20,
  },
  activeFilter: {
    backgroundColor: '#00ff99',
    borderColor: '#00ff99',
  },
  card: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#1a1a1a',
    marginBottom: 10,
    alignItems: 'center',
  },
  symbol: { fontSize: 28, marginRight: 12 },
  name: { fontSize: 16, fontWeight: '600', color: '#fff' },
  sub: { fontSize: 13, color: '#aaa' },
});

export default InvestmentPortfolioScreen;
