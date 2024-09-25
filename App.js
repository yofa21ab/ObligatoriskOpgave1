import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ActivitiesScreen from './screens/ActivitiesScreen';
import ForumScreen from './screens/ForumScreen';
import ProfileScreen from './screens/ProfileScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import ReviewActivityScreen from './screens/ReviewActivityScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

// Firebase imports
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Firebase konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyC2HgM_YMsQYp8Y9assdq6gXZMrbniMM7Q",
  authDomain: "obligatorisk-opgave-1.firebaseapp.com",
  databaseURL: "https://obligatorisk-opgave-1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "obligatorisk-opgave-1",
  storageBucket: "obligatorisk-opgave-1.appspot.com",
  messagingSenderId: "751342484352",
  appId: "1:751342484352:web:b780a6a7297b6eea40df65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState(null); // Til at gemme brugerens status

  // Overvåg autentificeringstilstand
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Sætter brugeren til den nuværende logget ind bruger
    });

    return unsubscribe; // Cleanup når komponenten afmonteres
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        {user ? (
          // Hvis brugeren er logget ind, vis disse skærme
          <>
            <Tab.Screen name="Hjem" component={HomeScreen} />
            <Tab.Screen name="Aktiviteter" component={ActivitiesScreen} />
            <Tab.Screen name="Forum" component={ForumScreen} />
            <Tab.Screen name="Profil" component={ProfileScreen} />
            <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
            <Tab.Screen name="Anmeld Aktivitet" component={ReviewActivityScreen} />
          </>
        ) : (
          // Hvis ingen bruger er logget ind, vis login og registrering
          <>
            <Tab.Screen name="Login" component={LoginScreen} />
            <Tab.Screen name="Registrering" component={RegisterScreen} />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
