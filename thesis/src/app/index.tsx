import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList } from 'react-native';
import ListItem from '@/components/core/ListItem';

const features = [
  {
    index: 1,
    name: "Camera",
    path: "/camera"
  },
  {
    index: 2,
    name: "Health records",
    path: "/healthRecord"
  }
]

export default function index() {
  return (
    <View style={styles.container}>
    <FlatList
      data={features}
      contentContainerStyle={styles.content}
      columnWrapperStyle={styles.column}
      numColumns={2}
      renderItem={({ item }) => <ListItem feature={item} />}
    />

    <StatusBar style="auto" />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    gap: 10,
    padding: 10,
  },
  column: {
    gap: 10,
  },
});
