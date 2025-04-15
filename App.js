import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IntroScreen from './screens/IntroScreen';
import WalletScreen from './screens/WalletScreen';
import StatementScreen from './screens/StatementScreen';
import { ThemeProvider } from './ThemeContext';
import WalletNavigator from './screens/WalletNavigator';
import AddCardScreen from './screens/AddCardScreen';
import WithdrawScreen from './screens/WithdrawScreen';
import TransferScreen from './screens/TransferScreen';
import InvestmentPortfolioScreen from './screens/InvestmentPortfolioScreen';
import ExpensePredictionScreen from './screens/ExpensePredictionScreen';
import LoginWithOtpScreen from './screens/LoginWithOtpScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileDetailsScreen from './screens/ProfileDetailsScreen';
import SendScreen from './screens/SendScreen';
import ExchangeScreen from './screens/ExchangeScreen';
import ScheduleScreen from './screens/ScheduleScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Intro"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Intro" component={IntroScreen} />
          <Stack.Screen name="Wallet" component={WalletScreen} />
          <Stack.Screen name="Statement" component={StatementScreen} />
          <Stack.Screen name="WalletNavigator" component={WalletNavigator} />
          <Stack.Screen name="AddCard" component={AddCardScreen} />
        <Stack.Screen name="Withdraw" component={WithdrawScreen} />
        <Stack.Screen name="Transfer" component={TransferScreen} />
        <Stack.Screen name="Schedule" component={ScheduleScreen} />
        <Stack.Screen name="Investments" component={InvestmentPortfolioScreen} />
        <Stack.Screen name="ExpensePrediction" component={ExpensePredictionScreen} />
<Stack.Screen name="Login" component={LoginWithOtpScreen} />
<Stack.Screen name="Home" component={HomeScreen} />
<Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} />
<Stack.Screen name="Send" component={SendScreen} />
<Stack.Screen name="Exchange" component={ExchangeScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
