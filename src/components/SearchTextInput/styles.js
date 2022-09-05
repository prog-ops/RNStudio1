import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  textViewContainer: {
    flexDirection: 'row',
    flex: 3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  textViewSubContainer: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 14,
    width: '90%',
  },
  searchImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchTextInput: {
    height: 40,
    flex: 8,
  },
});
