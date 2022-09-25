import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Component } from 'react';
import { View } from 'react-native';
import { container } from './static/styles';

const Stack = createNativeStackNavigator();

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
            <Stack.Screen name="Login" component={Login} nagvigation={this.props.navigation} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} nagvigation={this.props.navigation} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <View style={{flex: 1, backgroundColor: 'yellow'}}>
      </View>
    );
  }
}

export default App
