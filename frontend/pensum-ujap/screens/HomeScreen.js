import { View, Text, FlatList, StyleSheet } from 'react-native';
import SemestreCard from '../components/SemestreCard';
import { roadmapData } from '../data/roadmap';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
        <Text style={styles.header}>Roadmap</Text>
        <FlatList
            data={roadmapData}
            keyExtractor={(item) => item.semestre}
            renderItem={({ item }) => (
            <SemestreCard title={item.semestre} materias={item.materias} />
            )}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    header: { fontSize: 28, fontWeight: 'bold', color: '#003366', marginBottom: 16 },
});
