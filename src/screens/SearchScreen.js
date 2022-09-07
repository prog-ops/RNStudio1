import React, {Fragment, Component, useState, useRef} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {getLocations} from '../actions/DispatchActions';
import SearchTextInput from '../components/SearchTextInput';
import SearchList from '../components/SearchList';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {GOOGLE_API_KEY, height, INITIAL_POSITION, width} from '../utils';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GooglePlaceDetail} from 'react-native-google-places-autocomplete';
import {LatLng} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

type InputAutoCompleteProps = {
  label: string,
  placeholder: string,
  onPlaceSelected: (details: GooglePlaceDetail | null) => void,
};

function InputAutoComplete({
  label,
  placeholder,
  onPlaceSelected,
}: InputAutoCompleteProps) {
  return (
    <>
      <Text>{label}</Text>
      <GooglePlacesAutocomplete
        styles={{textInput: styles.input}}
        placeholder={placeholder || ''}
        fetchDetails
        onPress={(data, details = null) => {
          onPlaceSelected(details);
          // console.log(data, details);
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: 'id',
        }}
      />
    </>
  );
}

class SearchScreen extends Component {
  constructor() {
    super();
    this.state = {
      searchText: null,
      origin: LatLng | null,
      destination: LatLng | null,
      showDirections: false,
      distance: 0,
      duration: 0,
    };
  }

  componentDidMount() {
    this.props.fetchRequest('surabaya');
  }

  mapStyle = [];

  render() {
    // const [origin, setOrigin] = useState<LatLng | null>();
    // const [destination, setDestination] = useState<LatLng | null>();
    // const [showDirections, setShowDirections] = useState(false);
    // const [distance, setDistance] = useState(0);
    // const [durasi, setDurasi] = useState(0);
    const mapRef = useRef < MapView > null;

    const moveTo = async (posisi: LatLng) => {
      const camera = await mapRef.current?.getCamera();
      if (camera) {
        camera.center = posisi;
        mapRef.current?.animateCamera(camera, {duration: 1000});
      }
    };

    const edgePaddingValue = 90; // how zoomed when rute is traced
    const edgePadding = {
      t: edgePaddingValue,
      b: edgePaddingValue,
      l: edgePaddingValue,
      r: edgePaddingValue,
    };
    const traceRuteOnReady = (args: any) => {
      if (args) {
        this.state.origin(args.distance);
        this.state.duration(args.duration);
      }
    };
    const traceRute = () => {
      if (this.state.origin && this.state.destination) {
        // setShowDirections(true);
        mapRef.current?.fitToCoordinates(
          [this.state.origin, this.state.destination],
          {edgePadding},
        );
      }
    };

    const onPlaceSelected = (
      details: GooglePlaceDetail | null,
      flag: 'origin' | 'destination', //dari ke
    ) => {
      // const set = flag === 'origin' ? setOrigin : setDestination;
      const posisi = {
        latitude: details?.geometry.location.lat || 0,
        longitude: details?.geometry.location.lng || 0,
      };
      // set(posisi);
      moveTo(posisi);
    };

    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        {/*<SafeAreaView style={styles.container}>
          <SearchTextInput
            value={this.state.searchText}
            onChange={this.onChangeSearchText}
          />
          <SearchList locations={this.props.locations} />
        </SafeAreaView>*/}
        <View style={{flex: 1}}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.peta}
            initialRegion={INITIAL_POSITION}>
            {this.state.origin ? (
              <Marker coordinate={this.state.origin} />
            ) : null}
            {this.state.destination ? (
              <Marker coordinate={this.state.destination} />
            ) : null}
            {this.state.showDirections &&
              this.state.origin &&
              this.state.destination && (
                <MapViewDirections
                  origin={this.state.origin}
                  destination={this.state.destination}
                  apikey={GOOGLE_API_KEY}
                  strokeColor="#2255ff"
                  strokeWidth={8}
                  onReady={traceRuteOnReady}
                />
              )}
          </MapView>
          <View style={styles.searchContainer}>
            <InputAutoComplete
              label="DARI"
              onPlaceSelected={details => {
                onPlaceSelected(details, 'origin');
              }}
              placeholder="Titik awal"
            />
            <InputAutoComplete
              label="KE"
              onPlaceSelected={details => {
                onPlaceSelected(details, 'destination');
              }}
              placeholder="Titik tujuan"
            />
            {/*for example <InputAutoComplete label="anotherroute" onPlaceSelected={() => {}} />*/}
            <TouchableOpacity style={styles.button} onPress={traceRute}>
              <Text style={styles.buttonTextTrace}>Trace rute</Text>
            </TouchableOpacity>
            {/*if got distance and durasi then show view else then null*/}
            {this.state.distance && this.state.durasi ? (
              <View>
                <Text>Jarak: {this.state.distance.toFixed(2)}</Text>
                <Text>Durasi: {Math.ceil(this.state.durasi)} menit</Text>
              </View>
            ) : null}
          </View>
        </View>
      </Fragment>
      /*map disini bisa*/
    );
  }

  onChangeSearchText = text => {
    this.props.fetchRequest(text);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  peta: {
    ...StyleSheet.absoluteFillObject,
    // width: width,
    // height: height,
  },
  searchContainer: {
    margin: 20,
    shadowColor: 'dark-gray', // black
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 8,
    padding: 7,
    borderRadius: 20,
    position: 'absolute',
    width: '90%',
    backgroundColor: 'white',
  },
  input: {},
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 4,
  },
  buttonTextTrace: {
    textAlign: 'center',
    color: '#2255ff',
  },
});

const mapStateToProps = state => {
  return {
    locations: state.search.locations,
    isFetching: state.search.isFetching,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchRequest: (string = '') => dispatch(getLocations(string)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
