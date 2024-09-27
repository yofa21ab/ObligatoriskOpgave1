// Importerer modules
import React, { useState, useEffect } from 'react'; // Til brug af hooks som useState og useEffect
import { StyleSheet } from 'react-native'; // Til styles
import { NavigationContainer } from '@react-navigation/native'; // Til navigation container
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Til bottom tab navigator
import { Ionicons } from 'react-native-vector-icons'; // Importerer Ionicons til brug som fanebladeikoner
import { initializeApp } from 'firebase/app'; // Firebase app initialisering
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Firebase authentication
import { getDatabase } from 'firebase/database'; // Firebase Realtime Database

// Importerer screens
import HomeScreen from './screens/HomeScreen';
import ActivitiesScreen from './screens/ActivitiesScreen';
import ForumScreen from './screens/ForumScreen';
import ProfileScreen from './screens/ProfileScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import ReviewActivityScreen from './screens/ReviewActivityScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

// Firebase konfiguration og initialisering
const firebaseConfig = {
  apiKey: "AIzaSyC2HgM_YMsQYp8Y9assdq6gXZMrbniMM7Q",
  authDomain: "obligatorisk-opgave-1.firebaseapp.com",
  databaseURL: "https://obligatorisk-opgave-1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "obligatorisk-opgave-1",
  storageBucket: "obligatorisk-opgave-1.appspot.com",
  messagingSenderId: "751342484352",
  appId: "1:751342484352:web:b780a6a7297b6eea40df65"
};

// Initialiser Firebase app og database
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Opret Tab Navigator
const Tab = createBottomTabNavigator();

// Hovedkomponent App
export default function App() {
  const [user, setUser] = useState(null); // Opretter en state variabel for brugerens login-status

  // Tjekker om brugeren er logget ind
  useEffect(() => {
    const auth = getAuth(); // Henter Firebase Auth
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => { // Lyt efter ændringer i brugerens login-status
      setUser(currentUser); // Opdater state med den aktuelle bruger
    });

    return unsubscribe; // Ryd op i listeneren når komponenten unmountes
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // Her bestemmer vi ikonerne for hver fane
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            // Tildel ikoner baseret på rutenavn
            if (route.name === 'Hjem') {
              iconName = focused ? 'home' : 'home-outline'; // Ikon for Hjem
            } else if (route.name === 'Aktiviteter') {
              iconName = focused ? 'reader' : 'reader-outline'; // Ikon for Aktiviteter
            } else if (route.name === 'Forum') {
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline'; // Ikon for Forum
            } else if (route.name === 'Profil') {
              iconName = focused ? 'person' : 'person-outline'; // Ikon for Profil
            } else if (route.name === 'Leaderboard') {
              iconName = focused ? 'trophy' : 'trophy-outline'; // Ikon for Leaderboard
            } else if (route.name === 'Anmeld Aktivitet') {
              iconName = focused ? 'create' : 'create-outline'; // Ikon for Anmeld Aktivitet
            } else if (route.name === 'Login') {
              iconName = focused ? 'log-in' : 'log-in-outline'; // Ikon for Login
            } else if (route.name === 'Registrering') {
              iconName = focused ? 'person-add' : 'person-add-outline'; // Ikon for Registrering
            }

            // Returner Ionicon-elementet som ikon
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato', // Farve for aktive faner
          inactiveTintColor: 'gray',  // Farve for inaktive faner
        }}
      >
        {user ? (
          // Hvis brugeren er logget ind, vis disse faner
          <>
            <Tab.Screen name="Hjem" component={HomeScreen} />
            <Tab.Screen name="Aktiviteter" component={ActivitiesScreen} />
            <Tab.Screen name="Forum" component={ForumScreen} />
            <Tab.Screen name="Profil" component={ProfileScreen} />
            <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
            <Tab.Screen name="Anmeld Aktivitet" component={ReviewActivityScreen} />
          </>
        ) : (
          // Hvis brugeren ikke er logget ind, vis Login og Registrering
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
