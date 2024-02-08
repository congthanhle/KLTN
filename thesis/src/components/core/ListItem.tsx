import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

type ListItem = {
  feature: {
    index: number,
    name: string,
    path: string,
  };
};

export default function ListItem({ feature }: ListItem) {
  return (
    <Link href={`${feature.path}`} asChild>
      <Pressable style={styles.box}>
        <Text style={styles.text}>{feature.name}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#F9EDE3',
    flex: 1,
    height: 80,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9b4521',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#9b4521',
    fontSize: 24,
  },
});
