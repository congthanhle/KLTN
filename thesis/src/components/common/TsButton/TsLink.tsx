import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TsLink({ title, path, icon, color }: {title: string, path: any, icon: string, color: string}) {
  return (
    <Link href={path} style={styles.button}>
      <Icon name={icon} size={28} color={color ? color : '#f1f1f1'}/>
      <Text style={styles.text}>{title}</Text>
    </Link>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#f1f1f1',
    marginLeft: 10,
  },
});
