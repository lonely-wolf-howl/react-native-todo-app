import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/styles';
import { theme } from '../styles/colors';

interface HeaderProps {
  working: boolean;
  onWorkPress: () => void;
  onTravelPress: () => void;
}

export const AppHeader: React.FunctionComponent<HeaderProps> = ({
  working,
  onWorkPress,
  onTravelPress,
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onWorkPress}>
        <Text
          style={{
            ...styles.buttonText,
            color: working ? theme.white : theme.grey,
          }}
        >
          Work
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onTravelPress}>
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
  );
};
