import AccountHomeScreen from "./AccountHome";
import SettingsScreen from "./Settings";
import AddDateScreen from "../date/AddDate";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { button } from '../../static/styles';
import { Ionicons } from '@expo/vector-icons';
import { firebase } from '../../database/functions';
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

export default function AccountScreen(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.user.getCurrentUser()
    .then((user) => {
      setUser(user);
    });
  }, []);

  if(user) {
    return (
      <Stack.Navigator initialRouteName='AccountHome'>
        <Stack.Screen 
          name="AccountHome" 
          component={AccountHomeScreen} 
          options={{ 
            title: user.name,
            headerRight: () => <Ionicons style={ button.headerRightButton } name="settings" size={24} color="black" onPress={() => props.navigation.navigate("Settings")} /> }} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="AddDate" component={AddDateScreen} />
      </Stack.Navigator>
    )
  }
}