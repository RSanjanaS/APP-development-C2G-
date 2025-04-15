import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WalletScreen from './WalletScreen';
import AddCardScreen from './AddCardScreen';
import WithdrawScreen from './WithdrawScreen';
import TransferScreen from './TransferScreen';

const Stack = createStackNavigator();

const WalletNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="AddCard" component={AddCardScreen} />
      <Stack.Screen name="Withdraw" component={WithdrawScreen} />
      <Stack.Screen name="Deposit" component={DepositScreen} />
      <Stack.Screen name="Transfer" component={TransferScreen} />
    </Stack.Navigator>
  );
};

export default WalletNavigator;
