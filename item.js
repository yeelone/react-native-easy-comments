import React from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'react-moment';
import 'moment/locale/zh-cn';
import 'moment-timezone';

const defaultColor = '#b2bec3';
const likeColor = '#74b9ff';
const disLikeColor = '#ff7675';

export class Item extends React.Component {
  constructor() {
    super();
    this.state = {
      like:false,
      disLike:false,
      followed:false,
      likeCount:0,
      disLikeCount:0,
      likeColor: defaultColor,
      disLikeColor: defaultColor,
      replyColor:defaultColor,
    }
  }

  _handleLike = () => {
    const like = !this.state.like;
    var color = defaultColor;
    var count = 0 ;
    if (like) {
      color = likeColor;
      count = 1 ;
    }

    this.setState({
      like: like,
      likeColor : color,
      disLikeColor : defaultColor,
      likeCount : count,
      disLikeCount:0,
    });
    this.props.onLike({item:this.props.data});
  }

  _handleDown = () => {
    const disLike = !this.state.disLike;
    var color = defaultColor;
    var count = 0 ;
    if (disLike) {
      color = disLikeColor;
      count = 1 ;
    }
    this.setState({
      disLike: disLike,
      disLikeColor : color,
      likeColor : defaultColor,
      disLikeCount : count,
      likeCount:0,
    });
    this.props.onLike({item:this.props.data});
  }

  _handleFollow= () => {
    try{
      this.props.onFollow({item:this.props.data});
      this.setState({followed:true});
    }catch(e){
      this.setState({followed:false});
      alert("网络发生错误，请再试一次")
    }
  }

  _handlePress = () => {
    try {
      this.props.onPress();
      this.openReplyModal();
    }catch(e){

    }
  }

  openReplyModal = () => {
    this.props.onClick({item:this.props.data});
  }

  render() {
    if (this.props.data === null ) {
      return <View></View>;
    }

    const { username,avatar,content,time,like,down,disableReply } = this.props.data;
    var { avatarSize,style,replyNum } = this.props; 
    style = style || {};  
    const defaultAvatarSize = { width: 40, height: 40 } 
    var iconSize = avatarSize || defaultAvatarSize;
    return (
      <View style={[styles.container,style]} >
        <View style={{width:60}}>
          <Image source={{uri: avatar, ...iconSize}} style={[styles.avatar]}/>
        </View>
        <View style={{flex:1}}>
              <TouchableOpacity onPress={this._handlePress}><Text style={[styles.text,]} >{content}</Text></TouchableOpacity>
          <View style={{flex: 1, flexDirection: 'row',marginLeft:10,marginTop:5}}>
            <Text style={{color:"#636e72",fontWeight: 'bold',fontSize:12}}>{username} · </Text>
            <Moment locale="zh-cn" element={Text} fromNow ago style={{color:defaultColor,fontWeight: 'bold',paddingTop:2,fontSize:11}}>{time}</Moment>
          </View>
          <View style={{flex: 1, flexDirection: 'row',}}>
            <View style={{flex:1,flexDirection: 'row',alignSelf: 'flex-end',justifyContent: 'flex-start'}}>
              
              <Icon.Button name="thumbs-o-up" size={14} backgroundColor="transparent" color={this.state.likeColor} onPress={this._handleLike}>
                <Text style={{color:defaultColor}} >{like+this.state.likeCount}</Text>
              </Icon.Button>
              
              <Icon.Button name="thumbs-o-down" size={14} backgroundColor="transparent" color={this.state.disLikeColor} onPress={this._handleDown}>
               <Text style={{color:defaultColor}} >{down+this.state.disLikeCount}</Text>
              </Icon.Button>

              {this.props.disableReply ? null :
                <View>
                  <Icon.Button name="comments-o" size={14} backgroundColor="transparent" color={this.state.replyColor} onPress={this.openReplyModal}>
                    <Text style={{color:defaultColor}}>
                      {replyNum ? replyNum : null }
                        回复</Text>
                  </Icon.Button>
                </View>
              }
            </View>
          </View>
          
        </View>
        <View>
        {this.props.enableFollow ?
          <TouchableOpacity onPress={this._handleFollow}>
            <View>
              {this.state.followed ?
              <Text style={{color:'#ff7675',margin:2}}>已关注</Text>
              :
              <Text style={{color:'#b2bec3',margin:2}}>关注</Text>
              }
              
            </View>
          </TouchableOpacity>
          :
          null
        }
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'row',
    backgroundColor:'#fff',
    padding:10,
  },

  avatar:{
    margin:10,
    borderRadius:20,
  },

  content:{
    paddingBottom:5,
    padding:5,
    backgroundColor:'#dfe6e9',
    borderRadius:10,
  },

  text:{
     color:"#2c3e50",
  }

})
