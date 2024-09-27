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
      flex: 1,
      padding: 20,
      backgroundColor: '#f0f4f8', // Lys blå baggrund for en blødere effekt
      justifyContent: 'center', // Centrere indholdet
    },
    title: {
      fontSize: 28, // Større skriftstørrelse for titlen
      fontWeight: 'bold', // Fed skrift
      marginBottom: 30, // Plads under titlen
      textAlign: 'center', // Centrerer titlen
    },
    input: {
      height: 50, // Højere inputfelter for bedre brugervenlighed
      borderColor: 'gray', // Borderfarve
      borderWidth: 1, // Borderbredde
      borderRadius: 10, // Rundede hjørner
      marginBottom: 20, // Afstand under inputfeltet
      paddingHorizontal: 15, // Indvendig afstand til venstre og højre
      backgroundColor: '#fff', // Hvid baggrund for inputfelterne
    },
    spacing: {
      height: 20, // Justerbar afstand mellem knapper
    },
  });

// Eksporterer RegisterScreen komponenten
export default RegisterScreen;
