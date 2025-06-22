import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Switch, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AttendanceScreen({ route, navigation }) {
  const { visite } = route.params;

  const [visiteurs, setVisiteurs] = useState(
    visite.visiteurs.map(v => ({ ...v, present: false, commentaire: '' }))
  );

  const togglePresence = (index) => {
    const updated = [...visiteurs];
    updated[index].present = !updated[index].present;
    setVisiteurs(updated);
  };

  const updateComment = (index, text) => {
    const updated = [...visiteurs];
    updated[index].commentaire = text;
    setVisiteurs(updated);
  };

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const payload = { visiteurs };
      await axios.post(`http://<TON_BACKEND>/api/visites/${visite.id}/presence`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert('Succès', 'Présence enregistrée');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appel - {visite.lieu}</Text>
      <FlatList
        data={visiteurs}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.visitorCard}>
            <View style={styles.row}>
              <Text style={styles.name}>{item.nom} {item.prenom}</Text>
              <Switch
                value={item.present}
                onValueChange={() => togglePresence(index)}
              />
            </View>
            <TextInput
              placeholder="Commentaire..."
              value={item.commentaire}
              onChangeText={(text) => updateComment(index, text)}
              style={styles.commentInput}
            />
          </View>
        )}
      />
      <Button title="Valider l’appel" onPress={handleSubmit} color="#007bff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  visitorCard: { marginBottom: 15, padding: 15, backgroundColor: '#f0f0f0', borderRadius: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 16 },
  commentInput: {
    marginTop: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
});
