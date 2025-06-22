import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';

export default function VisitDetailsScreen({ route, navigation }) {
  const { visite } = route.params;

  const handleAttendance = () => {
    navigation.navigate('Attendance', { visite });
  };

  const handleEndVisit = () => {
    navigation.navigate('EndVisit', { visite });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{visite.lieu} - {visite.pays}</Text>
      <Text style={styles.info}>Date : {visite.date}</Text>
      <Text style={styles.info}>Heure : {visite.heureDebut}</Text>
      <Text style={styles.info}>Durée : {visite.duree}h</Text>

      <Text style={styles.subtitle}>Visiteurs :</Text>
      <FlatList
        data={visite.visiteurs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.visitorItem}>• {item.nom} {item.prenom}</Text>
        )}
        ListEmptyComponent={<Text>Aucun visiteur</Text>}
      />

      <View style={styles.buttonContainer}>
        <Button title="Faire l’appel" onPress={handleAttendance} color="#007bff" />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Fin de visite" onPress={handleEndVisit} color="#28a745" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  info: { fontSize: 16, marginBottom: 5 },
  subtitle: { fontSize: 18, fontWeight: '600', marginTop: 20 },
  visitorItem: { fontSize: 16, marginVertical: 2 },
  buttonContainer: { marginTop: 20 },
});
