import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { styles } from '../styles/styles';
import { theme } from '../styles/colors';

interface TodoItemProps {
  text: string;
  onDelete: () => void;
}

export const TodoItem: React.FunctionComponent<TodoItemProps> = ({
  text,
  onDelete,
}) => {
  return (
    <View style={styles.toDo}>
      <Text style={styles.toDoText}>{text}</Text>
      <TouchableOpacity onPress={onDelete}>
        <Fontisto name="trash" size={15} color={theme.white} />
      </TouchableOpacity>
    </View>
  );
};
