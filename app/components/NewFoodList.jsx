import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import uidata from '../constants/uidata'
import StoreComponent from './StoreComponent'

const NewFoodList = () => {

    const renderItem = ({item}) => (
    <View>
        
    </View>
    )
  return (
    <View style={{marginLeft: 12, marginTop: 10}}>
      <FlatList 
      data={uidata.foods}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{marginTop:5, rowGap:10}}
      scrollEnabled
      renderItem={renderItem}
      />
    </View>
  )
}

export default NewFoodList

const styles = StyleSheet.create({})