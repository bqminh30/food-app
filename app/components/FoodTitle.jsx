import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { RatingInput } from "react-native-stock-star-rating";
import { COLORS, SHADOWS } from "../constants/theme";
import NetworkImage from "./NetworkImage";
const FoodTitle = ({ item, onPress, showDetails }) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={showDetails}>
      <View
        style={{
          backgroundColor: COLORS.lightWhite,
          borderRadius: 12,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <NetworkImage
            source={item.imageUrl[0]}
            height={75}
            width={75}
            radius={12}
          />
          <View style={{
            position: "absolute",
            right:0,
            backgroundColor: COLORS.primary, borderRadius: 9,
            top: 5
          }}>
            <Text style={[styles.title, {color: COLORS.lightWhite,
            marginHorizontal: 5}]}>$ {item.price}</Text>
          </View>
          <View style={{ marginLeft: 10, marginTop: 5 }}>
            <Text style={styles.title}>{item.title}</Text>
            <RatingInput
              rating={Number(item.rating)}
              size={20}
              color={COLORS.primary}
            />

            <FlatList
              data={item.foodTags.slice(0,4)}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item}
              style={{ marginTop: 5 }}
              horizontal
              scrollEnabled
              renderItem={({ item }) => (
                <View style={styles.tags}>
                  <Text
                    style={{ paddingHorizontal: 4, color: COLORS.lightWhite }}
                  >
                    {item}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FoodTitle;

const styles = StyleSheet.create({
  wrapper: {
    left: 5,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    marginRight: 10,
    paddingRight: 7,
    ...SHADOWS.small
  },
  title: {
    fontSize: 16,
    fontFamily: "medium",
    color: COLORS.gray,
  },
  tags: {
    right: 6,
    marginHorizontal: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
});
