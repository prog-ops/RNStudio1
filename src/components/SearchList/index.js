import React from 'react'
import { FlatList, View, Text } from 'react-native'
import LocationItem from '../LocationItem';
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles'

export default SearchList = ({ locations }) => {

  renderNoPlacesFound = () => {
    return (
      <View style={styles.noPlaceFound}>
        <Icon name='globe' size={100} color='gainsboro' />
        <Text style={styles.text}>No places found</Text>
      </View>
    )
  }

  renderPlacesTable = () => {
    return (
      <View style={styles.tableView}>
        <FlatList
          data={locations}
          renderItem={({ item }) => <LocationItem title={item.description} />}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }

  return (
    <View style={styles.tableViewContainer}>
      {locations.length == 0 ? this.renderNoPlacesFound() : this.renderPlacesTable()}
    </View>
  )
}

