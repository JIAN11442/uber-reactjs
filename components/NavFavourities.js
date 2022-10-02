import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectOrigin, setOrigin } from "../slices/navSlicer";
import { ScrollView } from "react-native";

const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    latitude: 23.0039003,
    longitude: 120.2189202,
    destination: "No. 83, Lane 190, Shengli Rd, North District, 704",
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Work",
    latitude: 22.9973002,
    longitude: 120.1823131,
    destination: "No. 333, Yonghua 3rd St, Anping District, 708",
  },
];

const NavFavourities = () => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View
          style={[
            tw`bg-gray-300`,
            {
              height: 0.5,
            },
          ]}
        />
      )}
      renderItem={({
        item: { icon, location, destination, latitude, longitude },
      }) => (
        <TouchableOpacity
          style={tw`flex-row items-center pl-3 pt-4 pb-4`}
          onPress={() => {
            dispatch(
              setOrigin({
                location: {
                  lat: latitude,
                  lng: longitude,
                },
                description: destination,
              })
            );
          }}
        >
          <Icon
            style={tw`bg-gray-200 mr-4 p-3 rounded-full`}
            name={icon}
            type="ionicon"
            color="white"
            size={25}
          />
          <View style={{width:250}}>
            <Text style={tw`text-lg font-semibold`}>{location}</Text>
            <Text style={tw`text-gray-500`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavourities;

const styles = StyleSheet.create({});
