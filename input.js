import React from 'react';

import {
    TextInput,
    View,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native';


export class Input extends React.Component {
  constructor() {
    super();
    this.state = {
        text: '', 
        height: 0,
        disabled: true,
    }
  }

  onPress = () => {
      try {
        this.props.onSend({content:this.state.text});
      }catch(e) {
          console.log("There is not designated props named onSend");
      }
    
  }

  updateSize = (height) => {
    this.setState({
      height
    });
  }

  onChangeText = (text) => {
    var disabled = false ; 
    if (text.replace(/(^\s*)|(\s*$)/g, "").length ==0) {
        disabled = true;
    }
    this.setState({text,disabled})
  }

  render() {
    return (
      <View style={[styles.container,this.props.style]}>
        <TextInput
            editable={true}
            multiline={true}
            placeholder="发表评论"
            underlineColorAndroid='transparent'
            onChangeText={(text) => this.onChangeText(text)}
            onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
            value={this.state.text}
            style={[styles.textInputStyle,{height:Math.max(40,this.state.height)}]}
        />
        <TouchableOpacity
            onPress={this.onPress} style={[styles.sendBtn,]} disabled={this.state.disabled}>
            { this.state.disabled ?
                 <Text style={{color:'#cccccc'}}> </Text>
                :
                <Text style={{color:'#22a6b3'}}>send</Text>
            }
            
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flexDirection : 'row',
        padding:2,
        margin:2,
    },
    textInputStyle: { //文本输入组件样式
        flex:1,
        height: 30,
        fontSize: 14,
        padding:10,
    },
    sendBtn:{
        width:50,
        padding:5,
        justifyContent: 'center',
       alignItems: 'center'
    },
    btnText:{
        color:'#cccccc'
    }
});