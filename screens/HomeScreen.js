import React, { useState } from 'react';
import { View, Image, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = () => {
  // State til at styre modal synlighed
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Klikbart billede */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image source={require('../assets/images/home_mockup.jpg')} style={styles.image} />
      </TouchableOpacity>

      {/* Fullscreen Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide" // Animation for at glide ind og ud af skærmen
        onRequestClose={() => setModalVisible(false)} // Tilføjet for Android "back"-knap
      >
        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.fullscreenModal}>
          {/* Fullscreen billede */}
          <Image
            source={require('../assets/images/home_mockup.jpg')}
            style={styles.fullImage}
          />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
  fullscreenModal: {
    flex: 1,
    backgroundColor: 'black', // Baggrundsfarve for hele modalen (fuld skærm)
  },
  fullImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // Sørger for, at billedet passer på skærmen
  },
});

export default HomeScreen;
