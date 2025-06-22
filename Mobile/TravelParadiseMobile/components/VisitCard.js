import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function VisitCard({ visite }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{visite.lieu} ({visite.pays})</Text>
      <Text>Date : {visite.date}</Text>
      <Text>Heure de début : {visite.heureDebut}</Text>
      <Text>Durée : {visite.duree}h</Text>
      <Text>Status : {visite.terminee ? 'Terminée' : 'En cours / à venir'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
