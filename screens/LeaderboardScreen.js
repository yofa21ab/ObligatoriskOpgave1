import React, { useState, useEffect } from 'react'; // Importér React og nødvendige hooks
import { View, Text, FlatList, StyleSheet } from 'react-native'; // Importér komponenter fra react-native
import { getDatabase, ref, onValue } from 'firebase/database'; // Importér Firebase funktioner til at interagere med databasen

// LeaderboardScreen funktionel komponent
const LeaderboardScreen = () => {
  const [leaderboard, setLeaderboard] = useState([]); // Initialiserer state til at holde leaderboard data

  useEffect(() => {
    // Henter databaseinstansen fra Firebase
    const db = getDatabase();
    const usersRef = ref(db, 'users'); // Refererer til 'users' noden i databasen

    // Lytter efter ændringer i 'users' noden
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val(); // Henter data fra snapshot
      if (data) {
        // Mapper data til et array af brugere
        const usersArray = Object.keys(data).map((key) => ({
          ...data[key], // Indsætter brugerdata
          userId: key, // Tilføjer userId som nøglen fra databasen
        }));
        // Sorter arrayet efter reviewPoints i faldende rækkefølge
        usersArray.sort((a, b) => b.reviewPoints - a.reviewPoints);
        setLeaderboard(usersArray); // Opdaterer leaderboard state med det sorterede array
      }
    });
  }, []); // Effektens afhængigheder, tom array betyder, at den kun køres én gang ved komponentens montering

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={leaderboard}
        keyExtractor={(item) => item.userId}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.rank}>{index + 1}</Text>
            <Text style={styles.username}>{item.username || "Ingen brugernavn"}</Text>
            <Text style={styles.points}>{item.reviewPoints || 0} points</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8', // Lys grå baggrund
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Centrerer titlen
  },
  itemContainer: {
    flexDirection: 'row', // Laver en række for rang, brugernavn og points
    justifyContent: 'space-between', // Fordeler elementerne jævnt
    padding: 15,
    borderBottomWidth: 1, // Tilføjer en linje under hvert element
    borderBottomColor: '#ddd', // Lys grå farve til linjen
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 30, // Fast bredde til rang
  },
  username: {
    fontSize: 18,
    flex: 1, // Gør brugernavnet fleksibelt
    marginLeft: 10, // Margin til venstre for brugernavnet
  },
  points: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50', // Grøn farve til points
  },
});

// Eksporterer LeaderboardScreen komponenten
export default LeaderboardScreen;
