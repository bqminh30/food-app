import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { CartCountContext } from "../context/CartCountContext";
import { COLORS, SIZES } from "../constants/theme";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Counter from "../components/Counter";

const FoodPage = ({ route, navigation }) => {
  const item = route.params.item;
  const [isChecked, setIsChecked] = useState(false);
  const [additives, setAdditives] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [restaurant, setRestaurant] = useState(1);
  const [count, setCount] = useState(1);
  const [preference, setPreference] = useState("");

  let sendToOrderPage;
  // console.log(item);
  const id = item.restaurant;

  const handleAdditives = (newAdditive) => {
    setAdditives((prevAdditives) => {
        const exists = prevAdditives.some((additive) => additive.id === newAdditive.id)
        
        if(exists){
            return prevAdditives.filter(
                (additive) => additive.id !== newAdditive.id
            )
        }else {
            return [...prevAdditives, newAdditive]
        }
    })  
  }

  const handlePress = (item) => {
    const cartItem = {
        productId: item._id,
        additives: additives,
        quantity : count,
        totalPrice: (item.price + totalPrice) * count
    }

    addToCart(cartItem);
  }

sendToOrderPage = {
    orderItem: {
        foodId : item._id,
        additives: additives,
        quantity: count,
        price: (item.price + totalPrice) * count,
        instructions: preference
    },
    title : item.title,
    description: item.description,
    imageUrl : item.imageUrl[0],
    restaurant: id
}

  const addToCart = async(cartItem) => {}

  useEffect(()=> {
    calculatePrice();
  }, [additives])

  const calculatePrice = () => {
    const total = additives.reduce((sum, additive) => {
        return sum + parseFloat(additive.price)
    },0)
    setTotalPrice(total)
  }


  // const {cartCount, setCartCount} = useContext(CartCountContext)
  return (
    <View style={{ backgroundColor: COLORS.lightWhite, height: SIZES.height }}>
      <View>
        <Image
          source={{ uri: item?.imageUrl[0] }}
          style={{
            width: SIZES.width,
            height: SIZES.height / 4,
            borderBottomRightRadius: 30,
          }}
        />
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

        <TouchableOpacity
          onPress={() => {}}
          style={{
            position: "absolute",
            bottom: 25,
            right: 3,
          }}
        >
          <View style={styles.restBtn}>
            <Text style={{ color: COLORS.lightWhite, fontFamily: "bold" }}>
              Open the Store
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={[styles.title, { color: COLORS.primary }]}>
            ${(item.price + totalPrice) * count}{" "}
          </Text>
        </View>

        <Text style={styles.small}>{item.description}</Text>
        <FlatList
          data={item.foodTags}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item}
          style={{ marginTop: 5 }}
          horizontal
          scrollEnabled
          renderItem={({ item }) => (
            <View style={styles.tags}>
              <Text style={{ paddingHorizontal: 4, color: COLORS.lightWhite }}>
                {item}
              </Text>
            </View>
          )}
        />

        <Text style={[styles.title, { marginTop: 20, marginBottom: 10 }]}>
          Additives And Topping
        </Text>
        <FlatList
          data={item.additives}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          style={{ marginTop: 5 }}
          scrollEnabled
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <BouncyCheckbox
                size={20}
                unfillColor="#ffffff"
                fillColor={COLORS.primary}
                innerIconStyle={{ borderWidth: 1 }}
                textStyle={styles.small}
                text={item.title}
                onPress={()=> {
                    handleAdditives(item)
                }}
              />
              <Text style={{ paddingHorizontal: 4 }}>{item.price}</Text>
            </View>
          )}
        />

        <Text style={[styles.title, { marginTop: 20, marginBottom: 10 }]}>
          Preferences
        </Text>

        <View style={styles.input}>
          <TextInput
            placeholder="Add specific instructions"
            value={preference}
            onChangeText={(value) => setPreference(value)}
            autoCapitalize="none"
            autoCorrect={false}
            style={{ flex: 1 }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Text style={[styles.title, { marginBottom: 10 }]}>Quantity</Text>
          <Counter count={count} setCount={setCount} />
        </View>
      </View>

      <View style={{left: 10, top: 40}}>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <View style={styles.suspended}>
          <View style={styles.cart}>
            <View style={styles.cartRow}>
              <TouchableOpacity onPress={() => {}} style={styles.cartBtn}>
                <AntDesign
                  name="pluscircleo"
                  size={24}
                  color={COLORS.lightWhite}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('order-page', sendToOrderPage)} style={{
                backgroundColor: COLORS.primary,
                paddingHorizontal: 80,
                borderRadius: 30
              }}>
                <Text style={[styles.title, {color: COLORS.lightWhite, alignItems: 'center', marginTop:4 }]}>Order</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {}} style={styles.cartBtn}>
                <Text style={[styles.title, {color: COLORS.lightWhite, alignItems: 'center' }]}>{0}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      </View>
    </View>
  );
};

export default FoodPage;

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
  restBtn: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.lightWhite,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  container: {
    marginHorizontal: 12,
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: "medium",
    color: COLORS.black,
  },
  small: {
    fontSize: 13,
    fontFamily: "regular",
    color: COLORS.gray,
    textAlign: "justify",
  },
  tags: {
    right: 10,
    marginHorizontal: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  input: {
    borderColor: COLORS.primary1,
    borderWidth: 1,
    backgroundColor: COLORS.offwhite,
    flexDirection: "row",
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  suspended: {
    // position: "absolute",
    top: 0,
    zIndex: 999,
    bottom: 50,
    width: "100%",
    alignItems: "center",
  },
  cart: {
    width: SIZES.width - 24,
    height: 60,
    justifyContent: "center",
    backgroundColor: COLORS.primary1,
    borderRadius: 30
  },
  cartRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
  },
  cartBtn: {
    width: 40,
    height: 40,
    borderRadius: 99,
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },
});
