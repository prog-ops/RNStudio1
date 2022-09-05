import React from 'react';
import {View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

export default SearchTextInput = ({value, onChange}) => {
  return (
    <View style={styles.textViewContainer}>
      <View style={styles.textViewSubContainer}>
        <View style={styles.searchImage}>
          <Icon name="search" size={20} color="gray" />
        </View>
        <TextInput
          placeholder={'Search place'}
          style={styles.searchTextInput}
          onChangeText={text => onChange(text)}
          value={value}
        />
      </View>
    </View>
  );
};
