import React, { useState } from 'react'; // Importerer React og useState hook
import { View, TextInput, Button, StyleSheet, Text } from 'react-native'; // Importerer nødvendige komponenter fra React Native
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Importerer Firebase autentificeringsfunktioner

const LoginScreen = ({ navigation }) => {
  // State til at holde email, adgangskode og eventuelle fejlmeddelelser
  const [email, setEmail] = useState(''); // State til email
  const [password, setPassword] = useState(''); // State til adgangskode
  const [error, setError] = useState(null); // State til fejlmeddelelser

  // Funktion til at håndtere login
  const handleLogin = () => {
    const auth = getAuth(); // Henter autentificeringsinstansen
    signInWithEmailAndPassword(auth, email, password) // Forsøger at logge brugeren ind
      .then((userCredential) => {
        console.log("User logged in successfully!"); // Log meddelelse ved succesfuld login
        navigation.navigate("Profile"); // Naviger til profilsiden
      })
      .catch((error) => {
        setError(error.message); // Sætter fejlmeddelelsen, hvis login fejler
      });
  };

  return (
    <View style={styles.container}> 
      <TextInput
        placeholder="Email" // Pladsholder tekst for email-input
        value={email} // Værdi af email-input
        onChangeText={setEmail} // Opdaterer email state ved ændringer
        style={styles.input} // Anvender stil til inputfeltet
      />
      <TextInput
        placeholder="Password" // Pladsholder tekst for adgangskode-input
        value={password} // Værdi af adgangskode-input
        onChangeText={setPassword} // Opdaterer adgangskode state ved ændringer
        secureTextEntry // Gør, at adgangskoden vises som prikker
        style={styles.input} // Anvender stil til inputfeltet
      />
      <Button title="Login" onPress={handleLogin} /> 
      {error && <Text style={styles.error}>{error}</Text>} 
    </View>
  );
};

// Styling af komponenter
const styles = StyleSheet.create({
  container: {
    flex: 1, // Fylder hele skærmen
    justifyContent: 'center', // Centerer indholdet lodret
    padding: 16, // Indvendig polstring
  },
  input: {
    height: 40, // Højde på inputfeltet
    borderColor: 'gray', // Farve på kantlinje
    borderWidth: 1, // Tykkelse på kantlinje
    marginBottom: 12, // Margin mellem inputfelterne
    paddingHorizontal: 8, // Indvendig polstring til venstre og højre
  },
  error: {
    color: 'red', // Farve til fejlmeddelelse
  },
});

// Eksporterer LoginScreen komponenten
export default LoginScreen;
