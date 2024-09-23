import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { getDatabase, ref, set, onValue } from 'firebase/database';

const ReviewActivityScreen = () => {
  const [reviewText, setReviewText] = useState('');
  const [username, setUsername] = useState('userId123'); // Skift til den aktuelle bruger-ID

  const handleSubmitReview = () => {
    const db = getDatabase();
    const reviewId = `review_${new Date().getTime()}`; // Genererer unikt ID for anmeldelsen

    // Tilføj anmeldelsen
    set(ref(db, 'reviews/' + reviewId), {
      userId: username,
      reviewText: reviewText,
      timestamp: new Date().toISOString(),
    }).then(() => {
      // Opdater brugerens review points
      const userRef = ref(db, 'users/' + username);
      onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        const newReviewPoints = (userData.reviewPoints || 0) + 100; // Tilføj 100 points

        set(ref(db, 'users/' + username), {
          ...userData,
          reviewPoints: newReviewPoints,
        });
      });
      console.log("Review submitted successfully!");
    }).catch((error) => {
      console.error("Error submitting review:", error);
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Write your review"
        value={reviewText}
        onChangeText={setReviewText}
        style={styles.input}
      />
      <Button title="Submit Review" onPress={handleSubmitReview} />
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
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default ReviewActivityScreen;
