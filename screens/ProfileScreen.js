import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth, signOut } from 'firebase/auth';

const ProfileScreen = () => {
  const [userData, setUserData] = useState({});
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (currentUser) {
      const db = getDatabase();
      const userRef = ref(db, 'users/' + currentUser.uid);

      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setUserData(data);
        }
      });
    }
  }, [currentUser]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log('User logged out');
    }).catch((error) => {
      console.error('Error logging out: ', error);
    });
  };

  return (
    <View>
      <Text>Username: {userData.username || 'Ingen brugernavn'}</Text>
      <Text>Review Points: {userData.reviewPoints || 0}</Text>
      <Text>Badges: {userData.badges ? userData.badges.join(", ") : 'Ingen badges'}</Text>
      <Button title="Log ud" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;
