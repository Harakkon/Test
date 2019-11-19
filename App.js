import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './Login'
import MapScreen from './Map'

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen},
  MapScreen: {
    screen: MapScreen},
  },
  {
    initialRouteName: 'LoginScreen',
    defaultNavigationOptions: {
      header: null
    },
  }
);

export default createAppContainer(AppNavigator);