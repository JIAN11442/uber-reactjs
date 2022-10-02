import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from "react-native";
// import SelfSafeAreaView from './SafeAreaView';
import tw from "tailwind-react-native-classnames";
import React from "react";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { setOrigin, setDestination, selectOrigin } from "../slices/navSlicer";
import NavFavourities from "../components/NavFavourities";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);

  return (
    <SafeAreaView style={tw`pt-6 bg-white h-full`}>
      <View style={tw`pl-5`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
        />

        <GooglePlacesAutocomplete
          placeholder="Where From?"
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
            console.log(details.geometry.location)
          }}
          // 加這個參數可以得到更多的地理資訊
          fetchDetails={true}
          returnKeyType={"search"}
          minLength={2}
          enablePoweredByContainer={false}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          // 目前要用哪個API
          nearbyPlacesAPI="GooglePlacesSearch"
          // 不需要每時每刻都搜索，只有當你停下輸入的時間超過400ms時，才會搜索
          debounce={400}
        />
        <NavOptions />
          <NavFavourities />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
