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
import Icon from 'react-native-vector-icons/Ionicons';
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
                    <Text style={{color:'#cccccc'}}>能否留下您的见解？</Text>
            </TouchableOpacity>
            <Modal
                style={[styles.modal, styles.modal1]}
                ref={"inputModal"}
                coverScreen={true}>
                <View >
                    <View style={[styles.header,]} >
                        <Icon.Button size={30} style={[styles.closeBtn]} backgroundColor="transparent" name="ios-close" color="#666666" onPress={() => this.refs.inputModal.close()} />
                        { this.state.disabled ?
                            null
                            :
                            <Icon.Button onPress={this.onPress} size={30}  backgroundColor="transparent" name="md-done-all" color="#666666"  />
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
    closeBtn: {
        paddingLeft:10,
    },
    sendBtn:{
        width:50,
        padding:5,
        justifyContent: 'flex-end',
    },
    btnText:{
        color:'#cccccc'
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
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        elevation:1,
    },
    openModal:{
        borderWidth:1,
        borderColor:'#cccccc',
        flex:1,
        borderRadius:20,
        paddingLeft:20,
        paddingTop:5,
        paddingBottom:5,
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
    }
});