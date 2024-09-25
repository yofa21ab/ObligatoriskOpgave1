import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getDatabase, ref, set, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const ReviewActivityScreen = () => {
  const [reviewText, setReviewText] = useState('');
  const [userPoints, setUserPoints] = useState(0);

  const handleSubmitReview = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Fejl", "Du skal være logget ind for at indsende en anmeldelse.");
      return;
    }

    const db = getDatabase();

    // Tilføj anmeldelsen
    const reviewId = `review_${new Date().getTime()}`; // Unik ID til anmeldelsen
    await set(ref(db, `reviews/${reviewId}`), {
      userId: user.uid,
      reviewText: reviewText,
      timestamp: new Date().toISOString(),
    });

    // Hent brugerens nuværende points
    const userRef = ref(db, `users/${user.uid}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const userData = snapshot.val();
      const newPoints = userData.reviewPoints + 100; // Tilføj 100 points
      set(ref(db, `users/${user.uid}`), {
        ...userData,
        reviewPoints: newPoints,
      });
      Alert.alert("Succes", "Anmeldelse sendt og 100 points tilføjet!");
    } else {
      Alert.alert("Fejl", "Brugerdata blev ikke fundet.");
    }

    // Ryd anmeldelsesteksten
    setReviewText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Skriv din anmeldelse her..."
        value={reviewText}
        onChangeText={setReviewText}
      />
      <Button title="Indsend anmeldelse" onPress={handleSubmitReview} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

export default ReviewActivityScreen;
