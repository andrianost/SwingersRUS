'use strict';
import React, { Component } from 'react';
import { AppRegistry, Dimensions, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/actions.js';
import { RNCamera } from 'react-native-camera';

function mapStateToProps(state){
    return {
      token: state.login.token,
      fo: state.lessons.fo,
      dtl: state.lessons.dtl,
      fo_flag: state.lessons.fo_flag,
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

class CameraScreen extends Component {
  constructor(props){
      super(props);
      this.state = {
        bearerToken: this.props.token,
        fo: this.props.fo,
        dtl: this.props.dtl,
        fo_flag: this.props.fo_flag,
        successModalVisible: false,
      }
  }

  _startRecord = async function() {
    if (this.camera) {
      const options = { maxFileSize: 9961472, quality: RNCamera.Constants.VideoQuality['480p'] }; //maxDuration: 10,
      const data = await this.camera.recordAsync(options)

      if (this.props.fo_flag == true){
        this.setState({fo: data.uri}, function() {
          this.props.setFoUriSuccess({fo: this.state.fo})
          this.setState({successModalVisible: true})

        })

      }
      else if (this.props.fo_flag == false){
        this.setState({dtl: data.uri}, function() {
          this.props.setDtlUriSuccess({dtl: this.state.dtl})
          this.setState({successModalVisible: true})
        })
      }
    }
  };

  _stopRecord() {
    this.camera.stopRecording();
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity
            onPressIn={this._startRecord.bind(this)}
            onPressOut={this._stopRecord.bind(this)}
            style = {styles.capture}
        >
        </TouchableOpacity>
        <Modal animationType="slide" transparent={true} visible={this.state.successModalVisible}>
          <View style={styles.successModal}>
            <View style={styles.modalButton}>
              <Text style={styles.modalText}>Your video has been successfully recorded.</Text>
              <View style={styles.modalBorder}>
              </View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('RedeemLessons')}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        </View>
      </View>
    );
  }
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: 'red',
    width: 60,
    height: 60,
    borderRadius: 60/2,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  },
  successModal: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  modalButton: {
   alignItems: 'center',
   backgroundColor: 'white',
   padding: 20,
 },
 modalText: {
   paddingBottom: 15,
   color: '#231f61',
   alignItems: 'center'
 },
 modalButtonText: {
   paddingTop: 15,
   color: '#231f61',
   alignItems: 'center'
 },
 modalBorder: {
   borderBottomColor: '#231f61',
   borderWidth: .5,
   width: 300,
 },
});

AppRegistry.registerComponent('CameraScreen', () => CameraScreen);

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);
