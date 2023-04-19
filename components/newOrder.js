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
// import { GOOGLE_API_KEY } from "";

const NewOrder = ({ origin, handleCustomAddress }) => {
  const [address, setAddress] = useState({
    latitude: 39.970478,
    longitude: -0.257338,
  });
  const [addressComplete, setAddressComplete] = useState("");

  useEffect(() => {
    setAddress(origin);
    handleCustomAddress(address);
  }, [origin]);

  Geocoder.init("AIzaSyD-1uUnvrA0WXJ_SkSsoCjX9-cJs_A8XRE");
  Geocoder.from({
    latitude: address.latitude,
    longitude: address.longitude,
  })
    .then((json) => {
      var addressComponent = json.results[0].formatted_address;
      setAddressComplete(addressComponent);
    })
    .catch((error) => console.warn(error));

  // console.log("searched address", addressComplete);

  // const getOrders = () => {
  //   const ordersRef = ref(db, "orders");
  //   onValue(ordersRef, (snapshot) => {
  //     const tmpArray = [];

  //     snapshot.forEach((childSnapshot) => {
  //       const childKey = childSnapshot.key;
  //       const childData = childSnapshot.val();

  //       tmpArray.push({ id: childKey, ...childData });
  //     });
  //     const orders = tmpArray;
  //     console.log(orders);
  //   });
  // };dej
  const addOrder = (order) => {
    return (dispatch) => {
      // dispatch(fetchLoadingOrdersActions.pending());

      const ordersRef = ref(db, `orders/${Crypto.randomUUID()}/`);
      set(ordersRef, order)
        // .then((data) => console.log("order added", data))
        .catch((err) => console.error(err));
      setAddress(origin);
    };
  };

  return (
    <View>
      <SafeAreaView>
        <TouchableOpacity
          onPress={addOrder({
            address: JSON.stringify(addressComplete),
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
            setAddress({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.09,
              longitudeDelta: 0.04,
            });
          }}
          query={{
            key: "AIzaSyD-1uUnvrA0WXJ_SkSsoCjX9-cJs_A8XRE",
            language: "en",
            location: `${address.latitude}, ${address.longitude}`,
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
    backgroundColor: "purple",
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
