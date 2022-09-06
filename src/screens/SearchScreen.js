import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native'
import { getLocations } from '../actions/DispatchActions'
import SearchTextInput from '../components/SearchTextInput'
import SearchList from '../components/SearchList'

class SearchScreen extends Component {

  constructor() {
    super()
    this.state = {
      searchText: null,
    }
  }

  componentDidMount() {
    this.props.fetchRequest('paris')
  }

  render() {
    return (
      <Fragment>
        <StatusBar barStyle='dark-content' />
        <SafeAreaView style={styles.container}>
          <SearchTextInput value={this.state.searchText} onChange={this.onChangeSearchText} />
          <SearchList locations={this.props.locations} />
        </SafeAreaView>
      </Fragment>
    )
  }

  onChangeSearchText = (text) => {
    this.props.fetchRequest(text)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
  },
})

const mapStateToProps = (state) => {
  return {
    locations: state.search.locations,
    isFetching: state.search.isFetching
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchRequest: (string = '') => dispatch(getLocations(string)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)