import React, { useState, useEffect } from 'react'; // Importér React og nødvendige hooks
import { View, Text, FlatList } from 'react-native'; // Importér komponenter fra react-native
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
    // Viser en liste af brugere med deres points
    <FlatList
      data={leaderboard} // Bruger leaderboard data som kilde til FlatList
      keyExtractor={(item) => item.userId} // Angiver en unik nøgle for hver listeelement
      renderItem={({ item }) => (
        // Renderer hvert listeelement
        <View>
          {/* Viser brugernavn og antal points, med en fallback til "Ingen brugernavn" hvis ikke tilgængeligt */}
          <Text>{item.username || "Ingen brugernavn"}: {item.reviewPoints || 0} points</Text>
        </View>
      )}
    />
  );
};

// Eksportér LeaderboardScreen komponenten til brug i andre dele af appen
export default LeaderboardScreen;
