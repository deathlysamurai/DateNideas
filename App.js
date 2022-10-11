import { auth } from './database/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Component } from 'react';
import { View } from 'react-native';
import { container } from './static/styles';
import HomeScreen from './components/main/Home';
import StartupScreen from './components/main/Startup';

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
        <StartupScreen />
      );
    }

    return (
      <HomeScreen />
    );
  }
}

export default App
