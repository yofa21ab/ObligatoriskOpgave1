import React, { useState } from 'react'; // Importerer React og useState hook
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native'; // Importerer nødvendige komponenter fra React Native
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Importerer Firebase autentificering
import { getDatabase, ref, set } from 'firebase/database'; // Importerer Firebase database funktioner

const RegisterScreen = ({ navigation }) => {
  // State til at holde værdier for brugernavn, email og adgangskode
  const [username, setUsername] = useState(''); // Brugernavn state
  const [email, setEmail] = useState(''); // Email state
  const [password, setPassword] = useState(''); // Adgangskode state

  // Funktion til at håndtere registrering af bruger
  const handleRegister = async () => {
    const auth = getAuth(); // Henter autentificeringsinstansen

    try {
      // Opretter en ny bruger med email og adgangskode
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid; // Henter brugerens ID

      // Gem brugerdata i Firebase
      const db = getDatabase(); // Henter databaseinstansen
      await set(ref(db, 'users/' + userId), { // Refererer til brugerens data
        username: username, // Gemmer brugernavnet
        reviewPoints: 0, // Initialiserer reviewPoints til 0
        badges: [], // Initialiserer badges som en tom liste
      });

      // Viser en succesmeddelelse og navigerer til login
      Alert.alert("Registrering succesfuld!", "Du kan nu logge ind.");
      navigation.navigate('Login'); // Navigerer til login skærmen
    } catch (error) {
      // Viser en fejlmeddelelse, hvis registreringen mislykkes
      Alert.alert("Fejl", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input} // Stil til inputfelt
        placeholder="Brugernavn" // Pladsholder tekst
        value={username} // Værdi af inputfeltet
        onChangeText={setUsername} // Opdaterer brugernavn state ved ændringer
      />
      <TextInput
        style={styles.input} // Stil til inputfelt
        placeholder="Email" // Pladsholder tekst
        value={email} // Værdi af inputfeltet
        onChangeText={setEmail} // Opdaterer email state ved ændringer
        keyboardType="email-address" // Tastaturtype til email
      />
      <TextInput
        style={styles.input} // Stil til inputfelt
        placeholder="Adgangskode" // Pladsholder tekst
        value={password} // Værdi af inputfeltet
        onChangeText={setPassword} // Opdaterer adgangskode state ved ændringer
        secureTextEntry // Gør at adgangskoden vises som prikker
      />
      <Button title="Opret Konto" onPress={handleRegister} />


      <View style={styles.spacing} /> 

      <Button title="Tilbage til Login" onPress={() => navigation.navigate('Login')} /> 
    </View>
  );
};

// Styling af komponenter
const styles = StyleSheet.create({
  container: {
    flex: 1, // Fylder hele skærmen
    padding: 16, // Indvendig polstring
    backgroundColor: '#fff', // Baggrundsfarve
  },
  input: {
    height: 40, // Højde på inputfeltet
    borderColor: 'gray', // Farve på kantlinje
    borderWidth: 1, // Tykkelse på kantlinje
    marginBottom: 10, // Margin mellem inputfelterne
    paddingLeft: 8, // Indvendig polstring til venstre
  },
  spacing: {
    height: 20, // Juster denne værdi for at ændre afstanden mellem knapperne
  },
});

// Eksporterer RegisterScreen komponenten
export default RegisterScreen;
