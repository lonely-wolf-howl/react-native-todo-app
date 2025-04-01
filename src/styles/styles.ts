import { StyleSheet } from 'react-native';
import { theme } from '../styles/colors';

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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: theme.grey,
    borderRadius: 15,
    opacity: 0.5,
  },
  toDoText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.75,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionButton: {
    padding: 5,
  },
  editContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  editInput: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5,
    fontSize: 15,
    color: 'white',
  },
});
