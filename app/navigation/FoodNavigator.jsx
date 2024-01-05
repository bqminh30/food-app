import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRoute } from "@react-navigation/native";
import FoodPage from "../screens/FoodPage";
import OrderPage from "../screens/OrderPage";
import RestaurantPage from "../screens/RestaurantPage";

const Stack = createNativeStackNavigator();
const FoodNavigator = () => {
  const route = useRoute();
  const item = route.params;
  return (
    <Stack.Navigator initialRouteName="food-page">
      <Stack.Screen
        name="food-page"
        component={FoodPage}
        options={{ headerShown: false }}
        initialParams={{ item: item.item }}
      />

      <Stack.Screen
        name="order-page"
        component={OrderPage}
        options={{ headerShown: false, presentation: "modal" }}
        initialParams={{ item: item }}
      />
      {/* <Stack.Screen
        name="restaurant-page"
        component={RestaurantPage}
        options={{ headerShown: false, presentation: "modal" }}
        initialParams={{ item: item }}
      /> */}
    </Stack.Navigator>
  );
};

export default FoodNavigator;

const styles = StyleSheet.create({});
