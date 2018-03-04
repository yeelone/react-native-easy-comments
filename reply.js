import React from 'react';
import {
  Text,
  View,
  FlatList,
  Button,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {Item} from './item';
import dataMap from '../../mock/data';

export class Reply extends React.Component {
   _keyExtractor = (item, index) => item.id;

  onClick = () => {
  }

  onLike= ({item}) => {
    this.props.onLike({item});
  }

  onDown = ({item}) => {
    this.props.onDown({item});
  }

  renderItem = ({item,index}) => {
    return (
      <Item
        key={index}
        data={item}
        disableReply={true}
        disableFollow={true}
        onLike={this.onLike}
        onDown={this.onDown}
        onClick={this.onClick}
        
        avatarSize={{ width: 30, height: 30 }}/>
    )
  }

  createEmptyView = () => {
    return (
     <Text style={{fontSize: 40, alignSelf: 'center'}}>还没有评论哦！</Text>
    );
  }

  createHeaderView = () => {
    const {item,replies,inputElement,onEndReached} = this.props;
    var input = inputElement || <Text>nothing to input </Text>

    return (
      <View>
        <View style={[styles.header]}>
          <Item
            data={item}
            disableReply={true}
            onLike={this.onLike}
            onDown={this.onDown}
            onFollow={({item}) => this.props.onFollow({item})}
            style={{backgroundColor:'#f5f5f5'}}
            />
        </View>
        <View>
          {input}
        </View>
      </View>
    );
  }

  render() {
    const {item,replies,inputElement,onEndReached} = this.props;
    return (
      <View style={[styles.wrapper]}>

        <FlatList
          data={replies}
          keyExtractor={this._keyExtractor}
          ListHeaderComponent={this.createHeaderView()}
          ListEmptyComponent={this.createEmptyView()}
          renderItem={this.renderItem}
          onEndReachedThreshold={0.5}
          onEndReached={({ distanceFromEnd }) => {  
              onEndReached(item.id);
          }}
        />
      </View>
    )
  }
}

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  wrapper: {
    width:width,
  },

  header: {
    borderBottomColor:'#b2bec3',
    backgroundColor:'#cccccc',
    padding:0,
  },
})
