import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Gem brugerdata i Firebase
      const db = getDatabase();
      await set(ref(db, 'users/' + userId), {
        username: username,
        reviewPoints: 0,
        badges: [],
      });

      Alert.alert("Registrering succesfuld!", "Du kan nu logge ind.");
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert("Fejl", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Brugernavn"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Adgangskode"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Opret Konto" onPress={handleRegister} />

      {/* Tilføj afstand */}
      <View style={styles.spacing} />

      <Button title="Tilbage til Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  spacing: {
    height: 20, // Juster denne værdi for at ændre afstanden
  },
});

export default RegisterScreen;
