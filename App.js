import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ActivitiesScreen from './screens/ActivitiesScreen';
import ForumScreen from './screens/ForumScreen';
import ProfileScreen from './components/ProfileScreen';

// Firebase configuration
import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyC2HgM_YMsQYp8Y9assdq6gXZMrbniMM7Q",
  authDomain: "obligatorisk-opgave-1.firebaseapp.com",
  projectId: "obligatorisk-opgave-1",
  storageBucket: "obligatorisk-opgave-1.appspot.com",
  messagingSenderId: "751342484352",
  appId: "1:751342484352:web:b780a6a7297b6eea40df65"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // hvis det allerede er initialiseret
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Hjem" component={HomeScreen} />
        <Tab.Screen name="Aktiviteter" component={ActivitiesScreen} />
        <Tab.Screen name="Forum" component={ForumScreen} />
        <Tab.Screen name="Profil" component={ProfileScreen} />
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
