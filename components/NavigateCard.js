import {StyleSheet,Text,View,SafeAreaView,RefreshControlBase, TouchableOpacity,} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import RideOptionsCard from "./RideOptionsCard";
import NavFavourities from "./NavFavourities";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch, useSelector } from "react-redux";
import {selectDestination,selectOrigin,setDestination,} from "../slices/navSlicer";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements/dist/icons/Icon";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-4 text-lg font-semibold`}>
        Good Morning, Jian
      </Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              //   navigation.navigate("RideOptionsCard")
              console.log(origin.location);
            }}
            styles={toInputBoxStyles}
            placeholder="Where to?"
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            fetchDetails={true}
            returnKeyType={"search"}
            minLength={2}
            enablePoweredByContainer={false}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
          />
        </View>
        <View style={tw`ml-3 h-3/4`}>
          <NavFavourities />
        </View>
      </View>

      <View style = {tw`flex flex-row justify-evenly pb-2 pt-2 border-t border-gray-100`}>
        <TouchableOpacity 
          onPress = {() => {
            navigation.navigate("RideOptionsCard")
            console.log('have onpress')
          }}
          style = {[tw`flex flex-row bg-black px-4 py-3 justify-center rounded-full`,{
            width:110,
          }]}
        >
          <Icon
            name = "car"
            type = "font-awesome"
            color = "white"
            size = {16}
          />
          <Text style = {tw`text-white pl-3`}>Rides</Text>
        </TouchableOpacity >

        <TouchableOpacity
          style = {[tw`flex flex-row bg-white px-4 py-3 justify-center rounded-full`,{
            width: 110,
          }]}
        >
          <Icon 
            name = "fast-food-outline"
            type = "ionicon"
            color = "black"
            size = {16}
          />
          <Text style = {tw`pl-3`}>Eats</Text>
        </TouchableOpacity>
        </View>

    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
