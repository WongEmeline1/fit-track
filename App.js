import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import LogScreen from './screens/LogScreen';
import ProgressScreen from './screens/ProgressScreen';
import GoalsScreen from './screens/GoalsScreen';
import { AuthProvider } from './context/AuthContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Log" component={LogScreen} />
          <Tab.Screen name="Progress" component={ProgressScreen} />
          <Tab.Screen name="Goals" component={GoalsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
