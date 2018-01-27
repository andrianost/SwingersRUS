import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

import { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, FormInput, FormValidationMessage } from 'react-native-elements';

function mapStateToProps(state){
    return {
      name: state.packages.name,
      description: state.packages.description,
      price: state.packages.price,
      discount: state.packages.discount,
      type: state.packages.type,
      value: state.packages.value,
      token: state.login.token,
      shortcode: state.packages.shortcode,
      response: state.packages.response.status,
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

class OrderDetailsScreen extends Component {
  constructor(props){
      super(props);
      this.state = {
        name: this.props.name,
        description: this.props.description,
        price: this.props.price,
        discount: this.props.discount,
        type: this.props.type,
        value: this.props.value,
        bearerToken: this.props.token,
        shortcode: this.props.shortcode,
        response: this.props.response,
        coupon: false,
        savings: '',
        orderComplete: false,
      }
  }

  _onDiscount(){
      this.props.requestDiscount({discount: this.state.discount})
      .then(() => {
        if (this.props.type == 'percent') {
            this.setState({savings: ((parseFloat(this.props.value).toFixed(2)/100) * (parseFloat(this.props.price).toFixed(2)))});
            this.props.updatePrice({price: (parseFloat(this.props.price).toFixed(2) - ((parseFloat(this.props.value).toFixed(2)/100) * (parseFloat(this.props.price).toFixed(2))))});
            this.setState({coupon: true});
            // console.log(typeof this.props.price)
        } else if (this.props.type == 'amount') {
            this.setState({savings: parseFloat(this.props.value).toFixed(2)});
            this.props.updatePrice({price: (parseFloat(this.props.price).toFixed(2) - parseFloat(this.props.value).toFixed(2))});
            this.setState({coupon: true});
        } else {
            this.props.discountSuccess({type: 'invalid'}); // create proper action and reducer..noob
        }
      })
  }

  _submitOrder(){
    this.props.submitOrder({bearerToken: this.state.bearerToken, shortcode: this.state.shortcode})
    .then(() => {
      if (this.props.response == 200) {
        this.setState({orderComplete: true});
      }
    })
  }

  render() {
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Discount Code</Text>
        </View>
        <FormInput
            value={this.state.discount}
            placeholder="Please enter your discount code"
            onChangeText={(newText) => this.setState({discount: newText})}
        />
        {this.props.type == 'invalid' && <FormValidationMessage>Invalid discount code</FormValidationMessage>}
        <View style={styles.button}>
          <Button
              raised
              title="Apply Code"
              disabled={!this.state.discount || this.state.coupon == true}
              onPress={this._onDiscount.bind(this)}
          />
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Order Details:  {this.props.name}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.containerText}>Sub-total:                                                        ${parseFloat(this.state.price).toFixed(2)}</Text>
        </View>
        {this.state.coupon == true && <View style={styles.container}><Text style={styles.savingsText}>Savings: -${parseFloat(this.state.savings).toFixed(2)}</Text></View>}
        <View style={styles.container}>
          <Text style={styles.containerText}>Tax:                                                                     $0.00</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.containerText}>Total:                                                                ${parseFloat(this.props.price).toFixed(2)}</Text>
        </View>
        <View style={styles.button}>
          <Button
              raised
              title="Submit Order"
              disabled={this.state.orderComplete == true}
              onPress={this._submitOrder.bind(this)}
          />
          {this.state.orderComplete == true && <FormValidationMessage>Your order has been completed!</FormValidationMessage>}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#231f61',
  },
  containerText: {
    fontWeight: 'bold',
  },
  headerText: {
    fontWeight: 'bold',
    color: 'white',
  },
  savingsText: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  button: {
    paddingBottom: 20,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsScreen);
