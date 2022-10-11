import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../auth/Login';
import RegisterScreen from '../auth/Register';

const Stack = createNativeStackNavigator();

export default function StartupScreen(props) {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
  }