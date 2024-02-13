import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Button({ title, onPress, icon, color }: {title: string, onPress: any, icon: string, color: string}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {icon && <Icon name={icon} size={24} color={color ? color : '#f1f1f1'}/>}
      {title && <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
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
