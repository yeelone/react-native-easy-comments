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
import Icon from 'react-native-vector-icons/FontAwesome';

export class Input extends React.Component {
  constructor() {
    super();
    this.state = {
        text: '', 
        height: 0,
        disabled: false,
    }
  }

  onPress = () => {
      try {
        this.props.onSend({content:this.state.text});
        this.refs.inputModal.close();
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
    // var disabled = false ; 
    // if (text.replace(/(^\s*)|(\s*$)/g, "").length ==0) {
    //     disabled = true;
    // }
    console.log(text)
    setTimeout(() => {this.setState({ text: text })})
    
  }

  updateText = (text) => {
    this.setState({ text })
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
                    
                    <Icon.Button name="reply" size={20} backgroundColor="transparent" color={'#22a6b3'} >
                    </Icon.Button>
                    <TextInput
                        editable={true}
                        multiline={true}
                        numberOfLines={20}
                        autoFocus={true}
                        placeholder="发表回复"
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.onChangeText(text)}
                        onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
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
        fontSize: 15,
        marginLeft:30,
        marginTop:-20,
        padding:10,
        textAlignVertical:'top',
        
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
        color:'#22a6b3',
        alignSelf:'flex-start',
        fontSize:16,
        padding:8,
      },
    
      closeText: {
        flex:1,
        color:'#22a6b3',
        alignSelf:'flex-end',
        fontSize:16,
        padding:8,
      },
});