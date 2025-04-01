import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { theme } from './colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fontisto } from '@expo/vector-icons';

interface ToDo {
  text: string;
  working: boolean;
}

const initialToDo: Record<string, ToDo> = {};

const ASYNC_STORAGE_KEY = '@toDoList';

export default function App() {
  const [working, setWorking] = React.useState(true);
  const [text, setText] = React.useState('');
  const [toDoList, setToDoList] = React.useState(initialToDo);

  React.useEffect(() => {
    loadToDoList();
  }, []);

  const work = () => setWorking(true);
  const travel = () => setWorking(false);

  const saveToDoList = async (paylaod: any) => {
    await AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(paylaod));
  };
  const loadToDoList = async () => {
    const stored: string | null = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
    if (stored) {
      setToDoList(JSON.parse(stored));
    }
  };

  const onChangeText = (payload: any) => setText(payload);
  const addToDo = async () => {
    if (text === '') return;

    const newToDoList = {
      ...toDoList,
      [Date.now()]: { text, working },
    };

    setToDoList(newToDoList);
    await saveToDoList(newToDoList);
    setText('');
  };
  const deleteToDo = (key: string) => {
    Alert.alert('Delete Task', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: 'Confirm',
        style: 'destructive',
        onPress: async () => {
          const newToDoList = { ...toDoList };
          delete newToDoList[key];

          setToDoList(newToDoList);
          await saveToDoList(newToDoList);
        },
      },
    ]);
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
        {Object.keys(toDoList).map((key: string) =>
          toDoList[key].working === working ? (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDoList[key].text}</Text>
              <TouchableOpacity onPress={() => deleteToDo(key)}>
                <Fontisto name="trash" size={15} color={theme.white} />
              </TouchableOpacity>
            </View>
          ) : null
        )}
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
    fontSize: 15,
  },
  toDo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: theme.grey,
    borderRadius: 15,
    opacity: 0.5,
  },
  toDoText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  },
});
