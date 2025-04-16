import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import planIC from '../assets/data/plan_ic.json';

const CarreraScreen = () => {
    const [plan, setPlan] = useState(null);
    useEffect(() => {
        // Como el JSON es localmente importado, no hace falta fetch
        setPlan(planIC);
    }, []);
    if (!plan) {
        return (
        <View style={styles.container}>
            <Text>Cargando plan de estudios...</Text>
        </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
        <Text style={styles.title}>{plan.degree}</Text>
        <Text style={styles.subtitle}>Universidad: {plan.university}</Text>

        {plan.semesters.map((semester, index) => (
            <View key={index} style={styles.semesterContainer}>
            <Text style={styles.semesterTitle}>Semestre {semester.semester}</Text>
            {semester.subjects.map((subject, subIndex) => (
                <View key={subIndex} style={styles.subjectCard}>
                <Text style={styles.subjectName}>{subject.name}</Text>
                <Text style={styles.subjectDetail}>Código: {subject.code}</Text>
                <Text style={styles.subjectDetail}>Créditos: {subject.credits}</Text>
                {subject.prerequisites.length > 0 && (
                    <Text style={styles.subjectDetail}>
                    Prerrequisitos: {subject.prerequisites.join(', ')}
                    </Text>
                )}
                </View>
            ))}
            </View>
        ))}
        </ScrollView>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f7f9fc',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 16,
        color: '#555',
    },
    semesterContainer: {
        marginBottom: 24,
    },
    semesterTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
        color: '#2e86de',
    },
    subjectCard: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        elevation: 2,
    },
    subjectName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subjectDetail: {
        fontSize: 14,
        color: '#555',
    },
});

export default CarreraScreen;
