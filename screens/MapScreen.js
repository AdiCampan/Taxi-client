import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TurboModuleRegistry,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import NewOrder from "../components/newOrder";

export default function Map() {
  const [newAddress, setNewAddress] = useState({
    latitude: 39.970478,
    longitude: -0.257338,
  });
  const [origin, setOrigin] = useState({
    latitude: 39.970478,
    longitude: -0.257338,
  });

  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission denied !");
      return;
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setOrigin(current);
  }
  console.log("newAddress", newAddress);
  console.log("origin", origin);

  useEffect(() => {
    getLocationPermission();
  }, []);

  const handleCustomAddress = (newAddress) => {
    console.log(newAddress);
  };

  return (
    <View>
      <NewOrder origin={origin} handleCustomAddress={handleCustomAddress} />
      <MapView
        showsMyLocationButton={true}
        showsUserLocation={true}
        followsUserLocation={true}
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
        provider="google"
      >
        {origin && (
          <Marker
            coordinate={newAddress}
            title="Taxi here !"
            // pinColor="black"
            draggable={true}
            onDragEnd={(e) => {
              setOrigin({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              });
            }}
          ></Marker>
        )}
      </MapView>
      <Text>{/* {JSON.stringify(address)} {JSON.stringify(origin)} */}</Text>

      <TouchableOpacity
        style={styles.button}
        title="My location"
        onPress={getLocationPermission}
      >
        <Text style={styles.textButton}>My Location</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: " 100%",
    height: "75%",
    marginTop: 5,
  },
  button: {
    bottom: "0%",
    backgroundColor: "purple",
    // padding: 10,
    // margin: 20,
    width: "50%",
    alignSelf: "center",
    borderRadius: 10,
  },
  textButton: {
    fontSize: 25,
    textAlign: "center",
    color: "white",
  },
});
