import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import VisitDetailsScreen from './screens/VisitDetailsScreen';
import AttendanceScreen from './screens/AttendanceScreen';
import EndVisitScreen from './screens/EndVisitScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Mes Visites' }} />
        <Stack.Screen name="VisitDetails" component={VisitDetailsScreen} options={{ title: 'Détail de la Visite' }} />
        <Stack.Screen name="Attendance" component={AttendanceScreen} options={{ title: 'Appel' }} />
        <Stack.Screen name="EndVisit" component={EndVisitScreen} options={{ title: 'Fin de Visite' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}