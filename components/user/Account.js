import AccountHomeScreen from "./AccountHome";
import SettingsScreen from "./Settings";
import AddDateScreen from "../date/AddDate";
import EditDateScreen from "../date/EditDate";
import PartnerScreen from "./Partner";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { button, text } from '../../static/styles';
import { Ionicons } from '@expo/vector-icons';
import { firebase } from '../../database/functions';
import { useEffect, useState, createContext } from 'react';
import { Text } from 'react-native';

export const AccountContext = createContext({ deleteClicked: false, setDeleteClicked: () => {} });
const Stack = createNativeStackNavigator();

export default function AccountScreen(props) {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   firebase.user.getCurrentUser()
  //   .then((user) => {
  //     setUser(user);
  //   });
  // }, []);

  // if(user) {

    const [deleteClicked, setDeleteClicked] = useState(false);

    return (
      <AccountContext.Provider value={{deleteClicked, setDeleteClicked}}>
        <Stack.Navigator initialRouteName='AccountHome'>
          <Stack.Screen 
            name="AccountHome" 
            component={AccountHomeScreen} 
            options={{ 
              // title: user.name,
              title: 'Account',
              headerRight: () => <Ionicons style={ button.headerRightButton } name="settings" size={24} color="black" onPress={() => props.navigation.navigate("Settings")} /> }} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="AddDate" component={AddDateScreen} options={{title: 'Add Date' }} />
          <Stack.Screen name="EditDate" component={EditDateScreen} 
            options={{
              title: 'Edit Date',
              headerRight: () => <Text onPress={() => setDeleteClicked(true)} style={text.delete}>Delete</Text> }} />
          <Stack.Screen name="Partner" component={PartnerScreen} options={{title: "View Partners"}} />
        </Stack.Navigator>
      </AccountContext.Provider>
    )
  // }
}