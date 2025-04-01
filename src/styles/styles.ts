import { StyleSheet } from 'react-native';
import { theme } from './colors';

export const styles = StyleSheet.create({
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
