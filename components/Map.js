import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import tw from "tailwind-react-native-classnames";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import { selectDestination, selectOrigin } from "../slices/navSlicer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!origin || !destination) return;
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  // const zoomToMarkers = () => {
  //   const zoomTimer = setInterval(() => {
  //     mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
  //       edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
  //     });
  //     clearInterval(zoomTimer);
  //   }, 512);
  // };

  // useEffect(() => {
  //   zoomToMarkers();
  // }, [origin, destination]);

  return (
    <SafeAreaProvider style={tw`pt-8`}>
      <MapView
        ref={mapRef}
        style={tw`flex-1`}
        mapType="mutedStandard"
        initialRegion={{
          // 只要我們有點擊，就會dispatch一個action替代倉庫裡的『nav』中的initialState中的origin值
          // 接著我們就可以通過 useSelector 抓到 倉庫裡的 origin值，也就是裡面的坐標值
          latitude: origin.location.lat,
          longitude: origin.location.lng,
          // 越小zoom in 的程度就越近
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        // onMapReady={() => {
        //   if (!origin || !destination) return;
        //   var i = setInterval(() => {
        //     ref.fitToSuppliedMarkers(["origin", "destination"], {
        //       edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        //     });
        //     clearInterval(i);
        //   }, 512);
        // }}
        zoomEnabled={true}
      >
        {origin && destination && (
          <MapViewDirections
            origin={origin.description}
            destination={destination.description}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
          />
        )}

        {origin?.location && (
          <Marker
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
            title="Origin"
            description={origin.description}
            identifier="origin"
          />
        )}

        {destination?.location && (
          <Marker
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            }}
            title="Destination"
            description={destination.description}
            identifier="destination"
          />
        )}
      </MapView>
    </SafeAreaProvider>
  );
};

export default Map;

const styles = StyleSheet.create({});
