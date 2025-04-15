import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Switch,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../ThemeContext';
import { useNavigation } from '@react-navigation/native';


const wallets = [
  { id: '1', number: '**** **** 5473', amount: 'Rs. 1,895.00', color: '#cce3f6', brand: 'VISA' },
  { id: '2', number: '**** **** 0180', amount: 'Rs. 1,100.00', color: '#f6d5db', brand: 'RuPay' },
  { id: '3', number: '**** **** 8832', amount: 'Rs. 1,846.00', color: '#f6f1cc', brand: 'MasterCard' },
];

const recentTransactions = [
  {
    id: 'usd',
    title: 'US Dollar',
    flag: '🇺🇸',
    routing_number: '540458633',
    bank_code: '3895',
    account_number: '1095036226',
  },
  {
    id: 'cad',
    title: 'Canadian Dollar',
    flag: '🇨🇦',
    routing_number: '604101701',
    bank_code: '8743',
    account_number: '6963259240',
  },
  {
    id: 'eur',
    title: 'Euro',
    flag: '🇪🇺',
    routing_number: '456466892',
    bank_code: '9251',
    account_number: '8536983386',
  },
];

const WalletScreen = () => {
  const navigation = useNavigation();
  const { isDark, toggleTheme } = useTheme();

  const theme = {
    background: isDark ? '#0e0e0e' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
    icon: isDark ? '#ffffff' : '#000000',
  };

  const handleAction = (type) => {
    Alert.alert(type, `You tapped ${type}`);
  };

  const renderWallet = ({ item }) => (
    <View style={[styles.walletCard, { backgroundColor: item.color }]}>
      <View style={styles.cardRow}>
        <Text style={styles.cardNumber}>{item.number}</Text>
        <Text style={styles.cardBrand}>{item.brand}</Text>
      </View>
      <Text style={styles.cardAmount}>{item.amount}</Text>
    </View>
  );

  const renderTransaction = ({ item }) => (
    <View style={styles.currencyRow}>
      <Text style={styles.flag}>{item.flag}</Text>
      <View style={styles.currencyDetails}>
        <Text style={[styles.currencyTitle, { color: theme.text }]}>{item.title}</Text>
        <Text style={styles.currencySubtitle}>Routing: {item.routing_number}</Text>
        <Text style={styles.currencySubtitle}>Bank Code: {item.bank_code}</Text>
        <Text style={styles.currencySubtitle}>Account: {item.account_number}</Text>
      </View>
      <Icon name="chevron-forward" size={20} color="#888" />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Icon name="menu" size={24} color={theme.icon} />
          <Switch value={isDark} onValueChange={toggleTheme} />
          <Icon name="person-circle-outline" size={24} color={theme.icon} />
        </View>

        {/* Balance */}
        <View style={styles.balanceBox}>
          <Text style={[styles.balanceLabel, { color: theme.text }]}>Total Balance</Text>
          <Text style={[styles.balanceAmount, { color: theme.text }]}>Rs. 36,790.00</Text>
        </View>

        {/* Wallets */}
        <View style={styles.walletsHeader}>
          <Text style={[styles.walletsLabel, { color: theme.text }]}>Wallets</Text>
         <TouchableOpacity onPress={() => navigation.navigate('AddCard')}>
  <Text style={styles.newBtnText}>+ New</Text>
</TouchableOpacity>
        </View>

        <FlatList
          data={wallets}
          keyExtractor={(item) => item.id}
          renderItem={renderWallet}
          scrollEnabled={false} // So it scrolls with ScrollView
        />

        {/* Action Buttons */}
        <View style={styles.actionRow}>

<TouchableOpacity onPress={() => navigation.navigate('Send')}>
  <Icon name="arrow-up-circle-outline" size={24} />
  <Text>Send</Text>
</TouchableOpacity>

<TouchableOpacity onPress={() => navigation.navigate('Exchange')}>
  <Icon name="swap-horizontal-outline" size={24} />
  <Text>Exchange</Text>
</TouchableOpacity>

<TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
    <Icon name="calendar-outline" size={24} />
    <Text>Schedule</Text>
  </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <Text style={[styles.receiveLabel, { color: theme.text }]}>Currency Stats</Text>
        <FlatList
          data={recentTransactions}
          keyExtractor={(item) => item.id}
          renderItem={renderTransaction}
          scrollEnabled={false}
        />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={[styles.bottomBar, { backgroundColor: isDark ? '#1a1a1a' : '#f0f0f0' }]}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={24} color={theme.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Investments')}>
  <Icon name="cash-outline" size={24} color={theme.icon} />
</TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleAction('Add')}
          style={styles.fabBtn}
        >
          <Icon name="add" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ExpensePrediction')}>
          <Icon name="analytics-outline" size={24} color={theme.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileDetails')}>
          <Icon name="person-outline" size={24} color={theme.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  balanceBox: {
    alignItems: 'center',
    marginTop: 10,
  },
  balanceLabel: {
    fontSize: 16,
    opacity: 0.6,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  walletsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 30,
    marginBottom: 10,
    alignItems: 'center',
  },
  walletsLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  newBtn: {
    backgroundColor: '#ddd',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  newBtnText: {
    fontWeight: 'bold',
  },
  walletCard: {
    marginHorizontal: 16,
    padding: 15,
    borderRadius: 16,
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cardBrand: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  cardAmount: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  actionBtn: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 5,
    fontSize: 14,
  },
  receiveLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    marginHorizontal: 16,
  },
  currencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  flag: {
    fontSize: 28,
    marginRight: 10,
  },
  currencyDetails: {
    flex: 1,
  },
  currencyTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  currencySubtitle: {
    fontSize: 12,
    color: '#888',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  fabBtn: {
    backgroundColor: '#00aa5b',
    padding: 12,
    borderRadius: 30,
    marginTop: -20,
  },
});

export default WalletScreen;
