import React, { useState } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import {
  Fontisto,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { styles } from '../styles/styles';
import { theme } from '../styles/colors';

interface TodoItemProps {
  text: string;
  completed: boolean;
  onDelete: () => void;
  onComplete: () => void;
  onUpdate: (newText: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  text,
  completed,
  onDelete,
  onComplete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleUpdate = () => {
    onUpdate(editText);
    setIsEditing(false);
  };

  return (
    <View style={styles.toDo}>
      {isEditing ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.editInput}
            value={editText}
            onChangeText={setEditText}
            autoFocus
          />
          <TouchableOpacity onPress={handleUpdate}>
            <MaterialIcons name="check" size={20} color={theme.white} />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={[styles.toDoText, completed && styles.completedText]}>
            {text}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onComplete} style={styles.actionButton}>
              <MaterialCommunityIcons
                name={completed ? 'checkbox-marked' : 'checkbox-blank-outline'}
                size={20}
                color={theme.white}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsEditing(true)}
              style={styles.actionButton}
            >
              <MaterialIcons name="edit" size={20} color={theme.white} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
              <Fontisto name="trash" size={15} color={theme.white} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};
