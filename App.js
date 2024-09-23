import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ActivitiesScreen from './screens/ActivitiesScreen';
import ForumScreen from './screens/ForumScreen';
import ProfileScreen from './screens/ProfileScreen';
import LeaderboardScreen from './screens/LeaderboardScreen'; // Sørg for denne sti er korrekt
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

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
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Hjem" component={HomeScreen} />
        <Tab.Screen name="Aktiviteter" component={ActivitiesScreen} />
        <Tab.Screen name="Forum" component={ForumScreen} />
        <Tab.Screen name="Profil" component={ProfileScreen} />
        <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
      </Tab.Navigator>
      <StatusBar style="auto" />
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
