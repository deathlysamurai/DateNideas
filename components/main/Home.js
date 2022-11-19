import AccountScreen from '../user/Account';
import DateScreen from '../date/Date';
import SearchScreen from '../search/Search';
import { colors } from '../../static/colors';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { firebase } from '../../database/functions';

const Tab = createBottomTabNavigator();

export default function HomeScreen(props) {
  const [requestCount, setRequestCount] = useState(null);

  useEffect(() => {
    firebase.user.getRequests()
    .then((requests) => {
      if(requests != null) {
        setRequestCount(requests.length);
      }
    });
  }, []);

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
        <Tab.Screen name="Account" component={AccountScreen} options={{ tabBarBadge: requestCount, headerShown: false }} />
        <Tab.Screen name="Date" component={DateScreen} options={{ tabBarBadge: null, headerShown: false }} />
        <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}