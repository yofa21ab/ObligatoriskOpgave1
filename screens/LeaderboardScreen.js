import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';

const LeaderboardScreen = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, 'users');

    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const usersArray = Object.keys(data).map(key => ({
        ...data[key],
        userId: key
      }));
      // Sorter efter reviewPoints
      usersArray.sort((a, b) => b.reviewPoints - a.reviewPoints);
      setLeaderboard(usersArray);
    });
  }, []);

  return (
    <FlatList
      data={leaderboard}
      keyExtractor={(item) => item.userId}
      renderItem={({ item }) => (
        <View>
          <Text>{item.username}: {item.reviewPoints} points</Text>
        </View>
      )}
    />
  );
};

export default LeaderboardScreen;
