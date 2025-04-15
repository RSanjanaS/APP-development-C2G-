import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function ProfileDetailsScreen() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
  });

  const handleChange = (key, value) => {
    setProfile({ ...profile, [key]: value });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Profile Details</Text>

      {[
        { label: 'Full Name', key: 'name' },
        { label: 'Email Address', key: 'email' },
        { label: 'Phone Number', key: 'phone' },
        { label: 'Gender', key: 'gender' },
        { label: 'Date of Birth', key: 'dob' },
      ].map((field) => (
        <View key={field.key} style={styles.inputBlock}>
          <Text style={styles.label}>{field.label}</Text>
          <TextInput
            style={styles.input}
            value={profile[field.key]}
            onChangeText={(text) => handleChange(field.key, text)}
            placeholder={`Enter ${field.label}`}
            keyboardType={
              field.key === 'phone' ? 'phone-pad' : field.key === 'email' ? 'email-address' : 'default'
            }
          />
        </View>
      ))}

      <TouchableOpacity style={styles.saveBtn}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20, color: '#1b1b1b' },

  inputBlock: { marginBottom: 18 },
  label: { fontSize: 14, marginBottom: 6, color: '#444' },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },

  saveBtn: {
    backgroundColor: '#00C853',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
