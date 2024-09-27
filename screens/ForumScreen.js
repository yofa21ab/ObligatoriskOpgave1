import React, { useState } from 'react'; // Import React and the useState hook
import { View, Image, Modal, TouchableOpacity, StyleSheet } from 'react-native'; // Import necessary components from react-native

// ForumScreen functional component
const ForumScreen = () => {
  // State variables to control the visibility of the modals for each image
  const [firstModalVisible, setFirstModalVisible] = useState(false); // Modal state for the first image
  const [secondModalVisible, setSecondModalVisible] = useState(false); // Modal state for the second image

  return (
    // Main container for the ForumScreen
    <View style={styles.container}>
      {/* TouchableOpacity for the first image to trigger the first modal */}
      <TouchableOpacity onPress={() => setFirstModalVisible(true)}>
        {/* Displaying the first forum mockup image */}
        <Image source={require('../assets/images/forum_mockup.jpg')} style={styles.image} />
      </TouchableOpacity>

      {/* Modal for the first image */}
      <Modal
        visible={firstModalVisible} // Bind the modal visibility to the state of the first modal
        animationType="slide" // Animation type when the modal appears
        onRequestClose={() => setFirstModalVisible(false)} // Handle back button press on Android
      >
        {/* TouchableOpacity to close the first modal when pressed */}
        <TouchableOpacity onPress={() => setFirstModalVisible(false)} style={styles.fullscreenModal}>
          {/* Fullscreen version of the first forum mockup image */}
          <Image
            source={require('../assets/images/forum_mockup.jpg')}
            style={styles.fullImage} // Apply styles to the full image
          />
        </TouchableOpacity>
      </Modal>

      {/* TouchableOpacity for the second image to trigger the second modal */}
      <TouchableOpacity onPress={() => setSecondModalVisible(true)}>
        {/* Displaying the second forum chat mockup image */}
        <Image source={require('../assets/images/forum_chat_mockup.jpg')} style={styles.image} />
      </TouchableOpacity>

      {/* Modal for the second image */}
      <Modal
        visible={secondModalVisible} // Bind the modal visibility to the state of the second modal
        animationType="slide" // Animation type when the modal appears
        onRequestClose={() => setSecondModalVisible(false)} // Handle back button press on Android
      >
        {/* TouchableOpacity to close the second modal when pressed */}
        <TouchableOpacity onPress={() => setSecondModalVisible(false)} style={styles.fullscreenModal}>
          {/* Fullscreen version of the second forum chat mockup image */}
          <Image
            source={require('../assets/images/forum_chat_mockup.jpg')}
            style={styles.fullImage} // Apply styles to the full image
          />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

// Styles for the ForumScreen
const styles = StyleSheet.create({
  container: {
    flex: 1, // Allow the container to grow and fill the available space
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  image: {
    width: 300, // Set the width of the images
    height: 200, // Set the height of the images
    margin: 10, // Add a little margin between images
    resizeMode: 'contain', // Maintain aspect ratio within the specified dimensions
  },
  fullscreenModal: {
    flex: 1, // Allow the modal to fill the screen
    backgroundColor: 'black', // Set a black background for the modal
  },
  fullImage: {
    width: '100%', // Set the full width of the image
    height: '100%', // Set the full height of the image
    resizeMode: 'contain', // Maintain aspect ratio in fullscreen
  },
});

// Export the ForumScreen component for use in other parts of the app
export default ForumScreen;
