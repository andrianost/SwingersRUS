import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet, Button, Image } from 'react-native';
import { DrawerNavigator } from 'react-navigation';


export default class SettingsScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Settings',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./img/ic_navigate_next_2x.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Settings screen!</Text>
        <Button
          title="Go back to the menu"
          onPress={() => this.props.navigation.navigate('DrawerOpen')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  container: {
    alignItems: 'center',
    paddingTop: 50
  }
});

AppRegistry.registerComponent('SwingEssentials', () => SettingsScreen);