import React, { useState } from 'react';
import { View, Image, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const ForumScreen = () => {
  const [firstModalVisible, setFirstModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Første billede */}
      <TouchableOpacity onPress={() => setFirstModalVisible(true)}>
        <Image source={require('../assets/images/forum_mockup.jpg')} style={styles.image} />
      </TouchableOpacity>

      {/* Modal for første billede */}
      <Modal
        visible={firstModalVisible}
        animationType="slide"
        onRequestClose={() => setFirstModalVisible(false)}
      >
        <TouchableOpacity onPress={() => setFirstModalVisible(false)} style={styles.fullscreenModal}>
          <Image
            source={require('../assets/images/forum_mockup.jpg')}
            style={styles.fullImage}
          />
        </TouchableOpacity>
      </Modal>

      {/* Andet billede */}
      <TouchableOpacity onPress={() => setSecondModalVisible(true)}>
        <Image source={require('../assets/images/forum_chat_mockup.jpg')} style={styles.image} />
      </TouchableOpacity>

      {/* Modal for andet billede */}
      <Modal
        visible={secondModalVisible}
        animationType="slide"
        onRequestClose={() => setSecondModalVisible(false)}
      >
        <TouchableOpacity onPress={() => setSecondModalVisible(false)} style={styles.fullscreenModal}>
          <Image
            source={require('../assets/images/forum_chat_mockup.jpg')}
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
    margin: 10, // Lidt margin mellem billederne
    resizeMode: 'contain',
  },
  fullscreenModal: {
    flex: 1,
    backgroundColor: 'black',
  },
  fullImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default ForumScreen;
