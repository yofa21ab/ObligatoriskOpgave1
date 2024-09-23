import React from 'react';
import { View, Text, Button } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const points = 1200; // placeholder data
  const badges = ['Super Reviewer', 'Top Contributor']; // placeholder data
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Brugerens profil</Text>
      <Text>Point: {points}</Text>
      <Text>Badges:</Text>
      {badges.map((badge, index) => (
        <Text key={index}>{badge}</Text>
      ))}
      <Button title="Indstillinger" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
};

export default ProfileScreen;
