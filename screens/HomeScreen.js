import React, { useState } from 'react'; // Importér React og useState hook
import { View, Image, Modal, TouchableOpacity, StyleSheet } from 'react-native'; // Importér nødvendige komponenter fra react-native

// HomeScreen funktionel komponent
const HomeScreen = () => {
  // State til at styre modal synlighed
  const [modalVisible, setModalVisible] = useState(false); // Initialiserer modalVisible til false

  return (
    // Hovedcontainer for HomeScreen
    <View style={styles.container}>
      {/* Klikbart billede, der åbner modal når der trykkes */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        {/* Viser hjemmemockup billedet */}
        <Image source={require('../assets/images/home_mockup.jpg')} style={styles.image} />
      </TouchableOpacity>

      {/* Modal for at vise billedet i fuldskærm */}
      <Modal
        visible={modalVisible} // Bind modalens synlighed til state variablen modalVisible
        animationType="slide" // Animationstype når modalvinduet åbnes
        onRequestClose={() => setModalVisible(false)} // Håndter lukning af modalvinduet ved tryk på "back"-knap
      >
        {/* TouchableOpacity for at lukke modalvinduet ved tryk */}
        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.fullscreenModal}>
          {/* Viser hjemmemockup billedet i fuldskærm */}
          <Image
            source={require('../assets/images/home_mockup.jpg')}
            style={styles.fullImage} // Anvendelse af stil til fuldskærmsbilledet
          />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

// Stile for HomeScreen
const styles = StyleSheet.create({
  container: {
    flex: 1, // Giver containeren mulighed for at fylde den tilgængelige plads
    justifyContent: 'center', // Centrerer indholdet vertikalt
    alignItems: 'center', // Centrerer indholdet horisontalt
  },
  image: {
    width: 300, // Sætter bredden på billedet
    height: 200, // Sætter højden på billedet
    resizeMode: 'contain', // Bevarer billedets aspektsforhold inden for de angivne dimensioner
  },
  fullscreenModal: {
    flex: 1, // Giver modalvinduet mulighed for at fylde hele skærmen
    backgroundColor: 'black', // Sætter en sort baggrund for modalvinduet
  },
  fullImage: {
    width: '100%', // Sætter bredden på det fulde billede til 100% af skærmen
    height: '100%', // Sætter højden på det fulde billede til 100% af skærmen
    resizeMode: 'contain', // Bevarer billedets aspektsforhold i fuldskærm
  },
});

// Eksportér HomeScreen komponenten til brug i andre dele af appen
export default HomeScreen;
