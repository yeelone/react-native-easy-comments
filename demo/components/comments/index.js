import React from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
} from 'react-native';

import {Item} from './item';
import {Input} from './input';
import {ReplyModal} from './replyModal';

export class Comments extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: false,
      sliderValue: 0.3,
      currentItem:null,
      onEndReachedCalledDuringMomentum:true,
    }
  }

   _keyExtractor = (item, index) => item.id;

  setCurrentItem = (item) => {
    this.setState({
        currentItem: item
    });
  }

  onLike= ({item}) => {
    try{
      this.props.onLike({item});
    }catch(e){
    }
  }

  onDown = ({item}) => {
    try{
      this.props.onDown({item});
    }catch(e){
    }
  }

  onClick = ({item}) => {
    this.setCurrentItem(item);
    this.refs.modal1.open();
  }
  
  onSend = ({content}) => {
    try {
      this.props.onSend({content});
    }catch(e){
    }
  }

  onEndReached = (id) => {
    try{
      this.props.onEndReached(id);
    }catch(e){}
  }

  onReplyEndReached = (item) => {
    if ( item ){
      try{
        this.props.onEndReached(item.id);
      }catch(e){}
    }
  }

  onFollow = ({item}) => {
    try{
      this.props.onFollow({item});
    }catch(e){}
  }

  renderItem = ({item,index}) => {
    var childCount = 0 ;
    try {
      childCount = this.props.data[item.id].length;
    } catch(e){
      console.log("Item don't have  any children");
    }

    
    return (
      <View>
        <Item
          key={index}
          data={item}
          replyNum={childCount}
          disableReply={false}
          onLike={this.onLike}
          onDown={this.onDown}
          onClick={this.onClick}
          onFollow={this.onFollow}
            />
        </View>
    )
  }

  createEmptyView = () => {
    return (
     <Text style={{fontSize: 40, alignSelf: 'center'}}>还没有评论哦！</Text>
    );
  }

  createInputComponent = () => {
    var  { avatar }  = this.props; 
    avatar = avatar || "";
    return (
      <View style={{flex:1,flexDirection:'row'}}>
        <Image source={{uri: avatar,width: 30, height: 30  }} style={{margin:10,borderRadius:20}}/>
        <Input style={{flex:1}} onSend={this.onSend}/>
      </View>
    )
  }

  render() {
    const dataMap = this.props.data;
    var childData = null ;
    if (this.state.currentItem){
      childData = dataMap[this.state.currentItem.id];
    }
    return (
      <View>
        <FlatList
          data={dataMap[0]}
          ListHeaderComponent={this.createInputComponent()}
          ListEmptyComponent={this.createEmptyView()}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderItem}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => {  
              this.onEndReached(0);
          }}
        />
        <ReplyModal
          ref={"modal1"}
          item={this.state.currentItem}
          inputElement={this.createInputComponent()}
          replies={childData}
          onEndReached={this.onEndReached}
          onFollow={this.onFollow}
          onSend={this.onSend}
          onLike={this.onLike}
          onDown={this.onDown} />
      </View>
    )
  }
}
