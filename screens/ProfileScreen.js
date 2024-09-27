import React, { useState, useEffect } from 'react'; // Importer React og hooks til state og effekt
import { View, Text, Button } from 'react-native'; // Importer nødvendige komponenter fra react-native
import { getDatabase, ref, onValue } from 'firebase/database'; // Importer Firebase database funktioner
import { getAuth, signOut } from 'firebase/auth'; // Importer Firebase autentificering funktioner

// ProfileScreen funktionel komponent
const ProfileScreen = () => {
  const [userData, setUserData] = useState({}); // State til at holde brugerdata
  const auth = getAuth(); // Hent autentificeringsinstansen
  const currentUser = auth.currentUser; // Hent den nuværende bruger

  // useEffect hook til at hente brugerdata fra Firebase
  useEffect(() => {
    if (currentUser) { // Kontroller om der er en nuværende bruger
      const db = getDatabase(); // Hent databasen
      const userRef = ref(db, 'users/' + currentUser.uid); // Referer til den specifikke brugers data

      // Lyt til ændringer i brugerens data
      onValue(userRef, (snapshot) => {
        const data = snapshot.val(); // Hent data fra snapshot
        if (data) {
          setUserData(data); // Opdater state med brugerdata
        }
      });
    }
  }, [currentUser]); // Afhængighed: kør effekten igen når currentUser ændres

  // Funktion til at håndtere logout
  const handleLogout = () => {
    signOut(auth).then(() => { // Forsøg at logge brugeren ud
      console.log('User logged out'); // Log besked ved succesfuld logout
    }).catch((error) => { // Håndter eventuelle fejl ved logout
      console.error('Error logging out: ', error); // Log fejlmeddelelse
    });
  };

  return (
    <View>
      {/* Vis brugerens username, eller en besked hvis der ikke er noget */}
      <Text>Username: {userData.username || 'Ingen brugernavn'}</Text>
      {/* Vis brugerens review points, eller 0 hvis der ikke er nogen */}
      <Text>Review Points: {userData.reviewPoints || 0}</Text>
      {/* Vis brugerens badges, eller en besked hvis der ikke er nogen */}
      <Text>Badges: {userData.badges ? userData.badges.join(", ") : 'Ingen badges'}</Text>
      {/* Knap til at logge ud */}
      <Button title="Log ud" onPress={handleLogout} />
    </View>
  );
};

// Eksportér ProfileScreen komponenten til brug i andre dele af appen
export default ProfileScreen;
