import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import RestaurantPage from "../RestaurantPage";
import { useRoute } from "@react-navigation/native";
import NetworkImage from "../../components/NetworkImage";
import { SIZES, COLORS } from "../../constants/theme";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { RatingInput } from "react-native-stock-star-rating";
import GoogleApiServices from '../../hook/GoogleApiServices'
import {UserLocationContext} from '../../context/UserLocationContext'

const Restaurant = ({ navigation }) => {
  const route = useRoute();
  const [distanceTime, setDistanceTime] = useState({})
  const {location, setLocation} = useContext(UserLocationContext)
  const item = route.params;

  console.log('item.coords.latitude, item.coords.longitude', item.coords.latitude, item.coords.longitude,
  location.coords.latitude, location.coords.longitude)

  useEffect(() => {
    GoogleApiServices.calculateDistanceAndTime(
      item.coords.latitude, item.coords.longitude,
      location.coords.latitude, location.coords.longitude
    ).then((result) => {
      console.log(result)
      if(result){
        setDistanceTime(result)
      }
    }).catch((err)=> console.log('err', err))
  },[])

  const totalTime = GoogleApiServices.extractNumbers(distanceTime.duration) + GoogleApiServices.extractNumbers(item.duration);
  console.log(totalTime)
  return (
    <View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={styles.shareBtn}>
          <MaterialCommunityIcons
            name="share-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>

        <NetworkImage
          source={item.imageUrl}
          height={SIZES.height / 3.4}
          width={SIZES.width}
          radius={20}
        />

        <View style={styles.rating}>
          <View style={styles.innaRating}>
            <RatingInput rating={Number(item.rating)} size={22} />

            <TouchableOpacity style={styles.ratingBtn} onPress={()=> navigation.navigate('rating')}>
              <Text style={styles.btnText}>Rate this Store</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{
        marginTop: 8,
        marginHorizontal: 8,
        marginBottom: 10
      }}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
        }}>
            <Text style={[styles.small, {color: COLORS.gray}]}>Distance</Text>
            <Text style={[styles.small, {fontFamily: 'regular'}]}>{distanceTime.distance}</Text> 
        </View>

        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
        }}>
            <Text style={[styles.small, {color: COLORS.gray}]}>Prep And Delivery Time</Text>
            <Text style={[styles.small, {fontFamily: 'regular'}]}>{totalTime} min</Text> 
        </View>

        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
        }}>
            <Text style={[styles.small, {color: COLORS.gray}]}>Const</Text>
            <Text style={[styles.small, {fontFamily: 'regular'}]}>{distanceTime.finalPrice}</Text> 
        </View>
      </View>
      <View style={{ height: SIZES.height/1.5 }}>
        <RestaurantPage />
        </View>
    </View>
  );
};

export default Restaurant;

const styles = StyleSheet.create({
  backBtn: {
    marginLeft: 12,
    alignItems: "center",
    zIndex: 999,
    position: "absolute",
    top: SIZES.xxLarge,
  },
  shareBtn: {
    marginRight: 12,
    alignItems: "center",
    right: 0,
    zIndex: 999,
    position: "absolute",
    top: SIZES.xxLarge + 3,
  },
  title: {
    fontSize: 22,
    fontFamily: "medium",
    color: COLORS.black,
  },
  small: {
    fontSize: 13,
    fontFamily: "medium",
    color: COLORS.black,
  },
  btnText: {
    fontSize: 16,
    fontFamily: "medium",
    color: COLORS.lightWhite,
  },
  restBtn: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.lightWhite,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  rating: {
    height: 50,
    justifyContent: "center",
    width: "100%",
    position: "absolute",
    backgroundColor: "#00fff53c",
    zIndex: 999,
    bottom: 0,
    borderRadius: 18,
    alignContent: "center",
  },
  innaRating: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
  },
  ratingBtn: {
    borderColor: COLORS.lightWhite,
    borderWidth: 1,
    borderRadius: 12,
    padding: 6,
  },
});
