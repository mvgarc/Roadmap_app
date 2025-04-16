import {View, Text, TextInput, StyleSheet} from 'react-native';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Roadmap</Text>
        <TextInput style={styles.input} placeholder="Search..." />
        </View>
    );
}