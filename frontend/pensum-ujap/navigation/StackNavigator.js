import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CarreraScreen from '../screens/CarreraScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator>
        <Stack.Screen 
            name="Carrera" 
            component={CarreraScreen}
            options={{ title: 'Plan de Estudios' }}
        />
        {/* Puedes añadir más pantallas aquí */}
        </Stack.Navigator>
    );
};

export default StackNavigator;
