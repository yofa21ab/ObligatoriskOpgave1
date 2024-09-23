import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';

const ProfileScreen = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const db = getDatabase();
    const userId = "userId123"; // Skift dette med det aktuelle bruger-id
    const userRef = ref(db, 'users/' + userId);

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setUserData(data);
    });
  }, []);

  return (
    <View>
      <Text>Username: {userData.username}</Text>
      <Text>Review Points: {userData.reviewPoints}</Text>
      <Text>Badges: {userData.badges && userData.badges.join(", ")}</Text>
    </View>
  );
};

export default ProfileScreen;
