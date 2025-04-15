import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back 👋</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications-outline" size={26} color="#111" />
        </TouchableOpacity>
      </View>

      {/* Balance Card */}
      <LinearGradient
        colors={['#e0ffe1', '#ffffff']}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 1, y: 1 }}
        style={styles.balanceCard}
      >
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={styles.balanceValue}>₹1,52,300</Text>
        <View style={styles.balanceFooter}>
          <Text style={styles.income}>+ ₹25,000</Text>
          <Text style={styles.expense}>- ₹8,700</Text>
        </View>
      </LinearGradient>

      {/* Quick Access Tiles */}
      <View style={styles.quickAccess}>
        {[
          { label: 'Wallet', icon: 'wallet-outline', screen: 'Wallet' },
          { label: 'Expenses', icon: 'stats-chart-outline', screen: 'ExpensePrediction' },
          { label: 'Goals', icon: 'trophy-outline', screen: 'Goals' },
          { label: 'Profile', icon: 'person-outline', screen: 'ProfileDetails' },
        ].map(({ label, icon, screen }) => (
          <TouchableOpacity
            key={label}
            style={styles.tile}
            onPress={() => navigation.navigate(screen)}
          >
            <Ionicons name={icon} size={26} color="#00C853" />
            <Text style={styles.tileText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tip Card */}
      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>💡 Tip of the Day</Text>
        <Text style={styles.tipText}>
          Budgeting isn’t about limiting yourself — it's about making the things that matter possible.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f2fdf3',
    paddingTop: Platform.OS === 'android' ? 40 : 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1b1b1b',
  },

  balanceCard: {
    padding: 22,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 25,
  },
  balanceLabel: {
    color: '#666',
    fontSize: 15,
    marginBottom: 4,
  },
  balanceValue: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 14,
  },
  balanceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  income: { color: '#00C853', fontWeight: '600', fontSize: 15 },
  expense: { color: '#d32f2f', fontWeight: '600', fontSize: 15 },

  quickAccess: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  tile: {
    width: (screenWidth - 60) / 2,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 24,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  tileText: {
    marginTop: 10,
    fontWeight: '600',
    fontSize: 15,
    color: '#333',
  },

  tipCard: {
    backgroundColor: '#fffef5',
    padding: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#f9a825',
  },
  tipText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});
