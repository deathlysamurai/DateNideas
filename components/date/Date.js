import { createDrawerNavigator } from '@react-navigation/drawer';
import ListScreen from './List';
import RandomScreen from './Random';
import SwipeScreen from './Swipe';

const Drawer = createDrawerNavigator();

export default function DateScreen(props) {

  return (
    <Drawer.Navigator initialRouteName="List">
      <Drawer.Screen name="List" component={ListScreen} options={{ headerTitle: "" }} />
      <Drawer.Screen name="Random" component={RandomScreen} options={{ headerTitle: "" }} />
      <Drawer.Screen name="Swipe" component={SwipeScreen} options={{ headerTitle: "" }} />
    </Drawer.Navigator>
  )
}