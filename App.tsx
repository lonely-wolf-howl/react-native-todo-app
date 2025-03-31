import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { theme } from './colors';

interface ToDo {
  text: string;
  work: boolean;
}

const initialToDo: Record<string, ToDo> = {};

export default function App() {
  const [working, setWorking] = React.useState(true);
  const [text, setText] = React.useState('');
  const [toDoList, setToDoList] = React.useState(initialToDo);

  const work = () => setWorking(true);
  const travel = () => setWorking(false);

  const onChangeText = (payload: any) => setText(payload);
  const addToDo = () => {
    if (text === '') return;

    const newToDos = {
      ...toDoList,
      [Date.now()]: { text, work: working },
    };

    setToDoList(newToDos);
    setText('');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{
              ...styles.buttonText,
              color: working ? theme.white : theme.grey,
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.buttonText,
              color: !working ? theme.white : theme.grey,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        onSubmitEditing={addToDo}
        onChangeText={onChangeText}
        value={text}
        keyboardType={'default'}
        placeholder={
          working ? 'What do you have to do?' : 'Where do you want to go?'
        }
        style={styles.input}
      />
      <ScrollView>
        {Object.keys(toDoList).map((key: string) => (
          <View style={styles.toDo} key={key}>
            <Text style={styles.toDoText}>{toDoList[key].text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 100,
  },
  buttonText: {
    fontSize: 35,
    fontWeight: '600',
  },
  input: {
    marginTop: 25,
    marginBottom: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    fontSize: 20,
  },
  toDo: {
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: theme.grey,
    borderRadius: 15,
  },
  toDoText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  },
});
