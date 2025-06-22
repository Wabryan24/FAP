import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EndVisitScreen({ route, navigation }) {
  const { visite } = route.params;
  const [commentaire, setCommentaire] = useState('');

  const handleEndVisit = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      await axios.post(`http://<TON_BACKEND>/api/visites/${visite.id}/fin`, 
        { commentaire }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert('Visite clôturée', 'Votre commentaire a été enregistré');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de clôturer la visite');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fin de visite</Text>
      <Text style={styles.subtitle}>Commentaire général :</Text>
      <TextInput
        multiline
        placeholder="Entrez votre commentaire ici..."
        value={commentaire}
        onChangeText={setCommentaire}
        style={styles.textArea}
      />
      <Button title="Clôturer la visite" onPress={handleEndVisit} color="#28a745" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { fontSize: 16, marginBottom: 10 },
  textArea: {
    height: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
});
