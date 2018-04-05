import React from 'react';
import {
  Text,
  View,
  Button,
  Dimensions,
  StyleSheet,
  ScrollView,
  FlatList,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import Modal from 'react-native-modalbox';

export class ReplyModal extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: false,
      sliderValue: 0.3
    }
  }

  open = () => {
    this.refs.modal.open();
  }

  onClose() {
  }

  onOpen() {
  }

  onClosingState(state) {
  }

  render() {
    return (
      <Modal
        style={[styles.modal, styles.modal1]}
        ref={"modal"}
        swipeArea={30}
        coverScreen={true}
        onClosingState={this.onClosingState}>
          <View >
            <View style={[styles.header,]} >
              <Text style={[styles.headerText]}>回复</Text>
              <TouchableOpacity onPress={() => this.refs.modal.close()}><Text style={[styles.closeText,]} >关闭</Text></TouchableOpacity>
            </View>
            <View style={[styles.bodyContainer]}>
              {this.props.body}
              </View>
            </View>
      </Modal>
    )
  }
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({

  header :{
      width:width,
      height:40,
      flexDirection:'row',
      borderRadius: 0,
      borderColor: '#ddd',
      borderBottomWidth: 1,
  },

  headerText: {
    flex:1,
    color:'#666666',
    alignSelf:'flex-start',
    fontSize:16,
    padding:8,
  },

  closeText: {
    flex:1,
    color:'#666666',
    alignSelf:'flex-end',
    fontSize:16,
    padding:8,
  },

  closeBtn: {
    width:40,
    paddingLeft:10,
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ?  20 : 0,
  },

  modal1: {
      justifyContent: 'center',
      alignItems: 'center'
  },

  bodyContainer: {
    flex:1
  },

  text:{
    color:"#2c3e50",
 }
})
