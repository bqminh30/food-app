import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import pages from './page.style'
import uidata from "../constants/uidata";
import { useContext } from "react";
import { UserReversedGeoCode } from "../context/UserReversedGeoCode";
import { UserLocationContext } from "../context/UserLocationContext";
import HomeHeader from "../components/HomeHeader";
import CategoryList from "../components/CategoryList";

const Home = () => {
  const {address, setAddress } = useContext(UserReversedGeoCode)
  const {location, setLocation } = useContext(UserLocationContext)

  return (
    <SafeAreaView>
      <View style={pages.viewOne}>
        <View style={pages.viewTwo}>
          <HomeHeader/>

          <ScrollView style={{borderBottomEndRadius: 30,
          borderBottomStartRadius: 30}}
          showVerticalIndicator={false}>
            <CategoryList/>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  
});
