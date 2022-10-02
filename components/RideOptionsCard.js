import {StyleSheet,Text,View,SafeAreaView,TouchableOpacity,FlatList,Image,} from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import NavigateCard from "./NavigateCard";

const data = [
  {
    id: "uber-X-123",
    title: "Uber X",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [Selected, setSelected] = useState(null);
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View style={tw`border-b border-gray-200`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`absolute top-3 left-5 p-2 bg-gray-100 rounded-full z-50`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center text-lg py-4 font-semibold`}>
          Select a Ride
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity 
          onPress = {() => {
            setSelected(item)
            console.log(Selected)
          }}
            style = {tw`flex-row justify-between items-center px-10 ${id === Selected?.id && 'bg-gray-200'}`}
          >
            <Image
            style={{
              width: 90,
              height: 90,
              resizeMode: "contain",
            }}
            source={{ uri: image }}
            />
            <View style = {tw`-ml-6`}>
              <Text style = {tw`text-lg font-semibold`}>{title}</Text>
              <Text>Travel Times...</Text>
            </View>
            <Text style = {tw`text-xl font-semibold`}>$99</Text>
          </TouchableOpacity>
        )}
      />

      <View>
        <TouchableOpacity 
          disabled = {!Selected}
          style = {tw`bg-black py-3 m-3 ${!Selected && 'bg-gray-300'}`}>
          <Text style = {tw`text-center text-white text-lg`}>Choose {Selected?.title}</Text>
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
