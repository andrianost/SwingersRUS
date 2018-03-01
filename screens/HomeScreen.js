import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

import { Component } from 'react';
import { StyleSheet, Image, View, Text, Alert, FlatList } from 'react-native';
import { Button, FormInput, FormLabel, List, ListItem } from 'react-native-elements';

function mapStateToProps(state){
    return {
      token: state.login.token,
      pending: state.lessons.pending,
      closed: state.lessons.closed,
      request_id: state.lessons.request_id,
      request_date: state.lessons.request_date,
      request_url: state.lessons.request_url,
      request_notes: state.lessons.request_notes,
      response_notes: state.lessons.response_notes,
      response_video: state.lessons.response_video,
      credit_count: state.credits.count,
      credit_unlimited_count: state.credits.unlimited_count,
      credit_details: state.credits.details,
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

class HomeScreen extends Component {
  constructor(props){
      super(props);
      this.state = {
        bearerToken: this.props.token,
        pending: this.props.pending,
        closed: this.props.closed,
        request_id: this.props.request_id,
        request_date: this.props.request_date,
        request_url: this.props.request_url,
        request_notes: this.props.request_notes,
        response_notes: this.props.response_notes,
        viewed: this.props.viewed,
        response_video: this.props.response_video,
        credit_count: this.props.credit_count,
        credit_unlimited_count: this.props.credit_unlimited_count,
        credit_details: this.props.credit_details,
      }
  }

  _recentLessonsHeader() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Recent Lessons</Text>
      </View>
    )
  }

  _availableCreditsHeader() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Available Credits</Text>
      </View>
    )
  }

  _requestID(data){
    this.props.setRequestId(data)
    this.props.navigation.navigate('IndividualLessonsScreen')
  }

  _updateViewedStatus(data){
    this.props.updateViewedStatus(data)
  }

  _renderItem({ item, index }) {
    return (
      <ListItem
        key={index}
        title={item.request_date}
        titleStyle = {styles.listItemTitle}
        rightTitle={(item.viewed && item.viewed==='0')?'NEW!':null}
        rightTitleStyle = {styles.listItemRightTitle}
        onPress={ () => {this._requestID({request_id: item.request_id,
                                          request_date: item.request_date,
                                          request_url: item.request_url,
                                          request_notes: item.request_notes,
                                          response_notes: item.response_notes,
                                          response_video: item.response_video});
                        this._updateViewedStatus({request_id: item.request_id, bearerToken: this.props.token});}}
      />
    )
  }

  _renderCreditItem({ item, index }) {
    return (
      <ListItem
        key={index}
        title={item.key}
        titleStyle = {styles.listItemTitle}
        rightTitle={item.value?item.value:'-'}//{item.value}//
        rightTitleStyle = {styles.listItemCreditRightTitle}
        onPress={ () => this.props.navigation.navigate('RedeemLessons')}
        // onPress={ () => {this._requestID({request_id: item.request_id,
        //                                   request_date: item.request_date,
        //                                   request_url: item.request_url,
        //                                   request_notes: item.request_notes,
        //                                   response_notes: item.response_notes,
        //                                   response_video: item.response_video});
        //                 this._updateViewedStatus({request_id: item.request_id, bearerToken: this.props.token});}}
      />
    )
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.props.closed.slice(0,2)}
          keyExtractor={item => item.request_id}
          renderItem={this._renderItem.bind(this)}
          ListHeaderComponent={this._recentLessonsHeader}
        />
        <FlatList
          data = {[{key:'Individual Lessons', value: this.props.credit_count}, {key:'Unlimited Lessons', value: this.props.credit_unlimited_count}]}
          keyExtractor={item => item.key}
          renderItem={this._renderCreditItem.bind(this)}
          ListHeaderComponent={this._availableCreditsHeader}
        />
        <View style={styles.button}>
          <Button
            title="Order Lessons"
            buttonStyle={styles.CircleShapeView}
            onPress={() => this.props.navigation.navigate('OrderLessons')}
          />
        </View>
      </View>
      // <View style={styles.container}>
      //
      // </View>
    );
  }
}



const styles = StyleSheet.create({
  // container: {
  //   alignItems: 'center',
  //   paddingTop: 50
  // },
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#231f61',
    opacity:.8
  },
  text: {
    paddingLeft: 19,
    fontSize: 18,
    color:"white",
    fontWeight:"bold"
  },
  listItemTitle: {
    color:"#231f61",
    opacity:.8,
    fontSize: 16,
    fontWeight: 'bold',
    borderBottomColor: '#c1c1c1',
  },
  listItemRightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red'
  },
  listItemCreditRightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color:"#231f61",
    opacity:.8,
  },
  CircleShapeView: {
    // width: 150,
    // height: 150,
    // borderRadius: 150/2,
    backgroundColor: '#231f61',
    opacity:.8
  },
  button: {
    paddingBottom: 20,
    paddingTop: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
