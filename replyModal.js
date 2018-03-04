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
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modalbox';
import { Reply } from './reply';

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

  _keyExtractor = (item, index) => item.id;

  open = () => {
    this.refs.modal.open();
  }

  onClose() {
    console.log('Modal just closed');
  }

  onOpen() {
    console.log('Modal just openned');
  }

  onClosingState(state) {
   console.log('the open/close of the swipeToClose just changed');
  }

  onLike= ({item}) => {
    this.props.onLike({item});
  }

  onDown = ({item}) => {
    this.props.onDown({item});
  }

  onFollow = ({item}) => {
    this.props.onFollow({item});
  }
  render() {
    const { item,replies,inputElement,onEndReached} = this.props;
    return (
      <Modal
        style={[styles.modal, styles.modal1]}
        ref={"modal"}
        swipeArea={30}
        coverScreen={true}
        onClosingState={this.onClosingState}>
          <View>
            <View style={[styles.header,]} >
              <Text style={[styles.headerText]}>回复</Text>
              <Icon.Button size={30} style={[styles.closeBtn]} name="ios-close" backgroundColor="#fff" color="#666666" onPress={() => this.refs.modal.close()} />
            </View>
            <Reply
              item={item}
              replies={replies}
              inputElement={inputElement}
              onEndReached={this.props.onEndReached}
              onFollow={this.onFollow}
              onLike={this.onLike}
              onDown={this.onDown}
              />
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
      shadowColor: '#000',
      borderRadius: 0,
      borderColor: '#ddd',
      borderBottomWidth: 1,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.8,
      elevation:1,
  },

  headerText: {
    flex:1,
    color:'#666666',
    alignSelf:'flex-start',
    fontSize:18,
    padding:8,
  },

  closeBtn: {
    width:40,
    paddingLeft:10,
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ?  35 : StatusBar.currentHeight,
  },

  modal1: {
      justifyContent: 'center',
      alignItems: 'center'
  }
})
