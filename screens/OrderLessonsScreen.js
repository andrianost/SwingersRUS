import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

import { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements'

function mapStateToProps(state){
    return {
        packages: state.packages,
        name: state.packages.name,
        description: state.packages.description,
        price: state.packages.price,
        shortcode: state.packages.shortcode,
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

class OrderLessonsScreen extends Component {
  constructor(props){
      super(props);
      this.state = {
          packages: this.props.packages,
          name: this.props.name,
          description: this.props.description,
          price: this.props.price,
          shortcode: this.props.shortcode,
      }
  }

  _orderLessons(data){
    console.log('data')
    console.log(data)
    this.props.orderLessons(data)
    this.props.navigation.navigate('OrderDetailsScreen')
  }

  _packagesHeader() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Available Packages</Text>
      </View>
    )
  }

  _renderItem({ item, index }) {
    return (
      <ListItem
        containerStyle = {styles.listItemContainer}
        titleStyle = {styles.listItemTitle}
        rightTitleStyle = {styles.listItemRightTitle}
        key={index}
        title={item.name}
        subtitle={item.description}
        subtitleStyle={styles.subtitle}
        rightTitle={item.price}
        onPress={ () => this._orderLessons({name: item.name, description: item.description, price: item.price, shortcode: item.shortcode})}
      />
    )
  }

  render() {
    return (
      <View style={styles.topContainer}>
        <FlatList
          data={this.props.packages.packages}
          keyExtractor={item => item.count}
          renderItem={this._renderItem.bind(this)}
          ListHeaderComponent={this._packagesHeader}
          scrollEnabled={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#231f61',
    opacity:.8
  },
  text: {
    paddingLeft: 18,
    fontSize: 18,
    color:"white",
    fontWeight:"bold"
  },
  listItemContainer: {
    height: 80,
    justifyContent: 'center',
    borderBottomColor: '#c1c1c1',
  },
  listItemTitle: {
    fontSize: 16,
    color: '#231f61',
    // opacity:.8
  },
  listItemRightTitle: {
    fontWeight: 'bold',
    color: '#231f61'
  },
  subtitle: {
    color: '#231f61',
    opacity:.8,
    fontSize: 13,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderLessonsScreen);
