import React, { useState } from 'react'; // Importer React og useState hooken
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native'; // Importer nødvendige komponenter fra react-native
import { getDatabase, ref, set, get } from 'firebase/database'; // Importer Firebase database funktioner
import { getAuth } from 'firebase/auth'; // Importer Firebase autentificering funktioner

// ReviewActivityScreen funktionel komponent
const ReviewActivityScreen = () => {
  const [reviewText, setReviewText] = useState(''); // State til at holde anmeldelsestekst
  const [userPoints, setUserPoints] = useState(0); // State til at holde brugerens point (selvom den ikke bruges i koden)

  // Funktion til at håndtere indsendelse af anmeldelsen
  const handleSubmitReview = async () => {
    const auth = getAuth(); // Hent autentificeringsinstansen
    const user = auth.currentUser; // Hent den nuværende bruger

    // Kontroller om brugeren er logget ind
    if (!user) {
      Alert.alert("Fejl", "Du skal være logget ind for at indsende en anmeldelse."); // Vis en fejlmeddelelse hvis ikke
      return; // Afslut funktionen hvis brugeren ikke er logget ind
    }

    const db = getDatabase(); // Hent databasen

    // Generer en unik ID til anmeldelsen
    const reviewId = `review_${new Date().getTime()}`; 
    // Indsend anmeldelsen til databasen
    await set(ref(db, `reviews/${reviewId}`), {
      userId: user.uid, // Gem brugerens ID
      reviewText: reviewText, // Gem anmeldelsesteksten
      timestamp: new Date().toISOString(), // Gem tidsstemplet for anmeldelsen
    });

    // Hent brugerens nuværende points
    const userRef = ref(db, `users/${user.uid}`); // Referer til brugerens data
    const snapshot = await get(userRef); // Hent data fra referencen

    // Kontroller om brugerdata eksisterer
    if (snapshot.exists()) {
      const userData = snapshot.val(); // Hent brugerdata fra snapshot
      const newPoints = userData.reviewPoints + 100; // Tilføj 100 points til brugerens nuværende points
      set(ref(db, `users/${user.uid}`), {
        ...userData, // Behold eksisterende brugerdata
        reviewPoints: newPoints, // Opdater reviewPoints
      });
      Alert.alert("Succes", "Anmeldelse sendt og 100 points tilføjet!"); // Vis succesmeddelelse
    } else {
      Alert.alert("Fejl", "Brugerdata blev ikke fundet."); // Vis fejlmeddelelse hvis brugerdata ikke findes
    }

    // Ryd anmeldelsesteksten
    setReviewText(''); // Nulstil anmeldelsesteksten til en tom streng
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input} // Stil til tekstinput
        placeholder="Skriv din anmeldelse her..." // Pladsholdertekst
        value={reviewText} // Bind tekstinput til reviewText state
        onChangeText={setReviewText} // Opdater reviewText state når teksten ændres
      />
      <Button title="Indsend anmeldelse" onPress={handleSubmitReview} />
    </View>
  );
};

// Stil til komponenterne
const styles = StyleSheet.create({
  container: {
    flex: 1, // Fuld højde
    padding: 16, // Indvendig polstring
    backgroundColor: '#fff', // Baggrundsfarve
  },
  input: {
    height: 100, // Højde på inputfeltet
    borderColor: 'gray', // Borderfarve
    borderWidth: 1, // Borderbredde
    marginBottom: 10, // Margin under inputfeltet
    paddingLeft: 8, // Indvendig polstring til venstre
  },
});

// Eksportér ReviewActivityScreen komponenten til brug i andre dele af appen
export default ReviewActivityScreen;
