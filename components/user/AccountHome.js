import UserDateListScreen from './DateList';
import ChatScreen from './Chat';
import InfoScreen from './Info';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useEffect, useState } from 'react';
import { firebase, getFirebaseUser } from '../../database/functions';

const Tab = createMaterialTopTabNavigator();

export default function AccountHomeScreen(props) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if(getFirebaseUser() !== null) {
      setLoggedIn(true);
    }
  });

  return (
    <Tab.Navigator initialRouteName='DateList'>
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="DateList" component={UserDateListScreen} options={{title: 'Dates'}} />
      {loggedIn ? <Tab.Screen name="Info" component={InfoScreen} /> : null}
    </Tab.Navigator>
  )
}