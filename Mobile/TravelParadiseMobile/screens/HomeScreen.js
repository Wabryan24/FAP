import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import VisitCard from '../components/VisitCard';

export default function HomeScreen({ navigation }) {
  const [visites, setVisites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVisites = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get('http://<TON_BACKEND>/api/visites', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVisites(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des visites :', error);
      Alert.alert("Erreur", "Impossible de charger les visites.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.replace('Login');
  };

  useEffect(() => {
    fetchVisites();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('VisitDetails', { visite: item })}>
      <VisitCard visite={item} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.logoutButton}>
        <Button title="Déconnexion" onPress={handleLogout} color="#dc3545" />
      </View>
      <Text style={styles.title}>Mes Visites</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={visites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<Text>Aucune visite trouvée</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  logoutButton: { marginBottom: 10, alignSelf: 'flex-end' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
