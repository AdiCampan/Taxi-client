import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { db } from "../firebase";
import { ref, onValue, set, update, get } from "firebase/database";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";

const MyOrder = () => {
  const route = useRoute();
  const { order } = route.params;

  const [myOrder, setMyOrder] = useState();
  const [driver, setDriver] = useState();
  const [origin, setOrigin] = useState({
    latitude: 39.970478,
    longitude: -0.257338,
  });
  const [region, setRegion] = useState({
    latitude: 0.0,
    longitude: 0.0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0922,
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

  const navigation = useNavigation();

  const getOrder = () => {
    const ordersRef = ref(db, "orders");
    onValue(ordersRef, (snapshot) => {
      const tmpArray = [];
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        tmpArray.push({ id: childKey, ...childData });
      });
      const actualOrder = tmpArray?.find((comand) => comand.id === order.id);
      setMyOrder(actualOrder);
    });
  };

  const getDriver = () => {
    const driversRef = ref(db, "drivers");
    onValue(driversRef, (snapshot) => {
      const tmpArray = [];
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        tmpArray.push({ id: childKey, ...childData });
      });
      if (myOrder) {
        const actualDriver = tmpArray?.find(
          (driver) => driver.id === myOrder?.driverId
        );
        setDriver(actualDriver);
      }
    });
  };
  console.log("driver", driver);

  useEffect(() => {
    getOrder();
    getDriver();
    getLocationPermission();
  }, []);

  return (
    <View>
      {myOrder?.state === "In asteptare" ? (
        <View>
          <Text> Ai solicitat un TAXI la adresa: {myOrder?.address}</Text>
          <Text>...Asteapta sa gasim un Taxi disponibil</Text>
        </View>
      ) : (
        <Text>
          Solicitare acceptata de {driver?.name} {driver?.surname}.
        </Text>
      )}
      <MapView
        showsMyLocationButton={true}
        showsUserLocation={true}
        followsUserLocation={true}
        // region={region}
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
            coordinate={origin}
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
    </View>
  );
};

export default MyOrder;

const styles = StyleSheet.create({
  map: {
    width: " 100%",
    height: "75%",
    marginTop: 5,
  },
});
