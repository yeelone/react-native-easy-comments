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
import { Reply } from './reply';
import Icon from 'react-native-vector-icons/FontAwesome';

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

  generateChildItem = ({item,index}) => {
    return (
      <Item
        key={index}
        data={item}
        replyNum={childCount}
        disableReply={false}
        onLike={this.onLike}
        onDown={this.onDown}
        onClick={this.onClick}
        onFollow={this.onFollow}
        enableFollow={this.props.enableFollow}
          />
    )
  }

   _keyExtractor = (item, index) => item.id.toString();

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
  
  onSend = ({parent,content}) => {
    try {
      this.props.onSend({parent,content});
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
          enableFollow={this.props.enableFollow}
            />
        </View>
    )
  }

  createEmptyView = () => {
    return (
     <Text style={{fontSize: 20, alignSelf: 'center',color:'#cccccc'}}>还没有评论哦！</Text>
    );
  }

  createInputComponent = (parent) => {
    var  { avatar }  = this.props; 
    avatar = avatar || "";
    return (
      <View style={{flex:1,flexDirection:'row'}}>
        <Image source={{uri: avatar,width: 30, height: 30}} style={{marginTop:10,borderRadius:50}}/>
        <Input style={{flex:1}} onSend={({content}) => this.onSend({parent,content})}/>
      </View>
    )
  }

  genModalBody = () => {
    const data  = this.props.data || {} ;
    let childData = null ;
    let parent = 0 ;  
    if (this.state.currentItem){
      childData = data[this.state.currentItem.id];
      parent = this.state.currentItem.id;
    }

    return (
      <Reply
        item={this.state.currentItem}
        replies={childData}
        inputElement={this.createInputComponent(parent)}
        onEndReached={this.props.onEndReached}
        onFollow={this.onFollow}
        onLike={this.onLike}
        onDown={this.onDown}
                />
    )
  }


  render() {
    const data  = this.props.data || {} ;
    return (
      <View style={{flex:1,backgroundColor:"#ffffff"}}>
        <FlatList
          data={data[0]}
          ListEmptyComponent={this.createEmptyView()}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderItem}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => {  
              this.onEndReached(0);
          }}
          style={{flex:1}}
        />
          <View style={{height:50}}>
            {this.createInputComponent(0)}
          </View>
          <ReplyModal
            ref={"modal1"} body={this.genModalBody()}/>
      </View>
    )
  }
}
