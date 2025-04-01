import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput, ScrollView, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppHeader } from './src/components/AppHeader';
import { TodoItem } from './src/components/TodoItem';
import { styles } from './src/styles/styles';
import { ToDoList } from './src/types/todo';

const ASYNC_STORAGE_KEY = '@toDoList';

export default function App() {
  const [working, setWorking] = React.useState(true);
  const [text, setText] = React.useState('');
  const [toDoList, setToDoList] = React.useState<ToDoList>({});

  React.useEffect(() => {
    loadToDoList();
  }, []);

  const work = () => setWorking(true);
  const travel = () => setWorking(false);

  const saveToDoList = async (payload: ToDoList) => {
    await AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(payload));
  };

  const loadToDoList = async () => {
    const stored: string | null = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
    if (stored) {
      setToDoList(JSON.parse(stored));
    }
  };

  const onChangeText = (payload: string) => setText(payload);

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
      <AppHeader working={working} onWorkPress={work} onTravelPress={travel} />
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
            <TodoItem
              key={key}
              text={toDoList[key].text}
              onDelete={() => deleteToDo(key)}
            />
          ) : null
        )}
      </ScrollView>
    </View>
  );
}
