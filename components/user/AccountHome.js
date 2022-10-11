import UserDateListScreen from './DateList';
import ChatScreen from './Chat';
import InfoScreen from './Info';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Title } from 'react-native-paper';

const Tab = createMaterialTopTabNavigator();

export default function AccountHomeScreen(props) {
  return (
    <Tab.Navigator initialRouteName='DateList'>
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="DateList" component={UserDateListScreen} options={{title: 'Dates'}} />
      <Tab.Screen name="Info" component={InfoScreen} />
    </Tab.Navigator>
  )
}