import { View, TouchableOpacity, Text } from 'react-native';
import { container, button } from '../../static/styles';
import { firebase, getFirebaseUser } from '../../database/functions';
import { useEffect, useState } from 'react';
import StartupScreen from '../main/Startup';

export default function SettingsScreen(props) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if(getFirebaseUser() !== null) {
      setLoggedIn(true);
    }
  });

  return (
    <View style={container.container}>
        <View style={container.buttonContainer}>
            { loggedIn ? 
                <TouchableOpacity 
                  style={button.mainButton}
                  onPress={() => firebase.user.logoutUser()}>
                    <Text>Log Out</Text>
                </TouchableOpacity> :
                <View style={{minWidth: '100%'}}>
                  <StartupScreen />
                </View>
            }
        </View>
    </View>
  )
}