import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { getDatabase, ref, set } from 'firebase/database';

const RegistrationScreen = () => {
  const [username, setUsername] = useState('');
  const [reviewPoints, setReviewPoints] = useState(0);
  const [badges, setBadges] = useState([]);

  const handleRegister = () => {
    const db = getDatabase();
    const userId = username; // Du kan også generere et unikt ID
    set(ref(db, 'users/' + userId), {
      username: username,
      reviewPoints: reviewPoints,
      badges: badges,
    }).then(() => {
      console.log("User registered successfully!");
    }).catch((error) => {
      console.error("Error registering user:", error);
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default RegistrationScreen;
