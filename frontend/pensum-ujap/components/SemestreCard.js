import { View, Text, StyleSheet } from 'react-native';

export default function SemestreCard({ title, materias }) {
    return (
        <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        {materias.map((m, i) => (
            <Text key={i} style={styles.materia}>• {m}</Text>
        ))}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f2f2f2',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    title: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
    materia: { fontSize: 14, color: '#333' },
});
