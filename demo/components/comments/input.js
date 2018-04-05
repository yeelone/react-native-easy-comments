import React from 'react';

import {
    TextInput,
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    Dimensions,
    Platform,
} from 'react-native';
import Modal from 'react-native-modalbox';
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
            <TouchableOpacity
                onPress={()=>this.refs.inputModal.open()} style={[styles.openModal,]}>
                    <Text style={{color:'#cccccc'}}>写下您的回复</Text>
            </TouchableOpacity>
            <Modal
                style={[styles.modal,]}
                ref={"inputModal"}
                coverScreen={true}>
                <View >
                    <View style={[styles.header,]} >
                        <TouchableOpacity onPress={() => this.refs.inputModal.close()}><Text style={[styles.closeText,]} >关闭</Text></TouchableOpacity>
                        { this.state.disabled ?
                            null
                            :
                            <TouchableOpacity onPress={this.onPress} ><Text style={[styles.headerText,]} >发送</Text></TouchableOpacity>
                        }
                    </View>
                    <TextInput
                        editable={true}
                        multiline={true}
                        numberOfLines={20}
                        placeholder="发表评论"
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.onChangeText(text)}
                        onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
                        value={this.state.text}
                        style={[styles.textInputStyle,]}
                        />  
                </View>
            </Modal>
      </View>
    )
  }
}
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flexDirection : 'row',
        padding:2,
        margin:2,
    },
    textInputStyle: { //文本输入组件样式
        flex:1,
        height: 30,
        fontSize: 21,
        padding:10,
        textAlignVertical:'top',
        backgroundColor:'#ecf0f1',
        
    },
    header :{
        width:width,
        height:40,
        flexDirection:'row',
        justifyContent: 'space-between',
        shadowColor: '#000',
        borderRadius: 0,
        borderColor: '#ddd',
        borderBottomWidth: 1,
    },
    openModal:{
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:'#f5f5f5',
        flex:1,
        paddingLeft:20,
        justifyContent: 'center',
    },
    modal: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: Platform.OS === 'ios' ?  20 : 0,
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
});