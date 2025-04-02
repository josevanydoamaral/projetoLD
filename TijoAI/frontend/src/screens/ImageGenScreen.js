import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const ImageGenScreen = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const generateImage = () => { 
    setImageUrl(require('../assets/jose-removebg-preview.png')); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gerador de Imagens IA</Text>
        <Text style={styles.subtitle}>Produz imagens e arte geradas por IA</Text>
      </View>

      <View style={styles.promptContainer}>
        <TextInput style={styles.input} placeholder="Descreve a imagem que queres criar..." />
        <TouchableOpacity style={styles.button} onPress={generateImage}>
          <Text style={styles.buttonText}>Generate</Text>
        </TouchableOpacity>
      </View>

      {imageUrl && <Image source={imageUrl} style={styles.generatedImage} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', alignItems: 'center' },
  header: { backgroundColor: '#8A2BE2', padding: 20, width: '100%', alignItems: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  subtitle: { fontSize: 14, color: 'white', marginTop: 5 },
  promptContainer: { width: '90%', backgroundColor: 'white', borderRadius: 10, padding: 15, marginTop: 20, alignItems: 'center' },
  input: { width: '100%', backgroundColor: '#F0F0F0', padding: 10, borderRadius: 8, fontSize: 16 },
  button: { marginTop: 10, backgroundColor: '#8A2BE2', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  generatedImage: { width: 200, height: 200, marginTop: 20, borderRadius: 10 },
});

export default ImageGenScreen;
