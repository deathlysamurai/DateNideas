import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import LoginScreen from './components/auth/Login';
import RegisterScreen from './components/auth/Register';
import AccountScreen from './components/user/Account';
import DateScreen from './components/date/Date';
import SearchScreen from './components/search/Search';
import { Component } from 'react';
import { View } from 'react-native';
import { container } from './static/styles';
import { colors } from './static/colors';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export class App extends Component {
  constructor(props) {
    super()
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    onAuthStateChanged(auth, user => {
      if (user) {
        this.setState({ loggedIn: true, loaded: true })
      } else {
        this.setState({ loggedIn: false, loaded: true })
      }
    });
  }

  render() {
    if (!this.state.loaded) {
      return (
        <View style={container.splash}>
        </View>
      )
    }

    if (!this.state.loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Login" component={LoginScreen} nagvigation={this.props.navigation} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} nagvigation={this.props.navigation} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Account"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Account') {
                iconName = 'person';
              } else if (route.name === 'Date') {
                iconName = 'heart';
              } else if (route.name === 'Search') {
                iconName = 'search'
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarShowLabel: false,
            tabBarBadgeStyle: { backgroundColor: colors.accentPink },
            tabBarActiveTintColor: colors.accentPink,
            tabBarInactiveTintColor: colors.gray,
          })}
        >
          <Tab.Screen name="Account" component={AccountScreen} options={{ tabBarBadge: 1 }} />
          <Tab.Screen name="Date" component={DateScreen} options={{ tabBarBadge: null }} />
          <Tab.Screen name="Search" component={SearchScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default App
