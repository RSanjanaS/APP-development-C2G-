import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function LoginWithOtpScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSendOtp = () => {
    if (phone.length === 10) {
      setOtpSent(true);
    }
  };

  const handleVerify = () => {
    // Mock verification
    if (otp.length === 4) {
      navigation.replace('Home'); // or 'MainApp', adjust as per your navigator
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <Text style={styles.title}>Login to continue</Text>

      {/* Phone input */}
      {!otpSent && (
        <View style={styles.inputCard}>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your 10-digit number"
            keyboardType="numeric"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />
          <TouchableOpacity style={styles.btn} onPress={handleSendOtp}>
            <Text style={styles.btnText}>Send OTP</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* OTP input */}
      {otpSent && (
        <View style={styles.inputCard}>
          <Text style={styles.label}>Enter OTP sent to +91 {phone}</Text>
          <TextInput
            style={styles.input}
            placeholder="4-digit OTP"
            keyboardType="numeric"
            maxLength={4}
            value={otp}
            onChangeText={setOtp}
          />
          <TouchableOpacity style={styles.btn} onPress={handleVerify}>
            <Text style={styles.btnText}>Verify OTP</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8', padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700', color: '#222', marginBottom: 30, textAlign: 'center' },
  inputCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fafafa',
  },
  btn: {
    backgroundColor: '#00C853',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
