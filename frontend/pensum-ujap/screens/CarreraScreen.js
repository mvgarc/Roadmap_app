import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import plan from '../assets/data/plan_ic.json';

const CarreraScreen = () => {
    return (
        <ScrollView style={styles.container}>
        <Text style={styles.title}>Plan de Estudios</Text>

        {plan.map((semestre, index) => (
            <View key={index} style={styles.semestreContainer}>
            <Text style={styles.semestreTitle}>{semestre.semestre}</Text>

            {semestre.materias.map((materia, idx) => (
                <View key={idx} style={styles.materiaCard}>
                <Text style={styles.materiaNombre}>{materia.nombre}</Text>
                <Text style={styles.creditos}>Créditos: {materia.creditos}</Text>
                </View>
            ))}
            </View>
        ))}
        </ScrollView>
    );
    };

    const styles = StyleSheet.create({
    container: { padding: 16 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
    semestreContainer: { marginBottom: 24 },
    semestreTitle: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
    materiaCard: {
        padding: 12,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        marginBottom: 8,
    },
    materiaNombre: { fontSize: 16 },
    creditos: { fontSize: 14, color: '#555' },
});

export default CarreraScreen;
