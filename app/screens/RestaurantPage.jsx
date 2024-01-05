import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Menu from './restaurant/Menu';
import Directions from './restaurant/Directions';
import New from './restaurant/New';

const renderScene = SceneMap({
  first: Menu,
  second: Directions,
  three: New,
});

const RestaurantPage = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Menu' },
    { key: 'second', title: 'Directions' },
    { key: 'three', title: 'New' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

export default RestaurantPage;