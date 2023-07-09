import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ref, onValue, set } from "firebase/database";
import { db } from "../firebase";
import * as Crypto from "expo-crypto";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Geocoder from "react-native-geocoding";
import { useNavigation } from "@react-navigation/native";
import { GOOGLE_MAPS_API_KEY } from "@env";

const NewOrder = ({ origin, handleCustomAddress }) => {
  const navigation = useNavigation();
  const [state, setState] = useState(null);
  const [addressCoords, setAddressCoords] = useState({
    latitude: 39.970478,
    longitude: -0.257338,
  });
  const [infoAddress, setInfoAddress] = useState();
  const [addressComplete, setAddressComplete] = useState("");

  const timestamp = new Date();
  const formatTime = timestamp.getTime();

  useEffect(() => {
    setAddressCoords(origin);
    handleCustomAddress(addressCoords);
  }, [origin]);

  Geocoder.init(GOOGLE_MAPS_API_KEY);
  Geocoder.from({
    latitude: addressCoords.latitude,
    longitude: addressCoords.longitude,
  })
    .then((json) => {
      var addressComponent = json.results[0].formatted_address;
      setAddressComplete(addressComponent);
    })
    .catch((error) => console.warn(error));

  const addOrder = (order) => {
    return (dispatch) => {
      const ordersRef = ref(db, `orders/${order.id}/`);
      set(ordersRef, order)
        .then(navigation.navigate("MyOrder", { order: order }))
        .catch((err) => console.error(err));
      setAddressCoords(origin);
      setState("In asteptare");
    };
  };

  return (
    <View>
      <SafeAreaView>
        <TouchableOpacity
          onPress={addOrder({
            address: JSON.stringify(addressComplete),
            state: state,
            addressCoords: addressCoords,
            id: Crypto.randomUUID(),
            startDate: formatTime,
          })}
          style={styles.button}
        >
          <Text style={styles.textButton}>Taxi !</Text>
        </TouchableOpacity>
        <GooglePlacesAutocomplete
          placeholder="Cauta alta ADRESA "
          fetchDetails={true}
          GooglePlacesSearchQuery={{
            rankby: "distance",
          }}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            // console.log(data, details);
            setAddressCoords({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.09,
              longitudeDelta: 0.04,
            });
            // setInfoAddress({
            //   latitude: details.geometry.location.lat,
            //   longitude: details.geometry.location.lng,
            // });
          }}
          query={{
            key: { GOOGLE_MAPS_API_KEY },
            language: "en",
            location: `${addressCoords.latitude}, ${addressCoords.longitude}`,
          }}
          styles={{
            container: {
              flex: 0,
              position: "absolute",
              width: "100%",
              zIndex: 1,
            },
            listView: { backgroundColor: "white" },
          }}
        />
      </SafeAreaView>
    </View>
  );
};

export default NewOrder;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "grey",
    height: 30,
    fontSize: 20,
  },
  button: {
    backgroundColor: "lightslategrey",
    padding: 10,
    marginTop: 50,
    width: "50%",
    alignSelf: "center",
    borderRadius: 10,
  },
  textButton: {
    fontSize: 25,
    textAlign: "center",
    color: "white",
  },
  background: {
    width: "100%",
    height: "100%",
    backgroundColor: "blue",
  },
});
